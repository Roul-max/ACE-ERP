import React from 'react';
import { FileText, Download, Trash2, UploadCloud, File } from 'lucide-react';

const Documents: React.FC = () => {
  const docs = [
    { id: 1, name: 'Academic Calendar 2024.pdf', size: '2.4 MB', date: 'Oct 24, 2023', type: 'PDF' },
    { id: 2, name: 'Student Handbook.docx', size: '1.1 MB', date: 'Aug 10, 2023', type: 'DOCX' },
    { id: 3, name: 'Safety Protocols.pdf', size: '3.5 MB', date: 'Jan 15, 2024', type: 'PDF' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents Center</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
           <UploadCloud size={18} /> Upload New
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date Added</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Size</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {docs.map(doc => (
                    <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                                    <FileText size={20} />
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{doc.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{doc.size}</td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400"><Download size={18} /></button>
                                <button className="text-red-600 hover:text-red-800 dark:text-red-400"><Trash2 size={18} /></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documents;