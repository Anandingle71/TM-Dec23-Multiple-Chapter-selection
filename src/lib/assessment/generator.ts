import { openai } from '../openai/client';
import { generateBlueprint } from './blueprints';
import { getAssessmentPrompt } from './prompts';
import type { AssessmentMetadata } from './types';

export async function generateAssessment(data: {
  subject: string;
  grade: string;
  chapter: string;
  duration: string;
  totalMarks: number;
  sectionTypes: string[];
  includeRubric: boolean;
  additionalInstructions: string;
}): Promise<{ content: string; metadata: AssessmentMetadata }> {
  // Generate assessment blueprint
  const sections = generateBlueprint(data.totalMarks, data.sectionTypes);
  
  // Generate the assessment content
  const prompt = getAssessmentPrompt({
    ...data,
    sections,
    isFullSyllabus: data.chapter === 'full_syllabus'
  });

  // Split generation into multiple requests to handle length constraints
  const responses = await Promise.all([
    // Generate questions
    openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert CBSE assessment creator who follows the latest CBSE guidelines and NCF 2023 framework. Focus on generating detailed questions and answers.`
        },
        {
          role: "user",
          content: `${prompt}\n\nGenerate the questions and answers for all sections.`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    }),

    // Generate marking scheme and rubrics
    openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert CBSE assessment creator. Focus on generating detailed marking schemes and evaluation rubrics.`
        },
        {
          role: "user",
          content: `${prompt}\n\nGenerate the detailed marking scheme and evaluation rubrics.`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  ]);

  // Combine responses
  const content = [
    responses[0].choices[0].message.content,
    '\n\nMARKING SCHEME AND EVALUATION RUBRICS\n',
    responses[1].choices[0].message.content
  ].join('\n');

  // Generate metadata
  const metadata: AssessmentMetadata = {
    blueprint: {
      sections,
      totalMarks: data.totalMarks,
      duration: data.duration
    },
    learningOutcomes: [],
    competencies: [],
    markingScheme: {},
    rubrics: data.includeRubric ? {
      markingCriteria: {},
      scoringGuidelines: {},
      commonErrors: {}
    } : undefined
  };

  return { content, metadata };
}