import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

export const maxDuration = 60; // Allow more time for processing

export async function POST(req: Request) {
  try {
    const { jobDescription, experience, projects } = await req.json();

    if (!jobDescription || !experience) {
      return NextResponse.json({ error: 'Missing jobDescription or experience' }, { status: 400 });
    }

    const { object } = await generateObject({
      model: google('gemini-2.5-pro'),
      system: `You are an expert technical recruiter and resume writer. 
Your goal is to tailor the candidate's work experience to perfectly align with a target job description.
Do NOT lie or invent completely false metrics, but highlight relevant aspects, rephrase achievements using strong action verbs, and include keywords from the job description where applicable.
You must ONLY tailor the experience section. 
You are also provided with the candidate's current projects/inventions. Do NOT modify these projects.
However, if you can think of a novel, impressive project/invention idea that perfectly matches the job description and would "wow" the employer, you can suggest it.`,
      prompt: `Target Job Description:
${jobDescription}

Candidate's Current Experience:
${JSON.stringify(experience, null, 2)}

Candidate's Current Projects (Do not modify, use only for context):
${JSON.stringify(projects, null, 2)}

Please return a JSON object with:
1. 'tailoredExperience': The updated experience array with tailored achievements. Make sure the structure exactly matches the input experience array (keep id, company, role, startDate, endDate, link, but modify the 'achievements' array).
2. 'suggestedInvention': An optional object if you have a great project idea to suggest to the candidate that perfectly matches the job. It should have a 'title', 'description' (one liner), and 'bullets' (array of strings). Return null if you have no good suggestion.`,
      schema: z.object({
        tailoredExperience: z.array(z.object({
          id: z.string(),
          company: z.string(),
          role: z.string(),
          startDate: z.string(),
          endDate: z.string(),
          link: z.string().optional(),
          achievements: z.array(z.string()),
        })),
        suggestedInvention: z.object({
          title: z.string(),
          description: z.string(),
          bullets: z.array(z.string()),
        }).nullable(),
      }),
    });

    return NextResponse.json(object);
  } catch (error: any) {
    console.error('AI Tailoring Error:', error);
    return NextResponse.json({ error: error.message || 'An error occurred during AI processing' }, { status: 500 });
  }
}
