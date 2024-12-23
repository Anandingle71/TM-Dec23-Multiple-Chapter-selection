import React from 'react';
import { BookText, Target, Clock, Sparkles } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: BookText,
      title: 'NCERT Aligned',
      description: 'All content perfectly aligned with NCERT curriculum guidelines and textbooks'
    },
    {
      icon: Target,
      title: 'Personalized Learning',
      description: 'Create custom content that meets your students\' specific needs and learning styles'
    },
    {
      icon: Clock,
      title: 'Time-Saving',
      description: 'Ready-to-use templates and AI-powered suggestions to speed up your workflow'
    },
    {
      icon: Sparkles,
      title: 'Interactive Content',
      description: 'Engage students with interactive worksheets and multimedia presentations'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Excel in Teaching
          </h2>
          <p className="text-xl text-gray-600">
            Powerful tools designed specifically for Indian educators
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}