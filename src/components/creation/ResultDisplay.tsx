import React, { useEffect } from 'react';
import { useContentStore } from '../../store/contentStore';
import { ExportMenu } from '../ui/ExportMenu';
import type { Database } from '../../lib/supabase/types';

type ContentType = Database['public']['Tables']['content']['Row']['type'];

interface ResultDisplayProps {
  content: string | null;
  type: ContentType;
  curriculumData?: {
    subject: string;
    grade: string;
    chapter: string;
  } | null;
}

export function ResultDisplay({ content, type, curriculumData }: ResultDisplayProps) {
  const { saveContent } = useContentStore();

  useEffect(() => {
    if (content && curriculumData) {
      saveContent({
        type,
        content,
        subject: curriculumData.subject,
        grade: curriculumData.grade,
        chapter: curriculumData.chapter,
        metadata: {
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      }).catch(console.error);
    }
  }, [content, curriculumData, type, saveContent]);

  if (!content) return null;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Generated Content</h3>
        <ExportMenu content={content} type={type} />
      </div>
      <div className="bg-gray-50 rounded-lg p-6 whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
}