import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Education } from '../types/resume';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: ''
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blue-900 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2" />
          Education
        </h3>
        <button
          onClick={addEducation}
          className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Education
        </button>
      </div>

      {data.map((education, index) => (
        <div key={education.id} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-md font-medium text-gray-900">Education {index + 1}</h4>
            <button
              onClick={() => removeEducation(education.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Institution *</label>
              <input
                type="text"
                value={education.institution}
                onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="University Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={education.location}
                onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Boston, MA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Date</label>
              <input
                type="month"
                value={education.graduationDate}
                onChange={(e) => updateEducation(education.id, 'graduationDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
              <input
                type="text"
                value={education.gpa}
                onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="3.8/4.0"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};