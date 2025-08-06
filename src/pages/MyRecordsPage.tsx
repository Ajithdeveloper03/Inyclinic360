import React, { useState } from 'react';
import { 
  Folder, FlaskConical, Camera, Pill, Stethoscope, Syringe, Shield, Upload, 
  Eye, Download, Search, X, AlertTriangle, Users, ChevronLeft, 
  Plus, File, Edit, Trash, User 
} from 'lucide-react';

const MyRecordsPage = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadCategory, setUploadCategory] = useState('');
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [insuranceDetails, setInsuranceDetails] = useState({
    provider: 'HealthCare Inc.',
    policyNumber: 'HC123456789',
    expiryDate: '2026-12-31'
  });
  const [showAllergiesModal, setShowAllergiesModal] = useState(false);
  const [allergies, setAllergies] = useState([
    { id: 1, allergen: 'Peanuts', severity: 'Severe', reaction: 'Anaphylaxis' },
    { id: 2, allergen: 'Pollen', severity: 'Mild', reaction: 'Sneezing' }
  ]);
  const [newAllergy, setNewAllergy] = useState({ allergen: '', severity: '', reaction: '' });
  const [showFamilyHistoryModal, setShowFamilyHistoryModal] = useState(false);
  const [familyHistory, setFamilyHistory] = useState([
    { id: 1, condition: 'Diabetes', relative: 'Father', notes: 'Type 2, diagnosed at 50' },
    { id: 2, condition: 'Hypertension', relative: 'Mother', notes: 'Managed with medication' }
  ]);
  const [newFamilyHistory, setNewFamilyHistory] = useState({ condition: '', relative: '', notes: '' });

  // Sample records data
  const records = [
    { id: 1, name: 'Blood Test Results', type: 'Lab Report', date: '2024-11-28', doctor: 'Dr. Sarah Johnson', size: '2.3 MB', category: 'lab' },
    { id: 2, name: 'Chest X-Ray', type: 'Imaging', date: '2024-11-15', doctor: 'Dr. Michael Brown', size: '5.7 MB', category: 'imaging' },
    { id: 3, name: 'Prescription - Cardiology', type: 'Prescription', date: '2024-10-30', doctor: 'Dr. Sarah Johnson', size: '1.2 MB', category: 'prescription' },
    { id: 4, name: 'Consultation Notes', type: 'Visit Summary', date: '2024-10-15', doctor: 'Dr. Emily Smith', size: '0.8 MB', category: 'consultation' },
    { id: 5, name: 'Vaccination Record', type: 'Immunization', date: '2024-09-20', doctor: 'Dr. Lisa Davis', size: '0.5 MB', category: 'vaccination' }
  ];

  // Categories with icons and counts
  const categories = [
    { id: 'lab', name: 'Labs', count: records.filter(r => r.category === 'lab').length, icon: FlaskConical, color: 'text-red-500 bg-red-50' },
    { id: 'imaging', name: 'Imaging', count: records.filter(r => r.category === 'imaging').length, icon: Camera, color: 'text-blue-500 bg-blue-50' },
    { id: 'prescription', name: 'Prescriptions', count: records.filter(r => r.category === 'prescription').length, icon: Pill, color: 'text-green-500 bg-green-50' },
    { id: 'consultation', name: 'Consultations', count: records.filter(r => r.category === 'consultation').length, icon: Stethoscope, color: 'text-purple-500 bg-purple-50' },
    { id: 'vaccination', name: 'Vaccinations', count: records.filter(r => r.category === 'vaccination').length, icon: Syringe, color: 'text-orange-500 bg-orange-50' },
    { id: 'insurance', name: 'Insurance', count: 1, icon: Shield, color: 'text-teal-500 bg-teal-50' },
    { id: 'allergies', name: 'Allergies', count: allergies.length, icon: AlertTriangle, color: 'text-yellow-500 bg-yellow-50' },
    { id: 'familyHistory', name: 'Family History', count: familyHistory.length, icon: Users, color: 'text-indigo-500 bg-indigo-50' }
  ];

  // Filter records based on selected criteria
  const filterRecords = () => {
    let filtered = records.filter(r => r.category === selectedCategory);
    filtered = filtered.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (dateFilter !== 'all' && selectedDate) {
      filtered = filtered.filter(r => {
        const recordDate = new Date(r.date);
        const filterDate = new Date(selectedDate);
        if (dateFilter === 'day') return r.date === selectedDate;
        if (dateFilter === 'month') return recordDate.getMonth() === filterDate.getMonth() && recordDate.getFullYear() === filterDate.getFullYear();
        if (dateFilter === 'year') return recordDate.getFullYear() === filterDate.getFullYear();
        return true;
      });
    }

    return filtered;
  };

  const filteredRecords = selectedCategory && !['insurance', 'allergies', 'familyHistory'].includes(selectedCategory) ? filterRecords() : [];

  // Get color based on category
  const getTypeColor = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'bg-gray-50 text-gray-700';
  };

  // File upload handler
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);
  const handleUpload = () => {
    if (selectedFile && uploadCategory) {
      alert(`Uploading ${selectedFile.name} as ${uploadCategory}`);
      setShowUploadModal(false);
      setSelectedFile(null);
      setUploadCategory('');
    } else {
      alert('Please select a file and category');
    }
  };

  // Form handlers
  const handleInsuranceSubmit = () => {
    if (insuranceDetails.provider && insuranceDetails.policyNumber && insuranceDetails.expiryDate) {
      alert('Insurance details saved!');
      setShowInsuranceModal(false);
    } else {
      alert('Please fill all insurance fields');
    }
  };

  const handleAllergySubmit = () => {
    if (newAllergy.allergen && newAllergy.severity && newAllergy.reaction) {
      setAllergies([...allergies, { id: allergies.length + 1, ...newAllergy }]);
      alert('Allergy added!');
      setShowAllergiesModal(false);
      setNewAllergy({ allergen: '', severity: '', reaction: '' });
    } else {
      alert('Please fill all allergy fields');
    }
  };

  const handleFamilyHistorySubmit = () => {
    if (newFamilyHistory.condition && newFamilyHistory.relative && newFamilyHistory.notes) {
      setFamilyHistory([...familyHistory, { id: familyHistory.length + 1, ...newFamilyHistory }]);
      alert('Family history added!');
      setShowFamilyHistoryModal(false);
      setNewFamilyHistory({ condition: '', relative: '', notes: '' });
    } else {
      alert('Please fill all family history fields');
    }
  };

  // Optionally: Remove window.lucide?.createIcons(); from useEffect

  // Optionally: handle delete allergy/familyHistory if you want, currently Delete does nothing

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 font-sans flex flex-col items-center py-10">
      <main className="w-full max-w-5xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Folder className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">Health Records</h1>
          </div>
          <p className="text-gray-600">Select a category to view or manage your health information</p>
        </div>

        {!selectedCategory ? (
          <div>
            {/* Categories as cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <div 
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className={`p-5 rounded-t-xl flex items-center justify-center ${category.color.split(' ')[1]}`}>
                    <category.icon className={`h-12 w-12 ${category.color.split(' ')[0]}`} />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{category.name}</h3>
                    <p className="text-gray-500 text-sm">{category.count} {category.count === 1 ? 'item' : 'items'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                setDateFilter('all');
                setSelectedDate('');
              }}
              className="mb-8 flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ChevronLeft size={20} />
              <span>Back to all categories</span>
            </button>
            
            {/* Lab, Imaging, etc. */}
            {(selectedCategory === 'lab' || selectedCategory === 'imaging' ||
              selectedCategory === 'prescription' || selectedCategory === 'consultation' ||
              selectedCategory === 'vaccination') && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder={`Search ${categories.find(c => c.id === selectedCategory).name.toLowerCase()}...`}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-base"
                        />
                      </div>
                      <div className="flex gap-3">
                        <select
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-base"
                        >
                          <option value="all">All Dates</option>
                          <option value="day">By Day</option>
                          <option value="month">By Month</option>
                          <option value="year">By Year</option>
                        </select>
                        {dateFilter !== 'all' && (
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                          />
                        )}
                        <button
                          onClick={() => setShowUploadModal(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300"
                        >
                          <Plus size={18} />
                          <span>Add New</span>
                        </button>
                      </div>
                    </div>
                    <div className="mt-6">
                      {filteredRecords.length === 0 ? (
                        <div className="text-center py-12">
                          <File className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-700 mb-2">No records found</h3>
                          <p className="text-gray-500 mb-6">Upload your first document to get started</p>
                          <button
                            onClick={() => setShowUploadModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium"
                          >
                            Upload Document
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {filteredRecords.map(record => (
                            <div key={record.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                              <div className={`p-4 border-b ${getTypeColor(record.category)}`}>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{record.type}</span>
                                  <span className="text-sm">{record.date}</span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="font-semibold text-gray-800 mb-2">{record.name}</h3>
                                <div className="flex items-center text-sm text-gray-600 mb-4">
                                  <User size={16} className="mr-2" />
                                  <span>{record.doctor}</span>
                                </div>
                                <div className="flex justify-between mt-4">
                                  <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                                    <Eye size={16} />
                                    <span>View</span>
                                  </button>
                                  <button className="text-gray-600 hover:text-gray-800 flex items-center space-x-1">
                                    <Download size={16} />
                                    <span>Download</span>
                                  </button>
                                  <button className="text-gray-600 hover:text-red-600 flex items-center space-x-1">
                                    <Trash size={16} />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            )}

            {selectedCategory === 'insurance' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Insurance Details</h3>
                  <button 
                    onClick={() => setShowInsuranceModal(true)}
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                </div>
                <div className="space-y-4 max-w-lg">
                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Provider</span>
                    <span className="font-medium">{insuranceDetails.provider}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Policy Number</span>
                    <span className="font-medium">{insuranceDetails.policyNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expiry Date</span>
                    <span className="font-medium">{insuranceDetails.expiryDate}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedCategory === 'allergies' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Your Allergies</h3>
                  <button 
                    onClick={() => setShowAllergiesModal(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Add Allergy</span>
                  </button>
                </div>
                {allergies.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-16 w-16 text-yellow-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No allergies recorded</h3>
                    <p className="text-gray-500">Add your first allergy record</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allergies.map(allergy => (
                      <div key={allergy.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-semibold text-gray-800">{allergy.allergen}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              allergy.severity === 'Severe' ? 'bg-red-100 text-red-800' : 
                              allergy.severity === 'Moderate' ? 'bg-orange-100 text-orange-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {allergy.severity}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{allergy.reaction}</p>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                          <Trash size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedCategory === 'familyHistory' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Family Medical History</h3>
                  <button 
                    onClick={() => setShowFamilyHistoryModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Add History</span>
                  </button>
                </div>
                {familyHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-16 w-16 text-indigo-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No family history recorded</h3>
                    <p className="text-gray-500">Add your first family medical history</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {familyHistory.map(history => (
                      <div key={history.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">{history.condition}</h4>
                            <p className="text-gray-600 text-sm">{history.relative}</p>
                          </div>
                          <button className="text-gray-400 hover:text-red-500">
                            <Trash size={18} />
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm">{history.notes}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Upload Document</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange} 
                      accept=".pdf,.jpg,.png" 
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.filter(c => !['insurance', 'allergies', 'familyHistory'].includes(c.id)).map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex p-5 border-t border-gray-200">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 py-2.5 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium mr-3"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {showInsuranceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Manage Insurance</h3>
              <button 
                onClick={() => setShowInsuranceModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                <input
                  type="text"
                  value={insuranceDetails.provider}
                  onChange={(e) => setInsuranceDetails({ ...insuranceDetails, provider: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., HealthCare Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                <input
                  type="text"
                  value={insuranceDetails.policyNumber}
                  onChange={(e) => setInsuranceDetails({ ...insuranceDetails, policyNumber: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., HC123456789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={insuranceDetails.expiryDate}
                  onChange={(e) => setInsuranceDetails({ ...insuranceDetails, expiryDate: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex p-5 border-t border-gray-200">
              <button
                onClick={() => setShowInsuranceModal(false)}
                className="flex-1 py-2.5 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium mr-3"
              >
                Cancel
              </button>
              <button
                onClick={handleInsuranceSubmit}
                className="flex-1 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}

      {showAllergiesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Add Allergy</h3>
              <button 
                onClick={() => setShowAllergiesModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergen</label>
                <input
                  type="text"
                  value={newAllergy.allergen}
                  onChange={(e) => setNewAllergy({ ...newAllergy, allergen: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Peanuts"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                <select
                  value={newAllergy.severity}
                  onChange={(e) => setNewAllergy({ ...newAllergy, severity: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select severity</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reaction</label>
                <input
                  type="text"
                  value={newAllergy.reaction}
                  onChange={(e) => setNewAllergy({ ...newAllergy, reaction: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Anaphylaxis"
                />
              </div>
            </div>
            <div className="flex p-5 border-t border-gray-200">
              <button
                onClick={() => setShowAllergiesModal(false)}
                className="flex-1 py-2.5 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium mr-3"
              >
                Cancel
              </button>
              <button
                onClick={handleAllergySubmit}
                className="flex-1 py-2.5 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium"
              >
                Add Allergy
              </button>
            </div>
          </div>
        </div>
      )}

      {showFamilyHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Add Family History</h3>
              <button 
                onClick={() => setShowFamilyHistoryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <input
                  type="text"
                  value={newFamilyHistory.condition}
                  onChange={(e) => setNewFamilyHistory({ ...newFamilyHistory, condition: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Diabetes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relative</label>
                <input
                  type="text"
                  value={newFamilyHistory.relative}
                  onChange={(e) => setNewFamilyHistory({ ...newFamilyHistory, relative: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Father"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newFamilyHistory.notes}
                  onChange={(e) => setNewFamilyHistory({ ...newFamilyHistory, notes: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Type 2, diagnosed at 50"
                  rows={3}
                ></textarea>
              </div>
            </div>
            <div className="flex p-5 border-t border-gray-200">
              <button
                onClick={() => setShowFamilyHistoryModal(false)}
                className="flex-1 py-2.5 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium mr-3"
              >
                Cancel
              </button>
              <button
                onClick={handleFamilyHistorySubmit}
                className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
              >
                Add History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecordsPage;
