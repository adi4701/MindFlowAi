'use server';
/**
 * @fileOverview A Genkit flow that generates a concise summary or reflective insight
 * on a user's journal entry.
 *
 * - aiJournalReflection - A function that handles the journal reflection process.
 * - AiJournalReflectionInput - The input type for the aiJournalReflection function.
 * - AiJournalReflectionOutput - The return type for the aiJournalReflection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiJournalReflectionInputSchema = z.object({
  journalEntry: z
    .string()
    .describe(
      'The full text content of the user\'s journal entry for reflection.'
    ),
});
export type AiJournalReflectionInput = z.infer<
  typeof AiJournalReflectionInputSchema
>;

const AiJournalReflectionOutputSchema = z.object({
  reflection: z
    .string()
    .describe(
      'A concise summary or reflective insight based on the journal entry.'
    ),
});
export type AiJournalReflectionOutput = z.infer<
  typeof AiJournalReflectionOutputSchema
>;

export async function aiJournalReflection(
  input: AiJournalReflectionInput
): Promise<AiJournalReflectionOutput> {
  return aiJournalReflectionFlow(input);
}

const aiJournalReflectionPrompt = ai.definePrompt({
  name: 'aiJournalReflectionPrompt',
  input: {schema: AiJournalReflectionInputSchema},
  output: {schema: AiJournalReflectionOutputSchema},
  prompt: `You are an empathetic and insightful AI assistant designed to help users reflect on their journal entries.
Your task is to read the provided journal entry and generate a concise summary or a reflective insight into the user's thoughts and feelings.
Focus on understanding the core emotions, themes, or key takeaways from the entry. Do not ask follow-up questions.

Journal Entry:
{{{journalEntry}}}`,
});

const aiJournalReflectionFlow = ai.defineFlow(
  {
    name: 'aiJournalReflectionFlow',
    inputSchema: AiJournalReflectionInputSchema,
    outputSchema: AiJournalReflectionOutputSchema,
  },
  async (input) => {
    const {output} = await aiJournalReflectionPrompt(input);
    return output!;
  }
);
