import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatsCard from '../components/StatsCard';
import PaymentModal from '../components/PaymentModal';
import AppointmentProgressBar from '../components/AppointmentProgressBar';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Heart, 
  CreditCard, 
  Pill, 
  Activity, 
  Target, 
  Shield,
  Phone, 
  Plus, 
  Video,
  User,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
  department: string;
  status: 'scheduled' | 'confirmed' | 'checked_in' | 'in_waiting_room' | 'with_doctor' | 'completed' | 'cancelled';
  type: string;
  fee: number;
  paid: boolean;
  expectedDuration: number;
  estimatedWaitTime: number;
  queuePosition: number;
  elapsedTime: number;
}

interface Payment {
  id: number;
  description: string;
  amount: number;
  dueDate: string;
  doctor: string;
  appointmentData?: Appointment;
}

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showHealthGoalsModal, setShowHealthGoalsModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [showSymptomTracker, setShowSymptomTracker] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const stats = [
    { title: "Book Appointment", value: "", change: "", changeType: "neutral", icon: Calendar, color: "blue" },
    { title: "My Appointments", value: "", change: "", changeType: "neutral", icon: Clock, color: "blue" },
    { title: "Medical Records", value: "", change: "", changeType: "neutral", icon: FileText, color: "blue" },
    { title: "My Doctors", value: "", change: "", changeType: "neutral", icon: User, color: "blue" },
  ];

  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([
    { id: 1, date: "Jul 30, 2025", time: "03:30 PM", doctor: "Dr. Ramesh", department: "General", status: "confirmed", type: "Follow-up", fee: 150, paid: true, expectedDuration: 30, estimatedWaitTime: 0, queuePosition: 0, elapsedTime: 0 },
    { id: 2, date: "Aug 5, 2025", time: "10:00 AM", doctor: "Dr. Lakshmi", department: "Skin", status: "scheduled", type: "Consultation", fee: 200, paid: false, expectedDuration: 20, estimatedWaitTime: 15, queuePosition: 2, elapsedTime: 0 },
    { id: 3, date: "Aug 10, 2025", time: "09:15 AM", doctor: "Dr. Shalini", department: "ENT", status: "confirmed", type: "Check-up", fee: 150, paid: true, expectedDuration: 25, estimatedWaitTime: 0, queuePosition: 0, elapsedTime: 0 },
  ]);

  const recentVisits = [
    { id: 1, date: "Jul 15, 2025", doctor: "Dr. Ramesh", department: "General", type: "Follow-up", status: "completed", amount: 150 },
    { id: 2, date: "Jun 20, 2025", doctor: "Dr. Lakshmi", department: "Skin", type: "Consultation", status: "completed", amount: 200 },
    { id: 3, date: "Jun 5, 2025", doctor: "Dr. Shalini", department: "ENT", type: "Check-up", status: "completed", amount: 150 },
  ];

  const pendingPayments: Payment[] = [
    { id: 1, description: "Skin Consultation", amount: 200, dueDate: "Aug 5, 2025", doctor: "Dr. Lakshmi" },
  ];

  const healthReminders = [
    { id: 1, type: 'medication', title: 'Blood Pressure Medication', message: 'Take at 8:00 PM', time: '4 hours' },
    { id: 2, type: 'appointment', title: 'Upcoming Checkup', message: 'General appointment today', time: 'Now' },
  ];

  const healthGoals = [
    { id: 1, title: 'Daily Steps', target: 10000, current: 7500, unit: 'steps' },
    { id: 2, title: 'Water Intake', target: 8, current: 6, unit: 'glasses' },
  ];

  const medications = [
    { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', nextDose: '8:00 PM', taken: false },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setUpcomingAppointments(prev =>
        prev.map(apt => {
          let newApt = { ...apt };
          const isToday = apt.date === 'Jul 30, 2025';
          if (isToday && ['scheduled', 'confirmed', 'checked_in', 'in_waiting_room', 'with_doctor'].includes(apt.status)) {
            switch (apt.status) {
              case 'in_waiting_room':
                if (apt.estimatedWaitTime > 0) {
                  newApt.estimatedWaitTime = Math.max(0, apt.estimatedWaitTime - 1);
                  if (newApt.estimatedWaitTime <= 0) {
                    newApt.status = 'with_doctor';
                    newApt.estimatedWaitTime = 0;
                    newApt.queuePosition = 0;
                  }
                }
                break;
              case 'checked_in':
                if (Math.random() > 0.8) {
                  newApt.status = 'in_waiting_room';
                  newApt.estimatedWaitTime = 5;
                  newApt.queuePosition = 1;
                }
                break;
              case 'with_doctor':
                newApt.elapsedTime = apt.elapsedTime + 1;
                if (newApt.elapsedTime >= apt.expectedDuration) {
                  newApt.status = 'completed';
                  newApt.estimatedWaitTime = 0;
                }
                break;
              case 'confirmed':
                if (Math.random() > 0.95) {
                  newApt.status = 'checked_in';
                  newApt.estimatedWaitTime = 10;
                }
                break;
              case 'scheduled':
                if (Math.random() > 0.98) {
                  newApt.status = 'confirmed';
                }
                break;
            }
          }
          return newApt;
        })
      );
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'checked_in': return 'bg-yellow-100 text-yellow-800';
      case 'in_waiting_room': return 'bg-orange-100 text-orange-800';
      case 'with_doctor': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'book-appointment':
        navigate('/book-appointment');
        break;
      case 'my-appointments':
        navigate('/my-appointments');
        break;
      case 'medical-records':
        navigate('/my-records');
        break;
      case 'my-doctors':
        navigate('/my-doctors');
        break;
      case 'emergency':
        navigate('/emergency-contact');
        break;
      case 'health-goals':
        setShowHealthGoalsModal(true);
        break;
      case 'medications':
        setShowMedicationModal(true);
        break;
      case 'symptom-tracker':
        setShowSymptomTracker(true);
        break;
      case 'wellness':
        navigate('/health-tracking');
        break;
      case 'telemedicine':
        navigate('/patient-telemedicine');
        break;
      default:
        toast.info(`${action} feature activated`);
    }
  };

  const handlePayNow = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    toast.success('Payment completed successfully!');
    setUpcomingAppointments(prev =>
      prev.map(apt =>
        apt.id === selectedPayment?.appointmentData?.id
          ? { ...apt, paid: true }
          : apt
      )
    );
    setShowPaymentModal(false);
    setSelectedPayment(null);
  };

  const handleAppointmentAction = (action: string, appointment: Appointment) => {
    switch (action) {
      case 'reschedule':
        navigate('/my-appointments');
        toast.info('Redirecting to reschedule appointment...');
        break;
      case 'cancel':
        setUpcomingAppointments(prev => prev.filter(apt => apt.id !== appointment.id));
        toast.success('Appointment cancelled successfully');
        break;
      case 'video-call':
        toast.success('Starting video consultation...');
        break;
      case 'pay':
        handlePayNow({
          id: appointment.id,
          description: `${appointment.department} Consultation`,
          amount: appointment.fee,
          dueDate: appointment.date,
          doctor: appointment.doctor,
          appointmentData: appointment,
        });
        break;
      default:
        toast.info(`${action} performed`);
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
        navigate('/payments');
        break;
      default:
        toast.info(`Viewing all ${section}...`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[inset_10px_10px_20px_#ffffff,inset_-10px_-10px_20px_#e0e8f0] border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Hello, Priya K!</h1>
            <p className="text-gray-600 text-sm md:text-base">06:02 PM IST, Jul 30, 2025</p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mt-2 md:mt-0">
            <button
              onClick={() => navigate('/book-appointment')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-5 md:py-3 rounded-xl font-semibold flex items-center space-x-1 md:space-x-2 shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff] w-full md:w-auto"
            >
              <Plus className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-base">Book Appointment</span>
            </button>
            <button
              onClick={() => handleQuickAction('emergency')}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 md:px-5 md:py-3 rounded-xl font-semibold flex items-center space-x-1 md:space-x-2 shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff] w-full md:w-auto"
            >
              <Phone className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-base">Emergency</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(stat.title.toLowerCase().replace(' ', '-'))}
              className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl flex flex-col items-center justify-center h-24 md:h-36 border border-gray-200 shadow-[10px_10px_20px_#e0e8f0,-10px_-10px_20px_#ffffff] hover:shadow-[5px_5px_15px_#babecc,-5px_-5px_15px_#ffffff] transition-shadow duration-300"
            >
              <stat.icon className="h-6 w-6 md:h-8 md:w-8 mb-2 text-blue-600" />
              <span className="text-sm md:text-lg font-medium text-gray-800 text-center">{stat.title}</span>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[inset_10px_10px_20px_#e0e8f0,inset_-10px_-10px_20px_#ffffff] p-4 md:p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">My Appointments</h2>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
                <span className="text-sm text-gray-500">Last updated: {lastUpdate.toLocaleTimeString()}</span>
                <button
                  onClick={() => handleViewAll('appointments')}
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white/80 backdrop-blur-md p-3 md:p-4 rounded-xl border border-gray-200 shadow-[10px_10px_20px_#e0e8f0,-10px_-10px_20px_#ffffff] hover:shadow-[5px_5px_15px_#babecc,-5px_-5px_15px_#ffffff] transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-x-0 md:space-x-4">
                    <div className="flex-1">
                      <p className="text-sm md:text-base text-gray-700">Date: <span className="font-medium">{appointment.date}</span></p>
                      <p className="text-sm md:text-base text-gray-700">Time: <span className="font-medium">{appointment.time}</span></p>
                      <p className="text-sm md:text-base text-gray-700">Doctor: <span className="font-medium">{appointment.doctor}</span></p>
                      <p className="text-sm md:text-base text-gray-700">Dept: <span className="font-medium">{appointment.department}</span></p>
                    </div>
                    <div className="flex-shrink-0 mt-2 md:mt-0">
                      <span className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex-shrink-0 mt-2 md:mt-0 space-x-2">
                      <button onClick={() => handleAppointmentAction('view', appointment)} className="text-blue-600 hover:text-blue-500 text-sm font-medium hover:underline">View</button>
                      {appointment.status === 'confirmed' && <button onClick={() => handleAppointmentAction('cancel', appointment)} className="text-red-600 hover:text-red-500 text-sm font-medium hover:underline">Cancel</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <button onClick={() => handleQuickAction('payments')} className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl flex items-center border border-gray-200 shadow-[10px_10px_20px_#e0e8f0,-10px_-10px_20px_#ffffff] hover:shadow-[5px_5px_15px_#babecc,-5px_-5px_15px_#ffffff] w-full md:w-1/2">
              <CreditCard className="h-5 w-5 mr-2 md:mr-3 text-gray-700" /> <span className="text-lg font-medium text-gray-800">Billing</span>
            </button>
            <button onClick={() => handleQuickAction('profile-settings')} className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl flex items-center border border-gray-200 shadow-[10px_10px_20px_#e0e8f0,-10px_-10px_20px_#ffffff] hover:shadow-[5px_5px_15px_#babecc,-5px_-5px_15px_#ffffff] w-full md:w-1/2">
              <Shield className="h-5 w-5 mr-2 md:mr-3 text-gray-700" /> <span className="text-lg font-medium text-gray-800">Profile / Settings</span>
            </button>
          </div>
        </div>

        {showHealthGoalsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-6 w-full max-w-xs md:max-w-md mx-2 md:mx-4 border border-gray-200 shadow-[10px_10px_20px_#e0e8f0,-10px_-10px_20px_#ffffff]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Today's Health Goals</h3>
                <button onClick={() => setShowHealthGoalsModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              <div className="space-y-2">
                {healthGoals.map((goal) => (
                  <div key={goal.id} className="p-2 md:p-3 bg-gray-50/70 backdrop-blur-md rounded-xl border border-gray-200 shadow-[10px_10px_20px_#e0e8f0,-10px_-10px_20px_#ffffff]">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{goal.title}</h4>
                      <span className="text-sm text-gray-600">{goal.current}/{goal.target} {goal.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => { setShowHealthGoalsModal(false); navigate('/health-tracking'); }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-xl font-semibold transition-all duration-300 shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff]"
                >
                  View Full Tracking
                </button>
              </div>
            </div>
          </div>
        )}

        {showMedicationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-6 w-full max-w-xs md:max-w-md mx-2 md:mx-4 border border-gray-200 shadow-[10px_10px_20px_#e0e8f0,-10px_-10px_20px_#ffffff]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Medication Schedule</h3>
                <button onClick={() => setShowMedicationModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              <div className="space-y-2">
                {medications.map((med) => (
                  <div key={med.id} className={`p-2 md:p-3 rounded-xl border border-gray-200 shadow-[10px_10px_20px_#e0e8f0,-10px_-10px_20px_#ffffff] ${med.taken ? 'bg-green-50/70' : 'bg-orange-50/70'}`}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{med.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showSymptomTracker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-6 w-full max-w-xs md:max-w-md mx-2 md:mx-4 border border-gray-200 shadow-[10px_10px_20px_#e0e8f0,-10px_-10px_20px_#ffffff]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Log Symptoms</h3>
                <button onClick={() => setShowSymptomTracker(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">How are you feeling today?</label>
                  <div className="grid grid-cols-5 gap-1 md:gap-2">
                    {['😢', '😕', '😐', '🙂', '😊'].map((emoji, index) => (
                      <button key={index} className="p-2 md:p-3 text-2xl md:text-3xl hover:bg-gray-100/50 rounded-xl transition-all duration-300" onClick={() => toast.success(`Mood logged: ${emoji}`)}>{emoji}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms (if any)</label>
                  <textarea rows={2} className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70 backdrop-blur-md text-gray-900 text-sm" placeholder="Describe any symptoms you're experiencing..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pain Level (0-10)</label>
                  <input type="range" min="0" max="10" className="w-full" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-3">
                <button onClick={() => setShowSymptomTracker(false)} className="px-2 py-1 md:px-3 md:py-2 text-gray-700 hover:bg-gray-100/50 rounded-xl transition-all duration-300">Cancel</button>
                <button onClick={() => { toast.success('Symptoms logged successfully!'); setShowSymptomTracker(false); }} className="px-2 py-1 md:px-3 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff]">Save Entry</button>
              </div>
            </div>
          </div>
        )}

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={selectedPayment?.amount || 0}
          description={selectedPayment?.description || ''}
          appointmentData={selectedPayment?.appointmentData}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    </div>
  );
};

export default PatientDashboard;