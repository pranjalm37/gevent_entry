'use server';

/**
 * @fileOverview Estimates the wait time for an attendee in the check-in queue using AI.
 *
 * - estimateWaitTime - A function that estimates the wait time.
 * - EstimateWaitTimeInput - The input type for the estimateWaitTime function.
 * - EstimateWaitTimeOutput - The return type for the estimateWaitTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateWaitTimeInputSchema = z.object({
  queuePosition: z.number().describe('The current position of the attendee in the queue.'),
  tokensProcessedPerHour: z.number().describe('The number of tokens processed per hour.'),
});
export type EstimateWaitTimeInput = z.infer<typeof EstimateWaitTimeInputSchema>;

const EstimateWaitTimeOutputSchema = z.object({
  estimatedWaitTimeMinutes: z.number().describe('The estimated wait time in minutes.'),
  queueStatus: z.string().describe('A message describing the queue status, including the estimated wait time.'),
});
export type EstimateWaitTimeOutput = z.infer<typeof EstimateWaitTimeOutputSchema>;

export async function estimateWaitTime(input: EstimateWaitTimeInput): Promise<EstimateWaitTimeOutput> {
  return estimateWaitTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateWaitTimePrompt',
  input: {schema: EstimateWaitTimeInputSchema},
  output: {schema: EstimateWaitTimeOutputSchema},
  prompt: `You are an AI assistant that estimates wait times for event check-in queues.

  Given the attendee's position in the queue ({{queuePosition}}) and the rate at which tokens are being processed ({{tokensProcessedPerHour}} tokens per hour),
  estimate the wait time in minutes. Provide a queue status message that includes the estimated wait time.
  Make it sound conversational and friendly.
  `,
});

const estimateWaitTimeFlow = ai.defineFlow(
  {
    name: 'estimateWaitTimeFlow',
    inputSchema: EstimateWaitTimeInputSchema,
    outputSchema: EstimateWaitTimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
