import React from 'react';
import { Brain, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface AIStatusProps {
  isAnalyzing: boolean;
  hasApiKey: boolean;
  lastAnalysis?: Date;
  error?: string;
}

export const AIStatus: React.FC<AIStatusProps> = ({ 
  isAnalyzing, 
  hasApiKey, 
  lastAnalysis, 
  error 
}) => {
  const getStatusIcon = () => {
    if (isAnalyzing) return <Loader className="w-4 h-4 animate-spin" />;
    if (error) return <AlertCircle className="w-4 h-4" />;
    if (hasApiKey) return <CheckCircle className="w-4 h-4" />;
    return <Brain className="w-4 h-4" />;
  };

  const getStatusColor = () => {
    if (isAnalyzing) return 'text-blue-600';
    if (error) return 'text-red-600';
    if (hasApiKey) return 'text-green-600';
    return 'text-yellow-600';
  };

  const getStatusMessage = () => {
    if (isAnalyzing) return 'AI is analyzing your resume...';
    if (error) return `AI Error: ${error}`;
    if (!hasApiKey) return 'Add OpenAI API key for AI suggestions';
    if (lastAnalysis) return `Last analyzed: ${lastAnalysis.toLocaleTimeString()}`;
    return 'AI ready for analysis';
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className={getStatusColor()}>
        {getStatusIcon()}
      </div>
      <span className={`${getStatusColor()} font-medium`}>
        {getStatusMessage()}
      </span>
    </div>
  );
};