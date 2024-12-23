import React, { useState, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface AdditionalInstructionsProps {
  onInstructionsChange: (instructions: string) => void;
}

export function AdditionalInstructions({ onInstructionsChange }: AdditionalInstructionsProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [instructions, setInstructions] = useState('');

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setIsProcessing(true);
        try {
          // Here you would typically send the audio to a speech-to-text service
          // For now, we'll just show a processing message
          await new Promise(resolve => setTimeout(resolve, 1000));
          setInstructions(prev => prev + "\n[Audio transcription would appear here]");
          onInstructionsChange(instructions + "\n[Audio transcription would appear here]");
        } finally {
          setIsProcessing(false);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInstructions(e.target.value);
    onInstructionsChange(e.target.value);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Additional Instructions
      </label>
      
      <div className="relative">
        <textarea
          value={instructions}
          onChange={handleTextChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          rows={4}
          placeholder="Add any specific instructions or requirements..."
        />
        
        <div className="absolute bottom-2 right-2 flex items-center space-x-2">
          {isProcessing && (
            <div className="flex items-center text-gray-500 text-sm">
              <Loader2 className="animate-spin h-4 w-4 mr-1" />
              Processing audio...
            </div>
          )}
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-2 rounded-full ${
              isRecording 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isRecording ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500">
        Type your instructions or click the microphone icon to record them
      </p>
    </div>
  );
}