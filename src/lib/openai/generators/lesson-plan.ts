import { generateContent } from './base';
import { OpenAIError } from '../errors';
import type { LessonPlanFormData } from '../../../types/forms';

async function generateSection(
  topic: string,
  prompt: string,
  options = {}
): Promise<string> {
  try {
    return await generateContent([
      {
        role: "system",
        content: "You are an expert teacher creating concise, focused lesson plan sections following NCERT guidelines and NCF 2023."
      },
      {
        role: "user",
        content: `For the topic "${topic}", ${prompt}`
      }
    ], {
      temperature: 0.7,
      maxTokens: 2000,
      timeout: 20000, // 20 seconds per section
      ...options
    });
  } catch (error) {
    if (error instanceof OpenAIError) {
      throw error;
    }
    throw new OpenAIError(
      'Failed to generate lesson plan section. Please try again.',
      'SECTION_GENERATION_ERROR'
    );
  }
}

export async function generateLessonPlan(data: LessonPlanFormData & {
  topic: string;
  subject: string;
  grade: string;
}): Promise<string> {
  try {
    // Generate sections in parallel with smaller token limits
    const [objectives, materials, activities, assessment] = await Promise.all([
      // Learning objectives section
      generateSection(data.topic, `create clear learning objectives and outcomes that:
1. Align with NCERT curriculum and NCF 2023 for ${data.subject} Grade ${data.grade}
2. Are measurable and achievable
3. Cover key concepts and skills`),

      // Materials and preparation
      generateSection(data.topic, `list required materials and preparation:
1. Teaching materials and resources
2. Student materials
3. Technology requirements
4. Prior knowledge needed`),

      // Learning activities
      generateSection(data.topic, `design ${data.duration} of learning activities that:
1. Incorporate ${data.learningStyles.join(', ')} learning styles
2. Include clear timing for each activity
3. Progress logically
4. Engage students actively`),

      // Assessment and closure
      generateSection(data.topic, `create assessment and closure activities:
1. Formative assessment strategies
2. Success criteria
3. Closure/reflection activities
4. Extension/homework activities
Additional notes: ${data.additionalInstructions}`)
    ]);

    // Combine sections with clear formatting
    return [
      "LESSON PLAN",
      "===========",
      "\nLEARNING OBJECTIVES",
      "==================",
      objectives,
      "\nMATERIALS AND PREPARATION",
      "========================",
      materials,
      "\nLEARNING ACTIVITIES",
      "==================",
      activities,
      "\nASSESSMENT AND CLOSURE",
      "=====================",
      assessment
    ].join('\n\n');
  } catch (error) {
    if (error instanceof OpenAIError) {
      throw error;
    }
    throw new OpenAIError(
      'Failed to generate lesson plan. Please try again with simpler requirements.',
      'LESSON_PLAN_GENERATION_ERROR'
    );
  }
}