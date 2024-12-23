import OpenAI from 'openai';
import type { QuizFormData } from '../components/creation/QuizForm';
import type { LessonPlanFormData } from '../components/creation/LessonPlanForm';
import type { WorksheetFormData } from '../components/creation/WorksheetForm';
import type { PresentationFormData } from '../components/creation/PresentationForm';
import type { AssessmentFormData } from '../components/creation/AssessmentForm';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('Missing OpenAI API key');
}

export const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

export async function generateLessonPlan(data: LessonPlanFormData & {
  topic: string;
  subject: string;
  grade: string;
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an expert teacher who creates detailed lesson plans following NCERT guidelines and incorporating VAK (Visual, Auditory, Kinesthetic) learning styles."
      },
      {
        role: "user",
        content: `Create a detailed lesson plan with the following specifications:

Topic: ${data.topic}
Subject: ${data.subject}
Grade: ${data.grade}
Duration: ${data.duration}
Learning Styles: ${data.learningStyles.join(', ')}
Learning Objectives: ${data.objectives}
Additional Instructions: ${data.additionalInstructions}

Please structure the lesson plan to include:
1. Clear learning objectives
2. Required materials and resources
3. Introduction/Hook (5-10% of lesson time)
4. Main activities incorporating specified VAK learning styles:
   - Visual activities (e.g., diagrams, videos, charts)
   - Auditory activities (e.g., discussions, explanations, audio)
   - Kinesthetic activities (e.g., hands-on experiments, role-play)
5. Assessment strategies
6. Closure/Reflection (5-10% of lesson time)
7. Extensions/Homework

Ensure activities are age-appropriate and aligned with NCERT guidelines.`
      }
    ]
  });

  return response.choices[0].message.content;
}

export async function generateQuiz(data: QuizFormData & {
  topic: string;
  subject: string;
  grade: string;
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an expert teacher who creates engaging and educational quizzes following NCERT guidelines and incorporating specified taxonomy levels."
      },
      {
        role: "user",
        content: `Create a quiz with the following specifications:

Topic: ${data.topic}
Subject: ${data.subject}
Grade: ${data.grade}
Number of Questions: ${data.questionCount}
Difficulty Level: ${data.difficultyLevel}
Taxonomy Type: ${data.taxonomyType}
Taxonomy Levels: ${data.taxonomyLevels.join(', ')}

Please create a multiple-choice quiz where each question:
1. Clearly states the question
2. Provides 4 options (A, B, C, D)
3. Indicates the correct answer
4. Includes a brief explanation for the correct answer
5. Notes the taxonomy level of the question

Ensure questions are age-appropriate and aligned with NCERT guidelines.`
      }
    ]
  });

  return response.choices[0].message.content;
}

export async function generateWorksheet(data: WorksheetFormData & {
  topic: string;
  subject: string;
  grade: string;
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an expert teacher who creates engaging and educational worksheets following NCERT guidelines."
      },
      {
        role: "user",
        content: `Create a worksheet with the following specifications:

Topic: ${data.topic}
Subject: ${data.subject}
Grade: ${data.grade}
Question Types: ${data.questionTypes.join(', ')}
Difficulty Level: ${data.difficultyLevel}
Include Answer Key: ${data.includeAnswerKey ? 'Yes' : 'No'}
Additional Instructions: ${data.additionalInstructions}

Please create a worksheet that includes:
1. Clear instructions for each section
2. A variety of question types as specified
3. Space for student work
4. A mix of recall and higher-order thinking questions
${data.includeAnswerKey ? '5. An answer key' : ''}

Ensure activities are age-appropriate and aligned with NCERT guidelines.`
      }
    ]
  });

  return response.choices[0].message.content;
}

export async function generatePresentation(data: PresentationFormData & {
  topic: string;
  subject: string;
  grade: string;
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an expert teacher who creates engaging and educational presentation outlines following NCERT guidelines."
      },
      {
        role: "user",
        content: `Create a presentation outline with the following specifications:

Topic: ${data.topic}
Subject: ${data.subject}
Grade: ${data.grade}
Number of Slides: ${data.slideCount}
Visual Style: ${data.visualPreference}
Include Activities: ${data.includeActivities ? 'Yes' : 'No'}
Include Assessment: ${data.includeAssessment ? 'Yes' : 'No'}
Additional Instructions: ${data.additionalInstructions}

Please create a presentation outline that includes:
1. Title slide
2. Learning objectives
3. Key concepts with brief explanations
4. Visual aids suggestions (diagrams, images, charts)
5. Interactive elements and discussion points
6. Summary and review
${data.includeAssessment ? '7. Assessment questions' : ''}

Format each slide with:
- Slide number and title
- Key points or content
- Suggested visuals or activities
- Speaker notes

Ensure content is age-appropriate and aligned with NCERT guidelines.`
      }
    ]
  });

  return response.choices[0].message.content;
}

export async function generateAssessment(data: AssessmentFormData & {
  topic: string;
  subject: string;
  grade: string;
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an expert teacher who creates comprehensive assessments following NCERT guidelines."
      },
      {
        role: "user",
        content: `Create an assessment with the following specifications:

Topic: ${data.topic}
Subject: ${data.subject}
Grade: ${data.grade}
Duration: ${data.duration}
Total Marks: ${data.totalMarks}
Section Types: ${data.sectionTypes.join(', ')}
Include Rubric: ${data.includeRubric ? 'Yes' : 'No'}
Additional Instructions: ${data.additionalInstructions}

Please create an assessment that includes:
1. Clear instructions for students
2. Well-structured sections as specified
3. Appropriate mark allocation
4. Questions aligned with NCERT curriculum
${data.includeRubric ? '5. Detailed marking rubric' : ''}

Ensure questions are age-appropriate and aligned with NCERT guidelines.`
      }
    ]
  });

  return response.choices[0].message.content;
}