import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import StatsCard from '../components/StatsCard';
import PaymentModal from '../components/PaymentModal';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Heart, 
  CreditCard, 
  MessageCircle,
  Download,
  Upload,
  Bell,
  Phone,
  Plus,
  Video,
  Activity,
  Pill,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const stats = [
    {
      title: "Next Appointment",
      value: "Dec 15",
      change: "2 days",
      changeType: "neutral" as const,
      icon: Calendar,
      color: "blue" as const
    },
    {
      title: "Total Visits",
      value: "47",
      change: "+3 this year",
      changeType: "increase" as const,
      icon: Clock,
      color: "green" as const
    },
    {
      title: "Pending Reports",
      value: "2",
      change: "Lab results",
      changeType: "neutral" as const,
      icon: FileText,
      color: "orange" as const
    }
  ];

  const upcomingAppointments = [
    { id: 1, date: "Dec 15, 2024", time: "10:30 AM", doctor: "Dr. Sarah Johnson", department: "Cardiology", status: "confirmed", fee: 150 },
    { id: 2, date: "Dec 20, 2024", time: "2:00 PM", doctor: "Dr. Michael Brown", department: "Orthopedics", status: "confirmed", fee: 200 },
    { id: 3, date: "Jan 5, 2025", time: "9:15 AM", doctor: "Dr. Sarah Johnson", department: "Cardiology", status: "scheduled", fee: 150 }
  ];

  const recentVisits = [
    { id: 1, date: "Nov 28, 2024", doctor: "Dr. Sarah Johnson", department: "Cardiology", type: "Follow-up", status: "completed", amount: 150 },
    { id: 2, date: "Nov 15, 2024", doctor: "Dr. Michael Brown", department: "Orthopedics", type: "Consultation", status: "completed", amount: 200 },
    { id: 3, date: "Oct 30, 2024", doctor: "Dr. Sarah Johnson", department: "Cardiology", type: "Check-up", status: "completed", amount: 150 }
  ];

  const pendingPayments = [
    { id: 1, description: "Cardiology Consultation", amount: 150, dueDate: "Dec 20, 2024", doctor: "Dr. Sarah Johnson" },
    { id: 2, description: "Lab Tests", amount: 75, dueDate: "Dec 25, 2024", doctor: "Dr. Michael Brown" }
  ];

  const healthReminders = [
    { id: 1, type: 'medication', title: 'Blood Pressure Medication', message: 'Take your medication at 8:00 PM', time: '2 hours' },
    { id: 2, type: 'exercise', title: 'Daily Exercise', message: 'Complete 30 minutes of cardio', time: 'Today' },
    { id: 3, type: 'appointment', title: 'Upcoming Checkup', message: 'Cardiology appointment in 2 days', time: '2 days' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'book-appointment':
        navigate('/my-appointments');
        break;
      case 'medical-records':
        navigate('/my-records');
        break;
      case 'payments':
        navigate('/payments');
        break;
      case 'emergency':
        navigate('/emergency-contact');
        break;
      case 'health-assistant':
        navigate('/health-assistant');
        break;
      case 'telemedicine':
        navigate('/patient-telemedicine');
        break;
      default:
        toast.info(`₹{action} feature activated`);
    }
  };

  const handlePayNow = (payment: any) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    toast.success('Payment completed successfully!');
    // Remove the paid item from pending payments
    // In a real app, you'd update the backend
  };

  const handleAppointmentAction = (action: string, appointment: any) => {
    switch (action) {
      case 'reschedule':
        navigate('/patient-dashboard');
        toast.info('Redirecting to reschedule appointment...');
        break;
      case 'cancel':
        toast.success('Appointment cancelled successfully');
        break;
      case 'video-call':
        toast.success('Starting video consultation...');
        break;
      case 'pay':
        handlePayNow({
          description: `₹{appointment.department} Consultation`,
          amount: appointment.fee,
          doctor: appointment.doctor,
          appointmentData: appointment
        });
        break;
      default:
        toast.info(`₹{action} performed`);
    }
  };

  const handleViewAll = (section: string) => {
    switch (section) {
      case 'appointments':
        navigate('/my-appointments');
        break;
      case 'records':
        navigate('/my-records');
        break;
      case 'payments':
        navigate('/patient-dashboard');
        break;
      default:
        toast.info(`Viewing all ₹{section}...`);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your healthcare journey
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
            <button 
             
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Emergency</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} onClick={() => handleViewAll('appointments')} className="cursor-pointer">
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Upcoming Appointments
                </h2>
                <button 
                  
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500 text-sm font-medium"
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {appointment.date}
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {appointment.time}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {appointment.doctor}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {appointment.department} • ₹{appointment.fee}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ₹{getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <div className="flex items-center space-x-1">
                        
                        <button 
                         
                          className="text-green-600 hover:text-green-500 dark:text-green-400 p-1"
                          title="Pay Now"
                        >
                          <CreditCard className="h-4 w-4" />
                        </button>
                        <button 
                          
                          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 p-1"
                          title="Reschedule"
                        >
                          <Calendar className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Health Assistant */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  
                  className="w-full flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                >
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Book Appointment
                  </span>
                </button>
                <button 
                  
                  className="w-full flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200"
                >
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Medical Records
                  </span>
                </button>
                <button 
                  
                  className="w-full flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200"
                >
                  <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Payment History
                  </span>
                </button>
                <button 
                  
                  className="w-full flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                >
                  <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">
                    Emergency Contact
                  </span>
                </button>
              </div>
            </div>

            {/* Health Reminders */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Health Reminders
              </h3>
              <div className="space-y-3">
                {healthReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ₹{
                      reminder.type === 'medication' ? 'bg-blue-100 dark:bg-blue-900/20' :
                      reminder.type === 'exercise' ? 'bg-green-100 dark:bg-green-900/20' :
                      'bg-purple-100 dark:bg-purple-900/20'
                    }`}>
                      {reminder.type === 'medication' ? (
                        <Pill className={`h-4 w-4 ₹{
                          reminder.type === 'medication' ? 'text-blue-600 dark:text-blue-400' :
                          reminder.type === 'exercise' ? 'text-green-600 dark:text-green-400' :
                          'text-purple-600 dark:text-purple-400'
                        }`} />
                      ) : reminder.type === 'exercise' ? (
                        <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {reminder.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {reminder.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Due in {reminder.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Health Assistant */}
            {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Health Assistant
                </h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    💊 Reminder: Take your blood pressure medication at 8:00 PM
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    🏃‍♂️ You're doing great! 7 days of consistent exercise this week
                  </p>
                </div>
                <button 
                  
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Chat with Assistant</span>
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Recent Visits & Pending Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Visits */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Visits
              </h2>
              <button 
                
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 text-sm font-medium"
              >
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {visit.date}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {visit.doctor}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {visit.department} • {visit.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      ₹{visit.amount}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ₹{getStatusColor(visit.status)}`}>
                      {visit.status}
                    </span>
                    <button 
                      onClick={() => toast.success('Downloading visit summary...')}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Payments */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Pending Payments
              </h2>
              <button 
                
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 text-sm font-medium"
              >
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {pendingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {payment.description}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {payment.doctor} • Due: {payment.dueDate}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{payment.amount}
                    </span>
                    <button 
                      
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={selectedPayment?.amount || 0}
          description={selectedPayment?.description || ''}
          appointmentData={selectedPayment?.appointmentData}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;