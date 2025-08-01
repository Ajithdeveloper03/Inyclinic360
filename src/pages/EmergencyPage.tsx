import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Zap, Phone, AlertTriangle, Clock, User, MapPin, Activity, Heart } from 'lucide-react';

const EmergencyPage = () => {
  const [emergencyLevel, setEmergencyLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [activeEmergencies, setActiveEmergencies] = useState([
    { id: 1, patient: 'John Doe', age: 45, condition: 'Chest Pain', severity: 'critical', time: '5 min ago', location: 'ER Room 1', vitals: { bp: '180/120', hr: '110', temp: '98.6°F' } },
    { id: 2, patient: 'Sarah Smith', age: 32, condition: 'Severe Allergic Reaction', severity: 'high', time: '12 min ago', location: 'ER Room 3', vitals: { bp: '90/60', hr: '130', temp: '99.2°F' } },
    { id: 3, patient: 'Mike Johnson', age: 28, condition: 'Broken Arm', severity: 'medium', time: '25 min ago', location: 'ER Room 5', vitals: { bp: '120/80', hr: '85', temp: '98.4°F' } }
  ]);

  const emergencyContacts = [
    { name: 'Ambulance', number: '108', type: 'primary' },
    { name: 'Police', number: '100', type: 'specialized' },
    { name: 'Hospital Security', number: '123-4567', type: 'internal' }
  ];

  const emergencyProtocols = [
    { id: 1, title: 'Cardiac Arrest Protocol', steps: 5, lastUpdated: '2024-01-15' },
    { id: 2, title: 'Stroke Response Protocol', steps: 7, lastUpdated: '2024-01-10' },
    { id: 4, title: 'Allergic Reaction Protocol', steps: 4, lastUpdated: '2024-01-05' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleEmergencyAlert = () => {
    alert('Emergency alert sent to all available staff!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Emergency Management</h1>
          <p className="text-gray-600 text-sm md:text-base">Real-time emergency response and crisis management</p>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mt-2 md:mt-0">
          <button onClick={handleEmergencyAlert} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium flex items-center space-x-1 md:space-x-2 shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff] w-full md:w-auto">
            <Zap className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Emergency Alert</span>
          </button>
          <button onClick={() => handleEmergencyCall('108')} className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium flex items-center space-x-1 md:space-x-2 shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff] w-full md:w-auto">
            <Phone className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Call 108</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Emergencies</p>
              <p className="text-xl md:text-2xl font-bold text-red-600">{activeEmergencies.length}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-red-600" /></div>
          </div>
          <p className="text-sm text-red-600 mt-1">Immediate attention required</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Staff</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center"><User className="h-5 w-5 text-green-600" /></div>
          </div>
          <p className="text-sm text-green-600 mt-1">All departments covered</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bed Availability</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">8/15</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center"><Activity className="h-5 w-5 text-purple-600" /></div>
          </div>
          <p className="text-sm text-yellow-600 mt-1">53% capacity</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Active Emergencies</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {activeEmergencies.map((emergency) => (
            <div key={emergency.id} className="p-3 md:p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-start space-x-2 md:space-x-4 mb-2 md:mb-0">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center"><Heart className="h-5 w-5 text-red-600" /></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{emergency.patient}</h3>
                      <span className="text-sm text-gray-600">Age {emergency.age}</span>
                      <span className={`px-1 md:px-2 py-1 text-xs md:text-sm font-medium rounded-full ${getSeverityColor(emergency.severity)}`}>{emergency.severity}</span>
                    </div>
                    <p className="text-gray-600 mb-1"><strong>Condition:</strong> {emergency.condition}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1"><Clock className="h-4 w-4" /><span>{emergency.time}</span></div>
                      <div className="flex items-center space-x-1"><MapPin className="h-4 w-4" /><span>{emergency.location}</span></div>
                    </div>
                  </div>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <div className="text-sm text-gray-600 space-y-1">
                    <div><strong>BP:</strong> {emergency.vitals.bp}</div>
                    <div><strong>HR:</strong> {emergency.vitals.hr}</div>
                    <div><strong>Temp:</strong> {emergency.vitals.temp}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Emergency Contacts</h2>
          <div className="space-y-2">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{contact.type}</p>
                </div>
                <button onClick={() => handleEmergencyCall(contact.number)} className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 md:px-3 md:py-1 rounded-lg text-sm">
                  <Phone className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{contact.number}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-lg p-4 md:p-6 mt-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center"><Zap className="h-5 w-5 text-red-600" /></div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Emergency Alert System</h2>
            <p className="text-gray-600">Instantly notify all available staff and emergency services</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button onClick={handleEmergencyAlert} className="bg-red-600 hover:bg-red-700 text-white p-2 md:p-3 rounded-lg font-medium flex items-center justify-center space-x-1">
            <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
            <span>Red Alert</span>
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 md:p-3 rounded-lg font-medium flex items-center justify-center space-x-1">
            <Activity className="h-4 w-4 md:h-5 md:w-5" />
            <span>All Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;