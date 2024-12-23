import React from 'react';
import { Star } from 'lucide-react';

export function CurriculumSection() {
  const testimonials = [
    {
      quote: "TeacherMate has revolutionized my lesson planning. What used to take hours now takes minutes!",
      author: "Priya Sharma",
      role: "Science Teacher, Delhi Public School"
    },
    {
      quote: "The quality of content and NCERT alignment is exceptional. A must-have tool for every Indian teacher.",
      author: "Rajesh Kumar",
      role: "Mathematics Teacher, Kendriya Vidyalaya"
    },
    {
      quote: "Creating engaging worksheets and assessments has never been easier. My students love the interactive content!",
      author: "Anjali Mehta",
      role: "English Teacher, Ryan International School"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Teachers Across India
          </h2>
          <p className="text-xl text-gray-600">
            See what educators are saying about TeacherMate
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}