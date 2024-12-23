import React, { useState } from 'react';
import { PageLayout } from '../components/ui/PageLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { ContentCreationForm } from '../components/creation/ContentCreationForm';
import { WorksheetForm } from '../components/creation/WorksheetForm';
import { ResultDisplay } from '../components/creation/ResultDisplay';
import { generateWorksheet } from '../lib/openai';
import type { WorksheetFormData } from '../components/creation/WorksheetForm';
import type { Subject, Grade, Chapter } from '../utils/ncertData';

function CreateWorksheet() {
  const [step, setStep] = useState<'curriculum' | 'details'>('curriculum');
  const [curriculumData, setCurriculumData] = useState<{
    subject: Subject;
    grade: Grade;
    chapter: Chapter<Subject, Grade>;
  } | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleCurriculumNext = (data: {
    subject: Subject;
    grade: Grade;
    chapter: Chapter<Subject, Grade>;
  }) => {
    setCurriculumData(data);
    setStep('details');
  };

  const handleSubmit = async (data: WorksheetFormData) => {
    if (!curriculumData) return;
    
    const content = await generateWorksheet({
      ...data,
      topic: curriculumData.chapter,
      subject: curriculumData.subject,
      grade: curriculumData.grade
    });
    setResult(content || '');
  };

  return (
    <PageLayout>
      <PageHeader 
        title="Create Worksheet" 
        description="Design practice worksheets based on NCERT curriculum"
      />
      <div className="mt-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {step === 'curriculum' ? (
            <ContentCreationForm
              type="worksheet"
              onNext={handleCurriculumNext}
            />
          ) : (
            <WorksheetForm onSubmit={handleSubmit} />
          )}
          <ResultDisplay content={result} type="worksheet" />
        </div>
      </div>
    </PageLayout>
  );
}

export default CreateWorksheet;