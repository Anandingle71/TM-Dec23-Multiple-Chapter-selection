import { generateContent } from './base';
import { OpenAIError } from '../errors';
import type { PresentationFormData } from '../../../types/forms';

async function generateSection(
  topic: string,
  prompt: string,
  options = {}
): Promise<string> {
  try {
    return await generateContent([
      {
        role: "system",
        content: "You are an expert teacher creating engaging educational presentations following NCERT guidelines."
      },
      {
        role: "user",
        content: `For the topic "${topic}", ${prompt}`
      }
    ], {
      temperature: 0.7,
      maxTokens: 4000,
      ...options
    });
  } catch (error) {
    if (error instanceof OpenAIError) throw error;
    throw new OpenAIError('Failed to generate presentation section');
  }
}

export async function generatePresentation(data: PresentationFormData & {
  topic: string;
  subject: string;
  grade: string;
}): Promise<string> {
  try {
    const [outline, content, activities] = await Promise.all([
      // Generate presentation outline
      generateSection(data.topic, `create a presentation outline with ${data.slideCount} slides that:
1. Follows a clear learning progression
2. Matches ${data.visualPreference} visual style
3. Includes key concepts and learning objectives`),

      // Generate detailed slide content
      generateSection(data.topic, `create detailed slide content that:
1. Uses clear, concise language
2. Includes visual suggestions
3. Provides speaker notes
4. Follows ${data.visualPreference} style preferences`),

      // Generate interactive elements if requested
      data.includeActivities ? generateSection(data.topic, `create interactive elements:
1. Student activities
2. Discussion prompts
3. Quick assessments
4. Group exercises`) : Promise.resolve('')
    ]);

    return [
      "PRESENTATION OUTLINE",
      "===================",
      outline,
      "\nDETAILED SLIDE CONTENT",
      "=====================",
      content,
      data.includeActivities ? "\nINTERACTIVE ELEMENTS\n==================\n" + activities : ''
    ].join('\n\n');
  } catch (error) {
    if (error instanceof OpenAIError) throw error;
    throw new OpenAIError('Failed to generate presentation');
  }
}