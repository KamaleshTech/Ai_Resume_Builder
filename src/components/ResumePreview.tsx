import React from 'react';
import { Eye, Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
  highlightedKeywords?: string[];
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, highlightedKeywords = [] }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const highlightKeywords = (text: string) => {
    if (!highlightedKeywords.length) return text;
    
    let highlightedText = text;
    highlightedKeywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="bg-yellow-200 px-1 rounded">$1</span>');
    });
    
    return highlightedText;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-900 flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Resume Preview
        </h3>
        
        <div className="flex space-x-2">
          <span className="text-xs text-gray-500">Keywords highlighted:</span>
          <div className="flex space-x-1">
            {highlightedKeywords.map((keyword, index) => (
              <span key={index} className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-4xl mx-auto" style={{ aspectRatio: '8.5/11' }}>
        {/* Header */}
        <div className="text-center border-b-2 border-blue-600 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {data.personalInfo.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {data.personalInfo.location}
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin className="w-4 h-4 mr-1" />
                {data.personalInfo.linkedin.replace('https://', '').replace('http://', '')}
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                {data.personalInfo.website.replace('https://', '').replace('http://', '')}
              </div>
            )}
          </div>
        </div>

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-blue-300 pb-1">EXPERIENCE</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-blue-600 font-medium mb-2">{exp.company} {exp.location && `• ${exp.location}`}</div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: highlightKeywords(desc) }} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-blue-300 pb-1">EDUCATION</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <div className="text-blue-600">{edu.institution} {edu.location && `• ${edu.location}`}</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(edu.graduationDate)}
                    {edu.gpa && <div>GPA: {edu.gpa}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-blue-300 pb-1">PROJECTS</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{project.name}</h3>
                  {project.link && (
                    <div className="flex items-center text-blue-600 text-sm">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Link
                    </div>
                  )}
                </div>
                {project.technologies.length > 0 && (
                  <div className="text-blue-600 text-sm mb-1">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </div>
                )}
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: highlightKeywords(project.description) }} />
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-blue-300 pb-1">SKILLS</h2>
            {data.skills.map((skillCategory, index) => (
              <div key={index} className="mb-2">
                <span className="font-semibold">{skillCategory.category}:</span>{' '}
                <span dangerouslySetInnerHTML={{ __html: highlightKeywords(skillCategory.items.join(', ')) }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};