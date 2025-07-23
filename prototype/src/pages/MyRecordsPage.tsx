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

  const filteredRecords = selectedCategory === 'all' 
    ? records 
    : records.filter(record => record.category === selectedCategory);

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
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Medical Records
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Access and manage your medical documents
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload Document</span>
          </button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl text-center transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-800'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent'
              }`}
            >
              <div className="text-lg font-bold">{category.count}</div>
              <div className="text-sm">{category.name}</div>
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search records..."
                className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-80"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredRecords.length} records found
            </span>
          </div>
        </div> */}

        {/* Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  {getTypeIcon(record.type)}
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(record.category)}`}>
                  {record.type}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {record.name}
              </h3>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div>Date: {record.date}</div>
                <div>Doctor: {record.doctor}</div>
                <div>Size: {record.size}</div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </button>
                <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200">
              <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <div className="text-left">
                <div className="font-medium text-blue-700 dark:text-blue-300">Upload Document</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Add new medical record</div>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200">
              <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
              <div className="text-left">
                <div className="font-medium text-green-700 dark:text-green-300">Download All</div>
                <div className="text-sm text-green-600 dark:text-green-400">Export all records</div>
              </div>
            </button>
            
            {/* <button className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200">
              <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <div className="text-left">
                <div className="font-medium text-purple-700 dark:text-purple-300">Request Records</div>
                <div className="text-sm text-purple-600 dark:text-purple-400">From other providers</div>
              </div>
            </button> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyRecordsPage;