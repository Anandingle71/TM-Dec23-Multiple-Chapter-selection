import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbLabels: Record<string, string> = {
    'dashboard': 'Dashboard',
    'create': 'Create',
    'lesson-plan': 'Lesson Plan',
    'quiz': 'Quiz',
    'assessment': 'Assessment',
    'worksheet': 'Worksheet',
    'presentation': 'Presentation',
    'history': 'History'
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center hover:text-indigo-600"
      >
        <Home className="h-4 w-4 mr-1" />
        Dashboard
      </button>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = breadcrumbLabels[name] || name;

        return (
          <React.Fragment key={name}>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {isLast ? (
              <span className="text-gray-900">{label}</span>
            ) : (
              <button
                onClick={() => navigate(routeTo)}
                className="hover:text-indigo-600"
              >
                {label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}