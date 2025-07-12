import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Zap, Phone, AlertTriangle, Clock, User, MapPin, Activity, Heart } from 'lucide-react';

const EmergencyPage = () => {
  const [emergencyLevel, setEmergencyLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [activeEmergencies, setActiveEmergencies] = useState([
    { id: 1, patient: 'Ajith', age: 45, condition: 'Chest Pain', severity: 'critical', time: '5 min ago', location: 'ER Room 1', vitals: { bp: '180/120', hr: '110', temp: '98.6°F' } },
    { id: 2, patient: 'Sarah Smith', age: 32, condition: 'Severe Allergic Reaction', severity: 'high', time: '12 min ago', location: 'ER Room 3', vitals: { bp: '90/60', hr: '130', temp: '99.2°F' } },
    { id: 3, patient: 'Mike Johnson', age: 28, condition: 'Broken Arm', severity: 'medium', time: '25 min ago', location: 'ER Room 5', vitals: { bp: '120/80', hr: '85', temp: '98.4°F' } }
  ]);

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', type: 'primary' },
    { name: 'Poison Control', number: '1-800-222-1222', type: 'specialized' },
    { name: 'Crisis Hotline', number: '988', type: 'mental' },
    { name: 'Hospital Security', number: '(555) 123-4567', type: 'internal' }
  ];

  const emergencyProtocols = [
    { id: 1, title: 'Cardiac Arrest Protocol', steps: 5, lastUpdated: '2024-01-15' },
    { id: 2, title: 'Stroke Response Protocol', steps: 7, lastUpdated: '2024-01-10' },
    { id: 3, title: 'Trauma Assessment Protocol', steps: 6, lastUpdated: '2024-01-08' },
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
    // Simulate emergency alert
    alert('Emergency alert sent to all available staff!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Emergency Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time emergency response and crisis management
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleEmergencyAlert}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Zap className="h-4 w-4" />
              <span>Emergency Alert</span>
            </button>
            <button
              onClick={() => handleEmergencyCall('911')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Call 911</span>
            </button>
          </div>
        </div>

        {/* Emergency Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Emergencies</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{activeEmergencies.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">Immediate attention required</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3.2 min</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">-0.8 min from target</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Available Staff</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">All departments covered</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bed Availability</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8/15</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">53% capacity</p>
          </div>
        </div>

        {/* Active Emergencies */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Active Emergencies
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {activeEmergencies.map((emergency) => (
              <div key={emergency.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {emergency.patient}
                        </h3>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Age {emergency.age}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(emergency.severity)}`}>
                          {emergency.severity}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        <strong>Condition:</strong> {emergency.condition}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{emergency.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{emergency.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <div><strong>BP:</strong> {emergency.vitals.bp}</div>
                      <div><strong>HR:</strong> {emergency.vitals.hr}</div>
                      <div><strong>Temp:</strong> {emergency.vitals.temp}</div>
                    </div>
                    <button className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200">
                      Respond
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts & Protocols */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emergency Contacts */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Emergency Contacts
            </h2>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {contact.type}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEmergencyCall(contact.number)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{contact.number}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Protocols */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Emergency Protocols
            </h2>
            <div className="space-y-4">
              {emergencyProtocols.map((protocol) => (
                <div
                  key={protocol.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {protocol.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {protocol.steps} steps • Updated {protocol.lastUpdated}
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium">
                    View Protocol
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Alert System */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Emergency Alert System
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Instantly notify all available staff and emergency services
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleEmergencyAlert}
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <AlertTriangle className="h-5 w-5" />
              <span>Code Red Alert</span>
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Mass Casualty</span>
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>All Clear</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmergencyPage;