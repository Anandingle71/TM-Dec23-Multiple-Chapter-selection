import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export interface WorksheetFormData {
  questionTypes: string[];
  difficultyLevel: string;
  includeAnswerKey: boolean;
  additionalInstructions: string;
}

interface WorksheetFormProps {
  onSubmit: (data: WorksheetFormData) => Promise<void>;
}

export function WorksheetForm({ onSubmit }: WorksheetFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<WorksheetFormData>({
    questionTypes: [],
    difficultyLevel: 'Medium',
    includeAnswerKey: true,
    additionalInstructions: '',
  });

  const questionTypes = [
    'Multiple Choice',
    'Fill in the Blanks',
    'Short Answer',
    'Long Answer',
    'True/False',
    'Matching',
  ];

  const difficultyLevels = ['Easy', 'Medium', 'Hard'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      questionTypes: prev.questionTypes.includes(type)
        ? prev.questionTypes.filter(t => t !== type)
        : [...prev.questionTypes, type]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Question Types
        </label>
        <div className="grid grid-cols-2 gap-2">
          {questionTypes.map((type) => (
            <label key={type} className="flex items-center p-2 border rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={formData.questionTypes.includes(type)}
                onChange={() => handleQuestionTypeToggle(type)}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Difficulty Level
        </label>
        <select
          value={formData.difficultyLevel}
          onChange={(e) => setFormData({ ...formData, difficultyLevel: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        >
          {difficultyLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.includeAnswerKey}
            onChange={(e) => setFormData({ ...formData, includeAnswerKey: e.target.checked })}
            className="mr-2"
          />
          Include Answer Key
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Instructions
        </label>
        <textarea
          value={formData.additionalInstructions}
          onChange={(e) => setFormData({ ...formData, additionalInstructions: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          rows={4}
          placeholder="Any specific instructions or requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={loading || formData.questionTypes.length === 0}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            Generating Worksheet...
          </>
        ) : (
          'Generate Worksheet'
        )}
      </button>
    </form>
  );
}