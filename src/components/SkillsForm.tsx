import React from 'react';
import { Code, Plus, Trash2 } from 'lucide-react';
import { Skill } from '../types/resume';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const addSkillCategory = () => {
    const newSkill: Skill = {
      category: '',
      items: []
    };
    onChange([...data, newSkill]);
  };

  const updateSkillCategory = (index: number, category: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], category };
    onChange(newData);
  };

  const updateSkillItems = (index: number, itemsString: string) => {
    const items = itemsString.split(',').map(item => item.trim()).filter(item => item);
    const newData = [...data];
    newData[index] = { ...newData[index], items };
    onChange(newData);
  };

  const removeSkillCategory = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blue-900 flex items-center">
          <Code className="w-5 h-5 mr-2" />
          Skills
        </h3>
        <button
          onClick={addSkillCategory}
          className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Category
        </button>
      </div>

      {data.map((skill, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-md font-medium text-gray-900">Category {index + 1}</h4>
            <button
              onClick={() => removeSkillCategory(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
              <input
                type="text"
                value={skill.category}
                onChange={(e) => updateSkillCategory(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Programming Languages"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills (comma-separated) *
              </label>
              <input
                type="text"
                value={skill.items.join(', ')}
                onChange={(e) => updateSkillItems(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="JavaScript, Python, Java, C++"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};