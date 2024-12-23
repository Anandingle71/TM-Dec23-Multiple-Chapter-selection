import React, { useState } from 'react';
import { Loader2, Info } from 'lucide-react';
import { CBSE_GUIDELINES, ASSESSMENT_DURATIONS, NCF_2023_COMPETENCIES } from '../../lib/assessment/constants';

export interface AssessmentFormData {
  duration: string;
  totalMarks: number;
  sectionTypes: string[];
  includeRubric: boolean;
  includeSolutions: boolean;
  additionalInstructions: string;
  isFullSyllabus: boolean;
}

interface AssessmentFormProps {
  onSubmit: (data: AssessmentFormData) => Promise<void>;
}

export function AssessmentForm({ onSubmit }: AssessmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AssessmentFormData>({
    duration: ASSESSMENT_DURATIONS[1], // Default to 2 Hours
    totalMarks: 80,
    sectionTypes: [],
    includeRubric: true,
    includeSolutions: false,
    additionalInstructions: '',
    isFullSyllabus: true
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              {formData.isFullSyllabus 
                ? 'Creating assessment for the complete syllabus' 
                : 'Creating chapter-specific assessment'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, isFullSyllabus: true }))}
          className={`flex-1 py-2 px-4 rounded-md ${
            formData.isFullSyllabus
              ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
              : 'bg-gray-100 text-gray-700 border border-gray-300'
          }`}
        >
          Full Syllabus
        </button>
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, isFullSyllabus: false }))}
          className={`flex-1 py-2 px-4 rounded-md ${
            !formData.isFullSyllabus
              ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
              : 'bg-gray-100 text-gray-700 border border-gray-300'
          }`}
        >
          Selected Chapter
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Duration
        </label>
        <select
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        >
          {ASSESSMENT_DURATIONS.map((duration) => (
            <option key={duration} value={duration}>{duration}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Total Marks
        </label>
        <input
          type="number"
          min="20"
          max="100"
          value={formData.totalMarks}
          onChange={(e) => setFormData({ ...formData, totalMarks: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Question Types
        </label>
        <div className="grid grid-cols-2 gap-2">
          {CBSE_GUIDELINES.questionTypes.map((type) => (
            <label key={type} className="flex items-center p-2 border rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={formData.sectionTypes.includes(type)}
                onChange={() => {
                  setFormData(prev => ({
                    ...prev,
                    sectionTypes: prev.sectionTypes.includes(type)
                      ? prev.sectionTypes.filter(t => t !== type)
                      : [...prev.sectionTypes, type]
                  }));
                }}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.includeRubric}
            onChange={(e) => setFormData({ ...formData, includeRubric: e.target.checked })}
            className="mr-2"
          />
          Include Detailed Rubrics
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.includeSolutions}
            onChange={(e) => setFormData({ ...formData, includeSolutions: e.target.checked })}
            className="mr-2"
          />
          Include Solutions
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

      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Assessment will include:</h4>
        <ul className="text-sm text-blue-700 list-disc list-inside">
          <li>CBSE competency-based questions</li>
          <li>NCF 2023 aligned learning outcomes</li>
          <li>21st-century skills assessment</li>
          <li>Real-world application focus</li>
          {formData.includeRubric && <li>Detailed marking scheme and evaluation criteria</li>}
          {formData.includeSolutions && <li>Complete step-by-step solutions</li>}
        </ul>
      </div>

      <button
        type="submit"
        disabled={loading || formData.sectionTypes.length === 0}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            Generating Assessment...
          </>
        ) : (
          'Generate Assessment'
        )}
      </button>
    </form>
  );
}