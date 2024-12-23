import React, { useState } from 'react';
import { PageLayout } from '../components/ui/PageLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { ContentCreationForm } from '../components/creation/ContentCreationForm';
import { LessonPlanForm } from '../components/creation/LessonPlanForm';
import { ResultDisplay } from '../components/creation/ResultDisplay';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { generateLessonPlan } from '../lib/openai/generators/lesson-plan';
import { OpenAIError } from '../lib/openai/errors';
import type { LessonPlanFormData } from '../types/forms';
import type { Subject, Grade, Chapter } from '../utils/ncertData';

export default function CreateLessonPlan() {
  const [step, setStep] = useState<'curriculum' | 'details'>('curriculum');
  const [curriculumData, setCurriculumData] = useState<{
    subject: Subject;
    grade: Grade;
    chapter: Chapter<Subject, Grade>;
  } | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCurriculumNext = (data: {
    subject: Subject;
    grade: Grade;
    chapter: Chapter<Subject, Grade>;
  }) => {
    setCurriculumData(data);
    setStep('details');
  };

  const handleSubmit = async (data: LessonPlanFormData) => {
    if (!curriculumData) return;
    
    try {
      setError(null);
      setLoading(true);
      const content = await generateLessonPlan({
        ...data,
        topic: curriculumData.chapter,
        subject: curriculumData.subject,
        grade: curriculumData.grade
      });
      setResult(content);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (!curriculumData || !error) return;
    setError(null);
    handleSubmit({
      duration: '45 minutes',
      learningStyles: ['Visual', 'Auditory'],
      objectives: '',
      additionalInstructions: ''
    });
  };

  return (
    <PageLayout>
      <PageHeader 
        title="Create Lesson Plan" 
        description="Design NCERT-aligned lesson plans incorporating VAK learning styles"
      />
      <div className="mt-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {error && (
            <div className="mb-6">
              <ErrorMessage error={error} onRetry={handleRetry} />
            </div>
          )}
          
          {step === 'curriculum' ? (
            <ContentCreationForm
              type="lesson-plan"
              onNext={handleCurriculumNext}
            />
          ) : (
            <LessonPlanForm onSubmit={handleSubmit} loading={loading} />
          )}
          {result && (
            <ResultDisplay 
              content={result} 
              type="lesson-plan" 
              curriculumData={curriculumData} 
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
}