import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

export const maxDuration = 60; // Allow more time for processing

export async function POST(req: Request) {
  try {
    const { jobDescription, experience, summary, coverLetter } = await req.json();

    if (!jobDescription || !experience) {
      return NextResponse.json({ error: 'Missing jobDescription or experience' }, { status: 400 });
    }

    const { object } = await generateObject({
      model: google('gemini-2.5-pro'),
      system: `You are an expert technical recruiter and resume writer. 
Your goal is to tailor the candidate's work experience, professional summary, and cover letter to perfectly align with a target job description.
Do NOT lie or invent completely false metrics, but highlight relevant aspects, rephrase achievements using strong action verbs, and include keywords from the job description where applicable.`,
      prompt: `Target Job Description:
${jobDescription}

Candidate's Current Experience:
${JSON.stringify(experience, null, 2)}

Candidate's Current Summary:
${summary || 'No summary provided.'}

Candidate's Current Cover Letter:
${coverLetter || 'No cover letter provided.'}

Please return a JSON object with:
1. 'tailoredExperience': The updated experience array with tailored achievements. Make sure the structure exactly matches the input experience array (keep id, company, role, startDate, endDate, link, but modify the 'achievements' array).
2. 'tailoredSummary': The updated professional summary tailored to the job description (3-4 sentences max).
3. 'tailoredCoverLetter': The updated cover letter tailored to the job description. If none was provided originally, you can generate a short one, otherwise just improve the existing one.`,
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
        tailoredSummary: z.string(),
        tailoredCoverLetter: z.string(),
      }),
    });

    return NextResponse.json(object);
  } catch (error: any) {
    console.error('AI Tailoring Error:', error);
    return NextResponse.json({ error: error.message || 'An error occurred during AI processing' }, { status: 500 });
  }
}
