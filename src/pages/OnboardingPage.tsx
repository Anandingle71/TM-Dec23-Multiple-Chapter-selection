import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../components/onboarding/StepIndicator';
import { OnboardingStep } from '../components/onboarding/OnboardingStep';
import { SelectionButton } from '../components/onboarding/SelectionButton';
import { SUBJECTS, GRADES, ROLES } from '../utils/constants';
import type { Subject, Grade, Role } from '../utils/constants';

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    school: '',
    role: '' as Role,
    subjects: [] as Subject[],
    grades: [] as Grade[],
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OnboardingStep>
            <div>
              <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                School Name
              </label>
              <input
                type="text"
                id="school"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                placeholder="Enter your school name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <div className="mt-2 grid grid-cols-1 gap-3">
                {ROLES.map((role) => (
                  <SelectionButton
                    key={role}
                    label={role}
                    selected={formData.role === role}
                    onClick={() => setFormData({ ...formData, role: role as Role })}
                  />
                ))}
              </div>
            </div>
          </OnboardingStep>
        );
      case 2:
        return (
          <OnboardingStep>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subjects You Teach</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {SUBJECTS.map((subject) => (
                  <SelectionButton
                    key={subject}
                    label={subject}
                    selected={formData.subjects.includes(subject)}
                    onClick={() => {
                      const newSubjects = formData.subjects.includes(subject)
                        ? formData.subjects.filter((s) => s !== subject)
                        : [...formData.subjects, subject];
                      setFormData({ ...formData, subjects: newSubjects });
                    }}
                  />
                ))}
              </div>
            </div>
          </OnboardingStep>
        );
      case 3:
        return (
          <OnboardingStep>
            <div>
              <label className="block text-sm font-medium text-gray-700">Grades You Teach</label>
              <div className="mt-2 grid grid-cols-3 gap-3">
                {GRADES.map((grade) => (
                  <SelectionButton
                    key={grade}
                    label={grade}
                    selected={formData.grades.includes(grade)}
                    onClick={() => {
                      const newGrades = formData.grades.includes(grade)
                        ? formData.grades.filter((g) => g !== grade)
                        : [...formData.grades, grade];
                      setFormData({ ...formData, grades: newGrades });
                    }}
                  />
                ))}
              </div>
            </div>
          </OnboardingStep>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to TeacherMate</h2>
          <p className="text-gray-600">Let's personalize your experience</p>
        </div>

        <StepIndicator currentStep={step} totalSteps={3} />

        <form onSubmit={handleSubmit}>
          {renderStep()}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center ml-auto text-indigo-600 hover:text-indigo-800"
              >
                Next
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center ml-auto bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              >
                Get Started
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default OnboardingPage;