import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, Settings, CheckCircle } from 'lucide-react';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { ExperienceForm } from './components/ExperienceForm';
import { EducationForm } from './components/EducationForm';
import { ProjectsForm } from './components/ProjectsForm';
import { SkillsForm } from './components/SkillsForm';
import { AISuggestions } from './components/AISuggestions';
import { ResumePreview } from './components/ResumePreview';
import { ExportOptions } from './components/ExportOptions';
import { JobTargeting } from './components/JobTargeting';
import { AIStatus } from './components/AIStatus';
import { ResumeData, Suggestion } from './types/resume';
import { generateAISuggestions, getHighlightedKeywords } from './utils/aiSuggestions';

function App() {
  const [activeTab, setActiveTab] = useState('personal');
  const [targetJobTitle, setTargetJobTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<Date>();
  const [aiError, setAiError] = useState<string>();
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    education: [],
    experience: [],
    projects: [],
    skills: []
  });
  
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [highlightedKeywords, setHighlightedKeywords] = useState<string[]>([]);

  const hasApiKey = !!import.meta.env.VITE_OPENAI_API_KEY;

  // Generate AI suggestions when resume data changes
  useEffect(() => {
    const analyzeResume = async () => {
      if (!hasApiKey) return;
      
      setIsAnalyzing(true);
      setAiError(undefined);
      
      try {
        const [newSuggestions, keywords] = await Promise.all([
          generateAISuggestions(resumeData, targetJobTitle),
          getHighlightedKeywords(resumeData, targetJobTitle)
        ]);
        
        setSuggestions(prev => [
          ...prev.filter(s => s.accepted), // Keep accepted suggestions
          ...newSuggestions // Add new suggestions
        ]);
        
        setHighlightedKeywords(keywords);
        setLastAnalysis(new Date());
      } catch (error) {
        setAiError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsAnalyzing(false);
      }
    };

    // Debounce the analysis to avoid too many API calls
    const timeoutId = setTimeout(analyzeResume, 1000);
    return () => clearTimeout(timeoutId);
  }, [resumeData, targetJobTitle, hasApiKey]);

  const handleSuggestionAccept = (id: string) => {
    setSuggestions(prev =>
      prev.map(s => s.id === id ? { ...s, accepted: true } : s)
    );
    
    // In a real implementation, we would apply the suggestion to the resume data
    // For demo purposes, we'll just mark it as accepted
  };

  const handleSuggestionReject = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  const handleExportPDF = () => {
    // In a real implementation, this would generate and download a PDF
    alert('PDF export would be implemented here using libraries like jsPDF or Puppeteer');
  };

  const handleExportWord = () => {
    // In a real implementation, this would generate and download a Word document
    alert('Word export would be implemented here using libraries like docx');
  };

  const handleJobTitleChange = (jobTitle: string) => {
    setTargetJobTitle(jobTitle);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
  ];

  const renderActiveForm = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(personalInfo) => setResumeData(prev => ({ ...prev, personalInfo }))}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData.experience}
            onChange={(experience) => setResumeData(prev => ({ ...prev, experience }))}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(education) => setResumeData(prev => ({ ...prev, education }))}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(projects) => setResumeData(prev => ({ ...prev, projects }))}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(skills) => setResumeData(prev => ({ ...prev, skills }))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-600 rounded-lg p-2 mr-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">Ai_Resume_Builder</h1>
                <p className="text-sm text-blue-600">AI-powered resume enhancement tool</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-100 px-3 py-2 rounded-lg">
              <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">
                {suggestions.filter(s => !s.accepted).length} AI Suggestions
              </span>
            </div>
            
            <button
              onClick={() => setShowApiKeyModal(true)}
              className="flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4 mr-1" />
              API Settings
            </button>
          </div>
          
          <div className="mt-2">
            <AIStatus
              isAnalyzing={isAnalyzing}
              hasApiKey={hasApiKey}
              lastAnalysis={lastAnalysis}
              error={aiError}
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-blue-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Forms */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            {renderActiveForm()}
            
            {/* Job Targeting */}
            <JobTargeting
              onJobTitleChange={handleJobTitleChange}
              currentJobTitle={targetJobTitle}
            />
            
            {/* AI Suggestions */}
            <AISuggestions
              suggestions={suggestions}
              onAccept={handleSuggestionAccept}
              onReject={handleSuggestionReject}
            />

            {/* Export Options */}
            <ExportOptions
              onExportPDF={handleExportPDF}
              onExportWord={handleExportWord}
            />
          </div>

          {/* Right Column - Preview */}
          <div className="col-span-12 lg:col-span-7">
            <div className="sticky top-6">
              <ResumePreview
                data={resumeData}
                highlightedKeywords={highlightedKeywords}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">OpenAI API Configuration</h3>
            
            {!hasApiKey ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  To enable AI-powered suggestions, you need to add your OpenAI API key.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Setup Instructions:</h4>
                  <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                    <li>Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Platform</a></li>
                    <li>Copy the <code className="bg-yellow-100 px-1 rounded">.env.example</code> file to <code className="bg-yellow-100 px-1 rounded">.env</code></li>
                    <li>Replace the placeholder with your actual API key</li>
                    <li>Restart the application</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>OpenAI API key is configured</span>
                </div>
                
                <p className="text-sm text-gray-600">
                  Your resume will be analyzed using GPT-3.5-turbo for intelligent suggestions.
                </p>
              </div>
            )}
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;