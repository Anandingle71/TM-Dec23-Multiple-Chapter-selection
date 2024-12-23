import React, { useState } from 'react';
import { SubjectSelector } from './SubjectSelector';
import { GradeSelector } from './GradeSelector';
import { ChapterSelector } from './ChapterSelector';
import type { Subject, Grade, Chapter } from '../../utils/ncertData';

interface ContentCreationFormProps {
  type: 'lesson-plan' | 'quiz' | 'worksheet' | 'presentation';
  onNext: (data: {
    subject: Subject;
    grade: Grade;
    chapters: Chapter<Subject, Grade>[];
  }) => void;
}

export function ContentCreationForm({ type, onNext }: ContentCreationFormProps) {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [selectedChapters, setSelectedChapters] = useState<Chapter<Subject, Grade>[]>([]);

  const handleNext = () => {
    if (subject && grade && selectedChapters.length > 0) {
      onNext({ subject, grade, chapters: selectedChapters });
    }
  };

  return (
    <div className="space-y-8">
      <SubjectSelector
        selectedSubject={subject}
        onSubjectSelect={(newSubject) => {
          setSubject(newSubject);
          setGrade(null);
          setSelectedChapters([]);
        }}
      />

      {subject && (
        <GradeSelector
          subject={subject}
          selectedGrade={grade}
          onGradeSelect={(newGrade) => {
            setGrade(newGrade);
            setSelectedChapters([]);
          }}
        />
      )}

      {subject && grade && (
        <ChapterSelector
          subject={subject}
          grade={grade}
          selectedChapters={selectedChapters}
          onChapterSelect={setSelectedChapters}
        />
      )}

      {subject && grade && selectedChapters.length > 0 && (
        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Next
        </button>
      )}
    </div>
  );
}