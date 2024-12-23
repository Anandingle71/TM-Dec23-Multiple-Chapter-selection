import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { LESSON_DURATIONS, LEARNING_STYLES } from '../../utils/constants';
import { AdditionalInstructions } from './AdditionalInstructions';

export interface LessonPlanFormData {
  duration: string;
  learningStyles: string[];
  objectives: string;
  additionalInstructions: string;
}

interface LessonPlanFormProps {
  onSubmit: (data: LessonPlanFormData) => Promise<void>;
}

export function LessonPlanForm({ onSubmit }: LessonPlanFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LessonPlanFormData>({
    duration: LESSON_DURATIONS[0],
    learningStyles: [],
    objectives: '',
    additionalInstructions: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleLearningStyleChange = (style: string) => {
    setFormData(prev => {
      const styles = prev.learningStyles.includes(style)
        ? prev.learningStyles.filter(s => s !== style)
        : [...prev.learningStyles, style];
      return { ...prev, learningStyles: styles };
    });
  };

  const handleInstructionsChange = (instructions: string) => {
    setFormData(prev => ({ ...prev, additionalInstructions: instructions }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Lesson Duration
        </label>
        <select
          id="duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        >
          {LESSON_DURATIONS.map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Learning Styles (VAK)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(LEARNING_STYLES).map(([key, style]) => (
            <label key={key} className="flex items-center p-2 border rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={formData.learningStyles.includes(style)}
                onChange={() => handleLearningStyleChange(style)}
                className="mr-2"
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">
          Learning Objectives
        </label>
        <textarea
          id="objectives"
          value={formData.objectives}
          onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          rows={4}
          placeholder="Enter learning objectives"
          required
        />
      </div>

      <AdditionalInstructions onInstructionsChange={handleInstructionsChange} />

      <button
        type="submit"
        disabled={loading || formData.learningStyles.length === 0}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            Generating Lesson Plan...
          </>
        ) : (
          'Generate Lesson Plan'
        )}
      </button>
    </form>
  );
}