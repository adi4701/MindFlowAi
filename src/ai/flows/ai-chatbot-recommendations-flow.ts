'use server';
/**
 * @fileOverview A Genkit flow that provides personalized recommendations for songs, wellness tips, and activities
 * based on a user's described mood.
 *
 * - aiChatbotRecommendations - A function that handles the AI chatbot's recommendation process.
 * - AIChatbotRecommendationsInput - The input type for the aiChatbotRecommendations function.
 * - AIChatbotRecommendationsOutput - The return type for the aiChatbotRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIChatbotRecommendationsInputSchema = z.object({
  moodDescription: z
    .string()
    .describe("The user's current mood or feelings."),
});
export type AIChatbotRecommendationsInput = z.infer<
  typeof AIChatbotRecommendationsInputSchema
>;

const AIChatbotRecommendationsOutputSchema = z.object({
  songRecommendations: z
    .array(
      z.object({
        title: z.string().describe('The title of the song.'),
        artist: z.string().describe('The artist of the song.'),
        genre: z.string().optional().describe('The genre of the song.'),
      })
    )
    .describe('A list of song recommendations tailored to the user\u0027s mood.'),
  wellnessTips: z
    .array(z.string().describe('A single wellness tip.'))
    .describe('A list of wellness tips to help improve well-being.'),
  activitySuggestions: z
    .array(
      z.object({
        name: z.string().describe('The name of the activity.'),
        description: z.string().describe('A brief description of the activity.'),
      })
    )
    .describe('A list of activity suggestions tailored to the user\u0027s mood.'),
});
export type AIChatbotRecommendationsOutput = z.infer<
  typeof AIChatbotRecommendationsOutputSchema
>;

export async function aiChatbotRecommendations(
  input: AIChatbotRecommendationsInput
): Promise<AIChatbotRecommendationsOutput> {
  return aiChatbotRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotRecommendationsPrompt',
  input: { schema: AIChatbotRecommendationsInputSchema },
  output: { schema: AIChatbotRecommendationsOutputSchema },
  prompt: `You are MindFlow AI, a compassionate and intelligent chatbot designed to help users improve their well-being.

Based on the user's current mood, provide personalized recommendations for songs, wellness tips, and activities.

User's current mood: {{{moodDescription}}}

Provide your response in JSON format according to the output schema. Ensure the recommendations are relevant and helpful for the described mood.`,
});

const aiChatbotRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiChatbotRecommendationsFlow',
    inputSchema: AIChatbotRecommendationsInputSchema,
    outputSchema: AIChatbotRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
