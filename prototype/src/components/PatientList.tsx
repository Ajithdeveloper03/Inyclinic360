import React, { useState } from 'react';
import { User, Phone, Mail, Calendar, MoreHorizontal, Edit, Trash2, Eye, Plus } from 'lucide-react';

const PatientList = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1 (555) 123-4567', lastVisit: '2024-11-28', status: 'Active' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1 (555) 234-5678', lastVisit: '2024-11-25', status: 'Active' },
    { id: 3, name: 'Michael Davis', email: 'michael@example.com', phone: '+1 (555) 345-6789', lastVisit: '2024-11-20', status: 'Inactive' },
    { id: 4, name: 'Emma Thompson', email: 'emma@example.com', phone: '+1 (555) 456-7890', lastVisit: '2024-11-15', status: 'Active' },
    { id: 5, name: 'David Lee', email: 'david@example.com', phone: '+1 (555) 567-8901', lastVisit: '2024-11-10', status: 'Active' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleAddPatient = () => {
    setEditingPatient(null);
    setShowAddModal(true);
  };

  const handleEditPatient = (patient: any) => {
    setEditingPatient(patient);
    setShowAddModal(true);
  };

  const handleDeletePatient = (id: number) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  const handleViewPatient = (patient: any) => {
    alert(`Viewing details for ${patient.name}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Patient List
          </h2>
          <button 
            onClick={handleAddPatient}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Patient</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Last Visit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {patient.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        #{patient.id.toString().padStart(4, '0')}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-900 dark:text-white">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {patient.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {patient.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900 dark:text-white">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {patient.lastVisit}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewPatient(patient)}
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400 p-1"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleEditPatient(patient)}
                      className="text-green-600 hover:text-green-500 dark:text-green-400 p-1"
                      title="Edit Patient"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeletePatient(patient.id)}
                      className="text-red-600 hover:text-red-500 dark:text-red-400 p-1"
                      title="Delete Patient"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingPatient ? 'Edit Patient' : 'Add New Patient'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={editingPatient?.name || ''}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={editingPatient?.email || ''}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue={editingPatient?.phone || ''}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select 
                  defaultValue={editingPatient?.status || 'Active'}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save patient logic here
                  setShowAddModal(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                {editingPatient ? 'Update' : 'Add'} Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;