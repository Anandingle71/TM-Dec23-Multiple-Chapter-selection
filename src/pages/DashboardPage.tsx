import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, PenTool, ClipboardList, FileSpreadsheet, Presentation, Plus } from 'lucide-react';
import { PageLayout } from '../components/ui/PageLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { ContentHistory } from '../components/dashboard/ContentHistory';
import { useContentStore } from '../store/contentStore';

function DashboardPage() {
  const { fetchRecentContent } = useContentStore();

  useEffect(() => {
    fetchRecentContent().catch(console.error);
  }, [fetchRecentContent]);

  const createOptions = [
    {
      title: 'Lesson Plan',
      icon: FileText,
      path: '/create/lesson-plan',
      description: 'Create detailed NCERT-aligned lesson plans',
    },
    {
      title: 'Quiz',
      icon: PenTool,
      path: '/create/quiz',
      description: 'Design interactive quizzes for your class',
    },
    {
      title: 'Assessment',
      icon: ClipboardList,
      path: '/create/assessment',
      description: 'Build comprehensive assessments',
    },
    {
      title: 'Worksheet',
      icon: FileSpreadsheet,
      path: '/create/worksheet',
      description: 'Create engaging activity worksheets',
    },
    {
      title: 'Presentation',
      icon: Presentation,
      path: '/create/presentation',
      description: 'Design visual presentations for your lessons',
    },
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="Dashboard" 
        description="What would you like to create today?"
      />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {createOptions.map((option) => (
          <Link
            key={option.path}
            to={option.path}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-indigo-50 rounded-lg p-3">
                <option.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <Plus className="h-5 w-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {option.title}
            </h3>
            <p className="text-sm text-gray-600">{option.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Content</h2>
        <ContentHistory />
      </div>
    </PageLayout>
  );
}

export default DashboardPage;