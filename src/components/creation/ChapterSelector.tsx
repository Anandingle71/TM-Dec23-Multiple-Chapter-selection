import React from 'react';
import { Check } from 'lucide-react';
import { NCERT_CURRICULUM } from '../../utils/ncertData';
import type { Subject, Grade, Chapter } from '../../utils/ncertData';

interface ChapterSelectorProps {
  subject: Subject;
  grade: Grade;
  selectedChapters: Chapter<Subject, Grade>[];
  onChapterSelect: (chapters: Chapter<Subject, Grade>[]) => void;
}

export function ChapterSelector({ 
  subject, 
  grade, 
  selectedChapters,
  onChapterSelect 
}: ChapterSelectorProps) {
  const chapters = NCERT_CURRICULUM[subject][grade];

  const handleChapterToggle = (chapter: Chapter<Subject, Grade>) => {
    const newSelection = selectedChapters.includes(chapter)
      ? selectedChapters.filter(ch => ch !== chapter)
      : [...selectedChapters, chapter];
    onChapterSelect(newSelection);
  };

  const handleSelectAll = () => {
    onChapterSelect(selectedChapters.length === chapters.length ? [] : chapters);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Select Chapters
        </label>
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          {selectedChapters.length === chapters.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      <div className="space-y-2">
        {chapters.map((chapter) => (
          <button
            key={chapter}
            onClick={() => handleChapterToggle(chapter)}
            className={`w-full flex items-center p-4 rounded-lg border-2 transition-colors ${
              selectedChapters.includes(chapter)
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
              selectedChapters.includes(chapter)
                ? 'border-indigo-600 bg-indigo-600'
                : 'border-gray-300'
            }`}>
              {selectedChapters.includes(chapter) && (
                <Check className="h-3 w-3 text-white" />
              )}
            </div>
            <span className="text-left">{chapter}</span>
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {selectedChapters.length} chapter{selectedChapters.length !== 1 ? 's' : ''} selected
      </p>
    </div>
  );
}