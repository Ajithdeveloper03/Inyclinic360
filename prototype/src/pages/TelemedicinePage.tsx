import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Video, Phone, MessageCircle, Calendar, Clock, User, Settings, Mic, MicOff, VideoOff, PhoneOff } from 'lucide-react';

const TelemedicinePage = () => {
  const [activeCall, setActiveCall] = useState(false);
  const [callType, setCallType] = useState<'video' | 'audio'>('video');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const upcomingCalls = [
    { id: 1, patient: 'John Smith', time: '10:30 AM', type: 'video', status: 'scheduled' },
    { id: 2, patient: 'Sarah Wilson', time: '2:00 PM', type: 'audio', status: 'scheduled' },
    { id: 3, patient: 'Michael Davis', time: '3:30 PM', type: 'video', status: 'scheduled' }
  ];

  const recentCalls = [
    { id: 1, patient: 'Emma Thompson', date: '2024-12-14', duration: '25 min', type: 'video', status: 'completed' },
    { id: 2, patient: 'David Lee', date: '2024-12-13', duration: '18 min', type: 'audio', status: 'completed' },
    { id: 3, patient: 'Lisa Johnson', date: '2024-12-12', duration: '32 min', type: 'video', status: 'completed' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCall]);

  const startCall = (type: 'video' | 'audio') => {
    setCallType(type);
    setActiveCall(true);
    setCallDuration(0);
  };

  const endCall = () => {
    setActiveCall(false);
    setCallDuration(0);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Telemedicine
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Virtual consultations and remote patient care
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => startCall('video')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Video className="h-4 w-4" />
              <span>Start Video Call</span>
            </button>
            <button
              onClick={() => startCall('audio')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Start Audio Call</span>
            </button>
          </div>
        </div>

        {/* Active Call Interface */}
        {activeCall && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-4xl mx-4 h-3/4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">John Smith</h3>
                  <p className="text-gray-300">Patient Consultation</p>
                </div>
                <div className="text-white text-lg font-mono">
                  {formatDuration(callDuration)}
                </div>
              </div>

              <div className="flex-1 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                {callType === 'video' && !isVideoOff ? (
                  <div className="grid grid-cols-2 gap-4 w-full h-full p-4">
                    <div className="bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <User className="h-16 w-16 mx-auto mb-2" />
                        <p>Patient Video</p>
                      </div>
                    </div>
                    <div className="bg-gray-600 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <User className="h-16 w-16 mx-auto mb-2" />
                        <p>Your Video</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <Phone className="h-24 w-24 mx-auto mb-4" />
                    <p className="text-xl">Audio Call in Progress</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-colors duration-200 ${
                    isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  {isMuted ? <MicOff className="h-6 w-6 text-white" /> : <Mic className="h-6 w-6 text-white" />}
                </button>

                {callType === 'video' && (
                  <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`p-3 rounded-full transition-colors duration-200 ${
                      isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {isVideoOff ? <VideoOff className="h-6 w-6 text-white" /> : <Video className="h-6 w-6 text-white" />}
                  </button>
                )}

                <button className="p-3 bg-gray-600 hover:bg-gray-700 rounded-full transition-colors duration-200">
                  <MessageCircle className="h-6 w-6 text-white" />
                </button>

                <button className="p-3 bg-gray-600 hover:bg-gray-700 rounded-full transition-colors duration-200">
                  <Settings className="h-6 w-6 text-white" />
                </button>

                <button
                  onClick={endCall}
                  className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-200"
                >
                  <PhoneOff className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Calls</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <Video className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">+2 from yesterday</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Duration</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4h 32m</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">Average: 34 min</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">98%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <Phone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">Excellent quality</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Patient Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.9/5</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">+0.2 this month</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Calls */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Upcoming Calls
              </h2>
              <button className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      call.type === 'video' 
                        ? 'bg-blue-100 dark:bg-blue-900/20' 
                        : 'bg-green-100 dark:bg-green-900/20'
                    }`}>
                      {call.type === 'video' ? (
                        <Video className={`h-5 w-5 ${
                          call.type === 'video' 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-green-600 dark:text-green-400'
                        }`} />
                      ) : (
                        <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {call.patient}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {call.time} • {call.type} call
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => startCall(call.type)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                    >
                      Start
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Calendar className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Calls */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Calls
              </h2>
              <button className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      call.type === 'video' 
                        ? 'bg-blue-100 dark:bg-blue-900/20' 
                        : 'bg-green-100 dark:bg-green-900/20'
                    }`}>
                      {call.type === 'video' ? (
                        <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {call.patient}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {call.date} • {call.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {call.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call Quality & Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Call Settings & Quality
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Audio Settings</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Noise Cancellation</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Echo Reduction</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Auto Gain Control</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Video Settings</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">HD Video</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Virtual Background</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Auto Focus</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Privacy Settings</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">End-to-End Encryption</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Call Recording</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Screen Sharing</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TelemedicinePage;