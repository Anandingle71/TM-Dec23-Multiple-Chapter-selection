import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Clock, BookOpen, Brain, Target } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Hero() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleStartCreating = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Teaching with{' '}
            <span className="text-indigo-600">TeacherMate AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Create high-quality teaching materials in minutes. Save time, enhance classroom instruction, 
            and Generate engaging standards aligned content powered by AI.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Clock className="h-8 w-8 text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Save Time</h3>
              <p className="text-gray-600">Create lesson plans, quizzes, and worksheets in minutes, not hours</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Target className="h-8 w-8 text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Quality Content</h3>
              <p className="text-gray-600">NCERT-aligned materials as per NCF 2023 tailored to your teaching needs</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Brain className="h-8 w-8 text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Smart Teaching</h3>
              <p className="text-gray-600">AI-powered suggestions to enhance student engagement</p>
            </div>
          </div>

          <button 
            onClick={handleStartCreating}
            className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg hover:bg-indigo-700 flex items-center mx-auto"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Start Creating
          </button>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto text-center">
            {[
              { icon: BookOpen, text: 'Lesson Plans' },
              { icon: Target, text: 'Quizzes' },
              { icon: BookOpen, text: 'Worksheets' },
              { icon: Brain, text: 'Assessments' },
              { icon: Sparkles, text: 'Presentations' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-full shadow-md mb-2">
                  <item.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-sm text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}