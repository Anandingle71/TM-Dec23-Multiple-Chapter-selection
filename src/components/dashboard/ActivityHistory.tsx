import React, { useEffect } from 'react';
import { Clock, FileText, PenTool, ClipboardList, Presentation, FileSpreadsheet } from 'lucide-react';
import { useContentStore } from '../../store/contentStore';
import type { ContentType } from '../../lib/supabase/schema';

const contentTypeIcons: Record<ContentType, typeof FileText> = {
  'lesson-plan': FileText,
  'quiz': PenTool,
  'assessment': ClipboardList,
  'worksheet': FileSpreadsheet,
  'presentation': Presentation
};

export function ActivityHistory() {
  const { recentContent, loading, error, fetchRecentContent } = useContentStore();

  useEffect(() => {
    fetchRecentContent();
  }, [fetchRecentContent]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-red-600">Error loading history: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <button 
          onClick={() => fetchRecentContent()}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Refresh
        </button>
      </div>
      
      {recentContent.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No content created yet. Start by creating your first lesson plan, quiz, or worksheet!
        </p>
      ) : (
        <div className="space-y-4">
          {recentContent.map((item) => {
            const Icon = contentTypeIcons[item.type as ContentType] || FileText;
            const date = new Date(item.created_at).toLocaleString();
            
            return (
              <div key={item.id} className="flex items-start space-x-4">
                <div className="bg-indigo-50 rounded-lg p-2">
                  <Icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.chapter} - {item.grade}
                  </h3>
                  <p className="text-sm text-gray-600">{item.subject}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {date}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}