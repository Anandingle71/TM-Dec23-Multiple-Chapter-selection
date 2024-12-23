import React, { useState } from 'react';
import { PageLayout } from '../components/ui/PageLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { ContentCreationForm } from '../components/creation/ContentCreationForm';
import { PresentationForm } from '../components/creation/PresentationForm';
import { ResultDisplay } from '../components/creation/ResultDisplay';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { generatePresentation } from '../lib/openai/generators/presentation';
import { OpenAIError } from '../lib/openai/errors';
import type { PresentationFormData } from '../types/forms';
import type { Subject, Grade, Chapter } from '../utils/ncertData';

export default function CreatePresentation() {
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

  const handleSubmit = async (data: PresentationFormData) => {
    if (!curriculumData) return;
    
    try {
      setError(null);
      setLoading(true);
      const content = await generatePresentation({
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

  return (
    <PageLayout>
      <PageHeader 
        title="Create Presentation" 
        description="Design engaging presentations based on NCERT curriculum"
      />
      <div className="mt-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {error && (
            <div className="mb-6">
              <ErrorMessage error={error} />
            </div>
          )}
          
          {step === 'curriculum' ? (
            <ContentCreationForm
              type="presentation"
              onNext={handleCurriculumNext}
            />
          ) : (
            <PresentationForm onSubmit={handleSubmit} loading={loading} />
          )}
          {result && (
            <ResultDisplay 
              content={result} 
              type="presentation" 
              curriculumData={curriculumData} 
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
}