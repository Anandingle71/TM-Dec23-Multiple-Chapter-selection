import React, { useState } from 'react';
import { Download, FileText, FileType, Chrome } from 'lucide-react';
import { exportContent, ExportFormat } from '../../utils/export';

interface ExportMenuProps {
  content: string;
  type: string;
}

export function ExportMenu({ content, type }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = async (format: ExportFormat) => {
    const exporter = await exportContent({ content, type });
    exporter[format]();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={() => handleExport('txt')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileText className="h-4 w-4 mr-2" />
              Plain Text (.txt)
            </button>
            <button
              onClick={() => handleExport('rtf')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileType className="h-4 w-4 mr-2" />
              Rich Text (.rtf)
            </button>
            <button
              onClick={() => handleExport('gdoc')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Chrome className="h-4 w-4 mr-2" />
              Google Docs
            </button>
          </div>
        </div>
      )}
    </div>
  );
}