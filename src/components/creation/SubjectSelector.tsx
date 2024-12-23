import React from 'react';
import { NCERT_CURRICULUM } from '../../utils/ncertData';
import type { Subject } from '../../utils/ncertData';

interface SubjectSelectorProps {
  selectedSubject: Subject | null;
  onSubjectSelect: (subject: Subject) => void;
}

export function SubjectSelector({ selectedSubject, onSubjectSelect }: SubjectSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Select Subject
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(NCERT_CURRICULUM).map((subject) => (
          <button
            key={subject}
            onClick={() => onSubjectSelect(subject as Subject)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedSubject === subject
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
}