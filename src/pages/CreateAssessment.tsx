import React, { useState } from 'react';
import { PageLayout } from '../components/ui/PageLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { ContentCreationForm } from '../components/creation/ContentCreationForm';
import { AssessmentForm } from '../components/creation/AssessmentForm';
import { ResultDisplay } from '../components/creation/ResultDisplay';
import { generateAssessment } from '../lib/assessment/generator';
import type { AssessmentFormData } from '../components/creation/AssessmentForm';
import type { Subject, Grade, Chapter } from '../utils/ncertData';

function CreateAssessment() {
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

  const handleSubmit = async (formData: AssessmentFormData) => {
    if (!curriculumData) return;
    
    const { content, metadata } = await generateAssessment({
      ...formData,
      subject: curriculumData.subject,
      grade: curriculumData.grade,
      chapter: formData.isFullSyllabus ? 'full_syllabus' : curriculumData.chapter,
      duration: formData.duration,
      totalMarks: formData.totalMarks,
      sectionTypes: formData.sectionTypes,
      includeRubric: formData.includeRubric,
      additionalInstructions: formData.additionalInstructions
    });

    setResult(content);
  };

  return (
    <PageLayout>
      <PageHeader 
        title="Create Assessment" 
        description="Design comprehensive assessments based on NCERT curriculum and CBSE guidelines"
      />
      <div className="mt-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {step === 'curriculum' ? (
            <ContentCreationForm
              type="assessment"
              onNext={handleCurriculumNext}
            />
          ) : (
            <AssessmentForm onSubmit={handleSubmit} />
          )}
          <ResultDisplay 
            content={result} 
            type="assessment" 
            curriculumData={curriculumData} 
          />
        </div>
      </div>
    </PageLayout>
  );
}

export default CreateAssessment;