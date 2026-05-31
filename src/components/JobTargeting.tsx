import React, { useState } from 'react';
import { Target, Search } from 'lucide-react';

interface JobTargetingProps {
  onJobTitleChange: (jobTitle: string) => void;
  currentJobTitle: string;
}

export const JobTargeting: React.FC<JobTargetingProps> = ({ onJobTitleChange, currentJobTitle }) => {
  const [jobTitle, setJobTitle] = useState(currentJobTitle);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onJobTitleChange(jobTitle);
  };

  const popularJobTitles = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'DevOps Engineer',
    'Marketing Manager',
    'Sales Representative'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2" />
        Job-Specific Optimization
      </h3>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter target job title (e.g., Software Engineer)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Search className="w-4 h-4 mr-1" />
            Analyze
          </button>
        </div>
      </form>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Popular job titles:</p>
        <div className="flex flex-wrap gap-2">
          {popularJobTitles.map((title) => (
            <button
              key={title}
              onClick={() => {
                setJobTitle(title);
                onJobTitleChange(title);
              }}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {currentJobTitle && (
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            🎯 <strong>Optimizing for:</strong> {currentJobTitle}
          </p>
          <p className="text-xs text-green-600 mt-1">
            AI suggestions are now tailored for this specific role
          </p>
        </div>
      )}
    </div>
  );
};