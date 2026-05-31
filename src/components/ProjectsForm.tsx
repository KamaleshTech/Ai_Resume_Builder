import React from 'react';
import { Folder, Plus, Trash2, Link } from 'lucide-react';
import { Project } from '../types/resume';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      technologies: [],
      description: '',
      link: ''
    };
    onChange([...data, newProject]);
  };

  const updateProject = (
    id: string,
    field: keyof Project,
    value: Project[keyof Project]
  ) => {
    onChange(data.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id: string) => {
    onChange(data.filter(project => project.id !== id));
  };

  const updateTechnologies = (id: string, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech);
    updateProject(id, 'technologies', technologies);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blue-900 flex items-center">
          <Folder className="w-5 h-5 mr-2" />
          Projects
        </h3>
        <button
          onClick={addProject}
          className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Project
        </button>
      </div>

      {data.map((project, index) => (
        <div key={project.id} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-md font-medium text-gray-900">Project {index + 1}</h4>
            <button
              onClick={() => removeProject(project.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="E-commerce Web App"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Link className="w-4 h-4 mr-1" />
                Project Link (Optional)
              </label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used (comma-separated)
              </label>
              <input
                type="text"
                value={project.technologies.join(', ')}
                onChange={(e) => updateTechnologies(project.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="React, Node.js, MongoDB, Express"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Built a full-stack e-commerce application with user authentication, payment integration, and admin dashboard..."
                rows={3}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};