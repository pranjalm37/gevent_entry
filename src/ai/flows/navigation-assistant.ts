'use server';

/**
 * @fileOverview Provides an AI chatbot for event navigation.
 *
 * - navigationAssistant - A function that handles the navigation process.
 * - NavigationAssistantInput - The input type for the navigationAssistant function.
 * - NavigationAssistantOutput - The return type for the navigationAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NavigationAssistantInputSchema = z.object({
  query: z.string().describe('The user query for navigation assistance.'),
  locationData: z.string().describe('Floor-wise internal location data for the event venue.'),
});
export type NavigationAssistantInput = z.infer<typeof NavigationAssistantInputSchema>;

const NavigationAssistantOutputSchema = z.object({
  instructions: z.string().describe('Helpful instructions for navigating to the requested location.'),
});
export type NavigationAssistantOutput = z.infer<typeof NavigationAssistantOutputSchema>;

export async function navigationAssistant(input: NavigationAssistantInput): Promise<NavigationAssistantOutput> {
  return navigationAssistantFlow(input);
}

const navigationAssistantPrompt = ai.definePrompt({
  name: 'navigationAssistantPrompt',
  input: {schema: NavigationAssistantInputSchema},
  output: {schema: NavigationAssistantOutputSchema},
  prompt: `You are an AI assistant designed to provide navigation instructions for an event venue.

You have access to the following location data:
{{{locationData}}}

Based on the user's query, provide clear and concise instructions on how to get to the requested location.

User Query: {{{query}}}

Instructions:`, // Removed Handlebars code here
});

const navigationAssistantFlow = ai.defineFlow(
  {
    name: 'navigationAssistantFlow',
    inputSchema: NavigationAssistantInputSchema,
    outputSchema: NavigationAssistantOutputSchema,
  },
  async input => {
    const {output} = await navigationAssistantPrompt(input);
    return output!;
  }
);
