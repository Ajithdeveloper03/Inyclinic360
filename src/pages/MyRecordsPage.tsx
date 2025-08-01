import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FileText, Download, Upload, Eye, Search, Filter } from 'lucide-react';

const MyRecordsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const records = [
    { id: 1, name: 'Blood Test Results', type: 'Lab Report', date: '2024-11-28', doctor: 'Dr. Sarah Johnson', size: '2.3 MB', category: 'lab' },
    { id: 2, name: 'Chest X-Ray', type: 'Imaging', date: '2024-11-15', doctor: 'Dr. Michael Brown', size: '5.7 MB', category: 'imaging' },
    { id: 3, name: 'Prescription - Cardiology', type: 'Prescription', date: '2024-10-30', doctor: 'Dr. Sarah Johnson', size: '1.2 MB', category: 'prescription' },
    { id: 4, name: 'Consultation Notes', type: 'Visit Summary', date: '2024-10-15', doctor: 'Dr. Emily Smith', size: '0.8 MB', category: 'consultation' },
    { id: 5, name: 'Vaccination Record', type: 'Immunization', date: '2024-09-20', doctor: 'Dr. Lisa Davis', size: '0.5 MB', category: 'vaccination' }
  ];

  const categories = [
    { id: 'all', name: 'All Records', count: records.length },
    { id: 'lab', name: 'Lab Reports', count: records.filter(r => r.category === 'lab').length },
    { id: 'imaging', name: 'Imaging', count: records.filter(r => r.category === 'imaging').length },
    { id: 'prescription', name: 'Prescriptions', count: records.filter(r => r.category === 'prescription').length },
    { id: 'consultation', name: 'Consultations', count: records.filter(r => r.category === 'consultation').length },
    { id: 'vaccination', name: 'Vaccinations', count: records.filter(r => r.category === 'vaccination').length }
  ];

  const filteredRecords = selectedCategory === 'all' ? records : records.filter(record => record.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    return <FileText className="h-5 w-5" />;
  };

  const getTypeColor = (category: string) => {
    switch (category) {
      case 'lab': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'imaging': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'prescription': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'consultation': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'vaccination': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Medical Records</h1>
          <p className="text-gray-600 text-sm md:text-base">Access and manage your medical documents</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium mt-2 md:mt-0 flex items-center space-x-1 md:space-x-2 w-full md:w-auto">
          <Upload className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-sm md:text-base">Upload Document</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-2 md:p-3 rounded-xl text-center transition-colors duration-200 ${selectedCategory === category.id ? 'bg-blue-100 text-blue-700 border-2 border-blue-200' : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-transparent'}`}
          >
            <div className="text-base md:text-lg font-bold">{category.count}</div>
            <div className="text-xs md:text-sm">{category.name}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-2xl shadow-lg p-3 md:p-4 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">{getTypeIcon(record.type)}</div>
              <span className={`px-1 md:px-2 py-1 text-xs md:text-sm font-medium rounded-full ${getTypeColor(record.category)}`}>{record.type}</span>
            </div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">{record.name}</h3>
            <div className="space-y-1 text-sm text-gray-600 mb-2">
              <div>Date: {record.date}</div>
              <div>Doctor: {record.doctor}</div>
              <div>Size: {record.size}</div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 md:py-2 px-1 md:px-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1">
                <Eye className="h-3 w-3 md:h-4 md:w-4" />
                <span>View</span>
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 md:py-2 px-1 md:px-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1">
                <Download className="h-3 w-3 md:h-4 md:w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mt-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <button className="flex items-center space-x-2 p-2 md:p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
            <Upload className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
            <div className="text-left">
              <div className="font-medium text-blue-700">Upload Document</div>
              <div className="text-sm text-blue-600">Add new medical record</div>
            </div>
          </button>
          <button className="flex items-center space-x-2 p-2 md:p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
            <Download className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
            <div className="text-left">
              <div className="font-medium text-green-700">Download All</div>
              <div className="text-sm text-green-600">Export all records</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyRecordsPage;