import OpenAI from 'openai';
import { ResumeData } from '../types/resume';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend API
});

export interface AIAnalysisResult {
  suggestions: Array<{
    type: 'phrasing' | 'action-verb' | 'skill' | 'keyword';
    original: string;
    suggested: string;
    reason: string;
    section: string;
  }>;
  keywords: string[];
  overallScore: number;
  improvements: string[];
}

export const analyzeResumeWithAI = async (resumeData: ResumeData): Promise<AIAnalysisResult> => {
  try {
    const prompt = `
Analyze this resume data and provide specific improvement suggestions:

${JSON.stringify(resumeData, null, 2)}

Please provide:
1. Specific suggestions for better phrasing, stronger action verbs, and missing skills
2. Industry keywords that should be highlighted
3. An overall score (1-100) for the resume
4. General improvement recommendations

Focus on:
- Replacing weak verbs with strong action verbs
- Improving passive language to active language
- Suggesting trending/in-demand skills
- Adding quantifiable achievements
- Industry-specific keywords
- Professional phrasing improvements

Return the response in this exact JSON format:
{
  "suggestions": [
    {
      "type": "action-verb|phrasing|skill|keyword",
      "original": "original text",
      "suggested": "improved text",
      "reason": "explanation why this is better",
      "section": "section name"
    }
  ],
  "keywords": ["keyword1", "keyword2"],
  "overallScore": 85,
  "improvements": ["general improvement 1", "general improvement 2"]
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer and career coach. Analyze resumes and provide specific, actionable improvement suggestions. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const analysisResult = JSON.parse(response);
    return analysisResult;

  } catch (error) {
    console.error('Error analyzing resume with AI:', error);
    
    // Fallback to mock data if API fails
    return {
      suggestions: [
        {
          type: 'action-verb',
          original: 'worked on projects',
          suggested: 'developed and implemented projects',
          reason: 'Use stronger action verbs to show impact and leadership',
          section: 'Experience'
        }
      ],
      keywords: ['developed', 'implemented', 'managed', 'optimized'],
      overallScore: 75,
      improvements: [
        'Add more quantifiable achievements',
        'Include trending technical skills',
        'Use stronger action verbs throughout'
      ]
    };
  }
};

export const generateJobSpecificSuggestions = async (resumeData: ResumeData, jobTitle: string): Promise<AIAnalysisResult> => {
  try {
    const prompt = `
Analyze this resume for the specific job role: "${jobTitle}"

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Provide job-specific suggestions including:
1. Keywords commonly found in ${jobTitle} job postings
2. Skills that are in high demand for ${jobTitle} roles
3. Phrasing improvements specific to ${jobTitle}
4. Missing qualifications or experiences for ${jobTitle}

Return the response in the same JSON format as before, but tailored specifically for ${jobTitle} positions.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert recruiter and career coach specializing in ${jobTitle} positions. Provide specific, actionable advice for optimizing resumes for ${jobTitle} roles.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(response);

  } catch (error) {
    console.error('Error generating job-specific suggestions:', error);
    return analyzeResumeWithAI(resumeData); // Fallback to general analysis
  }
};