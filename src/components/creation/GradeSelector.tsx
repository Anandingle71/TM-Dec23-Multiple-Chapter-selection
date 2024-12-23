import React from 'react';
import { NCERT_CURRICULUM } from '../../utils/ncertData';
import type { Subject, Grade } from '../../utils/ncertData';

interface GradeSelectorProps {
  subject: Subject;
  selectedGrade: Grade | null;
  onGradeSelect: (grade: Grade) => void;
}

export function GradeSelector({ subject, selectedGrade, onGradeSelect }: GradeSelectorProps) {
  const grades = Object.keys(NCERT_CURRICULUM[subject]) as Grade[];

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Select Grade
      </label>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {grades.map((grade) => (
          <button
            key={grade}
            onClick={() => onGradeSelect(grade)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedGrade === grade
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            {grade}
          </button>
        ))}
      </div>
    </div>
  );
}