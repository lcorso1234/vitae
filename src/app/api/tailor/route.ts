import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

export const maxDuration = 60; // Allow more time for processing

export async function POST(req: Request) {
  try {
    const { jobDescription, experience, summary, coverLetter, skills } = await req.json();

    if (!jobDescription || !experience) {
      return NextResponse.json({ error: 'Missing jobDescription or experience' }, { status: 400 });
    }

    const { object } = await generateObject({
      model: google('gemini-2.5-pro'),
      system: `You are an expert technical recruiter and resume writer. 
Your goal is to tailor the candidate's work experience, professional summary, cover letter, and skills to perfectly align with a target job description.
Do NOT lie or invent completely false metrics, but highlight relevant aspects, rephrase achievements using strong action verbs, subtly tailor job titles (role) to better align with the target position, reorder/modify skills to emphasize relevance, and include keywords from the job description where applicable.
Ensure all generated content is highly concise to ensure the final resume does not exceed two pages.
CRITICAL INSTRUCTION: The candidate's name is Larry Corso. DO NOT use any placeholders like [Your Name], [Company Name], [Contact Info], etc. in the generated content. If a name is needed, always use "Larry Corso". Write the content so it is completely finished and requires zero fill-in-the-blanks by the user.`,
      prompt: `Target Job Description:
${jobDescription}

Candidate's Current Experience:
${JSON.stringify(experience, null, 2)}

Candidate's Current Summary:
${summary || 'No summary provided.'}

Candidate's Current Cover Letter:
${coverLetter || 'No cover letter provided.'}

Candidate's Current Skills:
${JSON.stringify(skills, null, 2)}

Please return a JSON object with:
1. 'tailoredExperience': The updated experience array with tailored achievements and roles. Keep id, company, startDate, endDate, and link intact. You MUST subtly tailor the 'role' title to align better with the target job description while remaining truthful, and modify the 'achievements' array to highlight relevant experience.
2. 'tailoredSummary': The updated professional summary tailored to the job description (3-4 sentences max).
3. 'tailoredCoverLetter': The updated cover letter tailored to the job description. If none was provided originally, you can generate a short one, otherwise just improve the existing one.
4. 'tailoredSkills': The updated skills array. You can reorder, add, or refine the skills in the categories to better match the keywords in the target job description.
5. 'targetJobTitle': Extract the exact job title from the target job description.`,
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
        tailoredSkills: z.array(z.object({
          name: z.string(),
          items: z.array(z.string()),
        })),
        targetJobTitle: z.string(),
      }),
    });

    return NextResponse.json(object);
  } catch (error: any) {
    console.error('AI Tailoring Error:', error);
    return NextResponse.json({ error: error.message || 'An error occurred during AI processing' }, { status: 500 });
  }
}
