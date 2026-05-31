import React from 'react';
import { Download, FileText, File } from 'lucide-react';

interface ExportOptionsProps {
  onExportPDF: () => void;
  onExportWord: () => void;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ onExportPDF, onExportWord }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
        <Download className="w-5 h-5 mr-2" />
        Export Resume
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={onExportPDF}
          className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <FileText className="w-5 h-5 mr-2" />
          Export as PDF
        </button>
        
        <button
          onClick={onExportWord}
          className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <File className="w-5 h-5 mr-2" />
          Export as Word
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> PDF format is recommended for most job applications as it preserves formatting across different devices and systems.
        </p>
      </div>
    </div>
  );
};