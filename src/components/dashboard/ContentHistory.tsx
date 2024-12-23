import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FileText, PenTool, ClipboardList, FileSpreadsheet, Presentation, Loader2 } from 'lucide-react';
import { useContentStore } from '../../store/contentStore';
import type { Database } from '../../lib/supabase/types';

type Content = Database['public']['Tables']['content']['Row'];

const contentTypeIcons = {
  'lesson-plan': FileText,
  'quiz': PenTool,
  'assessment': ClipboardList,
  'worksheet': FileSpreadsheet,
  'presentation': Presentation
} as const;

const contentTypeLabels = {
  'lesson-plan': 'Lesson Plan',
  'quiz': 'Quiz',
  'assessment': 'Assessment',
  'worksheet': 'Worksheet',
  'presentation': 'Presentation'
} as const;

export function ContentHistory() {
  const { recentContent, loading, error } = useContentStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded">
        Error loading content history: {error}
      </div>
    );
  }

  if (!recentContent || recentContent.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No content created yet. Start by creating your first lesson plan!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentContent.map((item: Content) => {
        const Icon = contentTypeIcons[item.type] || FileText;
        const typeLabel = contentTypeLabels[item.type] || item.type;
        
        return (
          <div key={item.id} className="flex items-start p-4 bg-white rounded-lg shadow-sm">
            <div className="bg-indigo-50 p-2 rounded-lg mr-4">
              <Icon className="h-6 w-6 text-indigo-600" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">
                  {item.chapter}
                </h3>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </span>
              </div>
              
              <div className="mt-1 text-sm text-gray-600">
                {item.subject} • {item.grade} • {typeLabel}
              </div>
              
              <div className="mt-2">
                <button 
                  onClick={() => {
                    const blob = new Blob([item.content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${item.type}-${item.chapter}-${new Date(item.created_at).toISOString().split('T')[0]}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Download Content
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}