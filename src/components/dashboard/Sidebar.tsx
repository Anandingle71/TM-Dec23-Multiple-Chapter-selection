import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  ClipboardList, 
  PenTool,
  FileSpreadsheet,
  Presentation,
  History,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuthStore();
  
  const menuItems = [
    { icon: BookOpen, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Lesson Plans', path: '/create/lesson-plan' },
    { icon: PenTool, label: 'Quizzes', path: '/create/quiz' },
    { icon: ClipboardList, label: 'Assessments', path: '/create/assessment' },
    { icon: FileSpreadsheet, label: 'Worksheets', path: '/create/worksheet' },
    { icon: Presentation, label: 'Presentations', path: '/create/presentation' },
    { icon: History, label: 'History', path: '/history' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="flex items-center p-4 border-b">
        <BookOpen className="h-8 w-8 text-indigo-600" />
        <span className="ml-2 text-xl font-bold text-gray-900">TeacherMate</span>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="border-t border-gray-200 mt-8 pt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/settings"
                className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <button
                className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 w-full"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}