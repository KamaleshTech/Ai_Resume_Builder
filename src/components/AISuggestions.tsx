import React from 'react';
import { Lightbulb, Check, X, Zap, Target, TrendingUp } from 'lucide-react';
import { Suggestion } from '../types/resume';

interface AISuggestionsProps {
  suggestions: Suggestion[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export const AISuggestions: React.FC<AISuggestionsProps> = ({ 
  suggestions, 
  onAccept, 
  onReject 
}) => {
  const getIcon = (type: Suggestion['type']) => {
    switch (type) {
      case 'action-verb':
        return <Zap className="w-4 h-4" />;
      case 'keyword':
        return <Target className="w-4 h-4" />;
      case 'skill':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: Suggestion['type']) => {
    switch (type) {
      case 'action-verb':
        return 'Strong Action Verb';
      case 'keyword':
        return 'Job Keywords';
      case 'skill':
        return 'In-Demand Skill';
      default:
        return 'Better Phrasing';
    }
  };

  const getTypeColor = (type: Suggestion['type']) => {
    switch (type) {
      case 'action-verb':
        return 'bg-green-100 text-green-800';
      case 'keyword':
        return 'bg-blue-100 text-blue-800';
      case 'skill':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const pendingSuggestions = suggestions.filter(s => !s.accepted);

  if (pendingSuggestions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2" />
          AI Suggestions
        </h3>
        <div className="text-center py-8">
          <Lightbulb className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            {!import.meta.env.VITE_OPENAI_API_KEY 
              ? 'Configure your OpenAI API key to get AI-powered suggestions!'
              : 'Fill out your resume sections to get AI-powered suggestions!'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
        <Lightbulb className="w-5 h-5 mr-2" />
        AI Suggestions ({pendingSuggestions.length})
      </h3>

      <div className="space-y-4">
        {pendingSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                {getIcon(suggestion.type)}
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(suggestion.type)}`}>
                  {getTypeLabel(suggestion.type)}
                </span>
              </div>
              <span className="text-xs text-gray-500">{suggestion.section}</span>
            </div>

            <div className="mb-3">
              <div className="text-sm text-gray-600 mb-1">Current:</div>
              <div className="text-sm bg-red-50 border border-red-200 rounded p-2 mb-2">
                {suggestion.original}
              </div>
              
              <div className="text-sm text-gray-600 mb-1">Suggested:</div>
              <div className="text-sm bg-green-50 border border-green-200 rounded p-2">
                {suggestion.suggested}
              </div>
            </div>

            <div className="text-xs text-gray-600 mb-3">
              <strong>Why:</strong> {suggestion.reason}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onReject(suggestion.id)}
                className="flex items-center px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <X className="w-3 h-3 mr-1" />
                Reject
              </button>
              <button
                onClick={() => onAccept(suggestion.id)}
                className="flex items-center px-3 py-1 text-xs bg-green-600 text-white hover:bg-green-700 rounded transition-colors"
              >
                <Check className="w-3 h-3 mr-1" />
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};