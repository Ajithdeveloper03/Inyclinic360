import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { MessageCircle, Send, Bot, User, Bell, Calendar, Heart, Activity, Mic, Paperclip, Smile } from 'lucide-react';

const HealthAssistantPage = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI Health Assistant. I can help you with medication reminders, health tips, symptom tracking, and answer questions about your care. How can I assist you today?",
      timestamp: '10:00 AM'
    },
    {
      id: 2,
      type: 'user',
      content: "Can you remind me about my medications?",
      timestamp: '10:01 AM'
    },
    {
      id: 3,
      type: 'bot',
      content: "Of course! Based on your prescription history, you have the following medications:\n\n• Blood pressure medication - Take at 8:00 PM daily\n• Vitamin D supplement - Take with breakfast\n\nWould you like me to set up automatic reminders for these?",
      timestamp: '10:01 AM'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user' as const,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setIsTyping(true);
      
      // Simulate bot response
      setTimeout(() => {
        const responses = [
          "I understand your concern. Let me help you with that. Based on your medical history, I recommend...",
          "That's a great question! Here's what I can tell you about that condition...",
          "I've noted that in your health profile. Would you like me to schedule a reminder for this?",
          "Based on your symptoms, I suggest consulting with your doctor. Shall I help you book an appointment?",
          "I've updated your health tracking. Your progress looks good! Keep up the healthy habits."
        ];
        
        const botResponse = {
          id: messages.length + 2,
          type: 'bot' as const,
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleQuickAction = (action: string) => {
    const quickMessages = {
      'medication': "Can you show me my medication schedule?",
      'appointment': "I need to book an appointment",
      'symptoms': "I want to log some symptoms",
      'tips': "Give me some health tips"
    };
    
    setMessage(quickMessages[action as keyof typeof quickMessages] || action);
  };

  const quickActions = [
    { icon: Bell, title: 'Medication Reminders', description: 'Set up automatic medication alerts', action: 'medication' },
    { icon: Calendar, title: 'Appointment Prep', description: 'Get ready for your next visit', action: 'appointment' },
    { icon: Heart, title: 'Health Tips', description: 'Personalized wellness advice', action: 'tips' },
    { icon: Activity, title: 'Symptom Tracker', description: 'Log and monitor symptoms', action: 'symptoms' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Health Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your personal healthcare companion powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Health Assistant
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-400">Online • Ready to help</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Mic className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        msg.type === 'user' 
                          ? 'bg-blue-600' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        {msg.type === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-2 ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{msg.content}</p>
                        <p className={`text-xs mt-1 ${
                          msg.type === 'user' 
                            ? 'text-blue-100' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Suggestions */}
              <div className="px-6 py-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2 overflow-x-auto">
                  <button 
                    onClick={() => handleQuickAction('medication')}
                    className="flex-shrink-0 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    💊 Medications
                  </button>
                  <button 
                    onClick={() => handleQuickAction('symptoms')}
                    className="flex-shrink-0 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
                  >
                    🩺 Log Symptoms
                  </button>
                  <button 
                    onClick={() => handleQuickAction('appointment')}
                    className="flex-shrink-0 px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-xs hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    📅 Book Appointment
                  </button>
                  <button 
                    onClick={() => handleQuickAction('tips')}
                    className="flex-shrink-0 px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full text-xs hover:bg-orange-200 dark:hover:bg-orange-900/30 transition-colors"
                  >
                    💡 Health Tips
                  </button>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors duration-200"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                  >
                    <action.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {action.title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {action.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Health Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Today's Insights
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      Medication Reminder
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Take your blood pressure medication at 8:00 PM
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      Exercise Goal
                    </span>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    You've completed 7/7 days of exercise this week!
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      Upcoming Appointment
                    </span>
                  </div>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    Cardiology follow-up in 2 days
                  </p>
                </div>
              </div>
            </div>

            {/* Health Score */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Health Score
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">87%</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Great job! Your health metrics are improving.
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HealthAssistantPage;