import { ResumeData, Suggestion } from '../types/resume';
import { analyzeResumeWithAI, generateJobSpecificSuggestions } from '../services/openai';

// Generate AI-powered suggestions using OpenAI
export const generateAISuggestions = async (resumeData: ResumeData, jobTitle?: string): Promise<Suggestion[]> => {
  try {
    const analysisResult = jobTitle 
      ? await generateJobSpecificSuggestions(resumeData, jobTitle)
      : await analyzeResumeWithAI(resumeData);

    return analysisResult.suggestions.map((suggestion, index) => ({
      id: `ai-${Date.now()}-${index}`,
      type: suggestion.type,
      original: suggestion.original,
      suggested: suggestion.suggested,
      reason: suggestion.reason,
      section: suggestion.section,
      accepted: false
    }));
  } catch (error) {
    console.error('Error generating AI suggestions:', error);
    return getFallbackSuggestions(resumeData);
  }
};

export const getHighlightedKeywords = async (resumeData: ResumeData, jobTitle?: string): Promise<string[]> => {
  try {
    const analysisResult = jobTitle 
      ? await generateJobSpecificSuggestions(resumeData, jobTitle)
      : await analyzeResumeWithAI(resumeData);

    return analysisResult.keywords;
  } catch (error) {
    console.error('Error getting highlighted keywords:', error);
    // Fallback keywords
    const keywords = [
      'developed', 'implemented', 'designed', 'created', 'built', 'managed', 'led',
      'optimized', 'improved', 'increased', 'reduced', 'achieved', 'delivered',
      'collaborated', 'coordinated', 'mentored', 'supervised', 'analyzed'
    ];

    const resumeText = JSON.stringify(resumeData).toLowerCase();
    return keywords.filter(keyword => resumeText.includes(keyword.toLowerCase()));
  }
};

// Fallback suggestions when AI is not available
const getFallbackSuggestions = (resumeData: ResumeData): Suggestion[] => {
  const suggestions: Suggestion[] = [];
  let suggestionId = 1;

  // Basic suggestions for common weak phrases
  resumeData.experience.forEach((exp, expIndex) => {
    exp.description.forEach((desc) => {
      if (desc.toLowerCase().includes('worked on')) {
        suggestions.push({
          id: `${suggestionId++}`,
          type: 'action-verb',
          original: desc,
          suggested: desc.replace(/worked on/gi, 'developed'),
          reason: 'Replace weak phrases with strong action verbs',
          section: `Experience ${expIndex + 1}`,
          accepted: false
        });
      }
    });
  });

  return suggestions;
};