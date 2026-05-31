import React from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { Experience } from '../types/resume';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ['']
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: Experience[keyof Experience]
  ) => {
    onChange(data.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const updateDescription = (id: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const newDescription = [...experience.description];
      newDescription[index] = value;
      updateExperience(id, 'description', newDescription);
    }
  };

  const addDescriptionPoint = (id: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, 'description', [...experience.description, '']);
    }
  };

  const removeDescriptionPoint = (id: string, index: number) => {
    const experience = data.find(exp => exp.id === id);
    if (experience && experience.description.length > 1) {
      const newDescription = experience.description.filter((_, i) => i !== index);
      updateExperience(id, 'description', newDescription);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blue-900 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Work Experience
        </h3>
        <button
          onClick={addExperience}
          className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </button>
      </div>

      {data.map((experience, expIndex) => (
        <div key={experience.id} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-md font-medium text-gray-900">Experience {expIndex + 1}</h4>
            <button
              onClick={() => removeExperience(experience.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                value={experience.title}
                onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tech Company"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={experience.location}
                onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="San Francisco, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="month"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={experience.current}
                  onChange={(e) => updateExperience(experience.id, 'current', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Current Position</span>
              </label>
            </div>

            {!experience.current && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
            {experience.description.map((desc, descIndex) => (
              <div key={descIndex} className="flex items-start mb-2">
                <textarea
                  value={desc}
                  onChange={(e) => updateDescription(experience.id, descIndex, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="• Developed and maintained web applications..."
                  rows={2}
                />
                <div className="flex flex-col ml-2">
                  <button
                    onClick={() => addDescriptionPoint(experience.id)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="Add bullet point"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  {experience.description.length > 1 && (
                    <button
                      onClick={() => removeDescriptionPoint(experience.id, descIndex)}
                      className="p-1 text-red-600 hover:text-red-800"
                      title="Remove bullet point"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};