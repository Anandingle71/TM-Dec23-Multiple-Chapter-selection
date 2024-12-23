import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { TAXONOMY_TYPES, BLOOMS_LEVELS, DOK_LEVELS } from '../../utils/constants';
import type { TaxonomyType } from '../../utils/constants';

export interface QuizFormData {
  questionCount: number;
  difficultyLevel: string;
  taxonomyType: TaxonomyType;
  taxonomyLevels: string[];
  additionalInstructions: string;
}

interface QuizFormProps {
  onSubmit: (data: QuizFormData) => Promise<void>;
}

export function QuizForm({ onSubmit }: QuizFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<QuizFormData>({
    questionCount: 5,
    difficultyLevel: 'Medium',
    taxonomyType: TAXONOMY_TYPES[0],
    taxonomyLevels: [],
    additionalInstructions: '',
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

  const handleTaxonomyLevelChange = (level: string) => {
    setFormData(prev => ({
      ...prev,
      taxonomyLevels: prev.taxonomyLevels.includes(level)
        ? prev.taxonomyLevels.filter(l => l !== level)
        : [...prev.taxonomyLevels, level]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700">
          Number of Questions
        </label>
        <input
          type="number"
          id="questionCount"
          min="1"
          max="20"
          value={formData.questionCount}
          onChange={(e) => setFormData({ ...formData, questionCount: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        />
      </div>

      <div>
        <label htmlFor="difficultyLevel" className="block text-sm font-medium text-gray-700">
          Difficulty Level
        </label>
        <select
          id="difficultyLevel"
          value={formData.difficultyLevel}
          onChange={(e) => setFormData({ ...formData, difficultyLevel: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        >
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Taxonomy Type
        </label>
        <div className="flex gap-4">
          {TAXONOMY_TYPES.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="taxonomyType"
                value={type}
                checked={formData.taxonomyType === type}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    taxonomyType: e.target.value as TaxonomyType,
                    taxonomyLevels: []
                  });
                }}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {formData.taxonomyType === 'Bloom\'s Taxonomy' ? 'Bloom\'s Levels' : 'DOK Levels'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(formData.taxonomyType === 'Bloom\'s Taxonomy' ? BLOOMS_LEVELS : DOK_LEVELS).map((level) => (
            <label key={level} className="flex items-center p-2 border rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={formData.taxonomyLevels.includes(level)}
                onChange={() => handleTaxonomyLevelChange(level)}
                className="mr-2"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="additionalInstructions" className="block text-sm font-medium text-gray-700">
          Additional Instructions
        </label>
        <textarea
          id="additionalInstructions"
          value={formData.additionalInstructions}
          onChange={(e) => setFormData({ ...formData, additionalInstructions: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          rows={4}
          placeholder="Any specific instructions or requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={loading || formData.taxonomyLevels.length === 0}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            Generating Quiz...
          </>
        ) : (
          'Generate Quiz'
        )}
      </button>
    </form>
  );
}