import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatsCard from '../components/StatsCard';
import Booking from '../assets/booking.png';
import Man from '../assets/man.png';
import Medical from '../assets/medical.png';
import Doctor from '../assets/doctor.png';
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
  const [activeStat, setActiveStat] = useState('book-appointment');

  const stats = [
    {
      title: "Book Appointment",
      value: "",
      change: "",
      changeType: "neutral" as const,
      icon: Booking,
      color: "#4273d9",
    },
    {
      title: "My Appointments",
      value: "",
      change: "",
      changeType: "neutral" as const,
      icon: Man,
      color: "#f5f6fa",
    },
    {
      title: "Medical Records",
      value: "",
      change: "",
      changeType: "neutral" as const,
      icon: Medical,
      color: "#f5f6fa",
    },
    {
      title: "My Doctors",
      value: "",
      change: "",
      changeType: "neutral" as const,
      icon: Doctor,
      color: "#f5f6fa",
    },
  ];

  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([
    {
      id: 1,
      date: "26 Jul 2025",
      time: "02:38 PM",
      doctor: "Dr. Ramesh",
      department: "General",
      status: "confirmed",
      type: "Follow-up",
      fee: 150,
      paid: true,
      expectedDuration: 30,
      estimatedWaitTime: 0,
      queuePosition: 0,
      elapsedTime: 0,
    },
    {
      id: 2,
      date: "14 Jun 2025",
      time: "10:00 AM",
      doctor: "Dr. Lakshmi",
      department: "Skin",
      status: "completed",
      type: "Consultation",
      fee: 200,
      paid: true,
      expectedDuration: 20,
      estimatedWaitTime: 0,
      queuePosition: 0,
      elapsedTime: 0,
    },
    {
      id: 3,
      date: "03 May 2025",
      time: "09:15 AM",
      doctor: "Dr. Shalini",
      department: "ENT",
      status: "cancelled",
      type: "Check-up",
      fee: 150,
      paid: false,
      expectedDuration: 25,
      estimatedWaitTime: 0,
      queuePosition: 0,
      elapsedTime: 0,
    },
  ]);

  const recentVisits = [
    {
      id: 1,
      date: "26 Jul 2025",
      doctor: "Dr. Ramesh",
      department: "General",
      type: "Follow-up",
      status: "confirmed",
      amount: 150,
    },
    {
      id: 2,
      date: "14 Jun 2025",
      doctor: "Dr. Lakshmi",
      department: "Skin",
      type: "Consultation",
      status: "completed",
      amount: 200,
    },
    {
      id: 3,
      date: "03 May 2025",
      doctor: "Dr. Shalini",
      department: "ENT",
      type: "Check-up",
      status: "cancelled",
      amount: 150,
    },
  ];

  const pendingPayments: Payment[] = [
    {
      id: 1,
      description: "General Consultation",
      amount: 150,
      dueDate: "26 Jul 2025",
      doctor: "Dr. Ramesh",
    },
  ];

  const healthReminders = [
    { id: 1, type: 'medication', title: 'Blood Pressure Medication', message: 'Take at 8:00 PM', time: '5 hours' },
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
          const isToday = apt.date === '26 Jul 2025';
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
      case 'scheduled': return 'bg-teal-100 text-teal-800';
      case 'confirmed': return 'bg-emerald-100 text-emerald-800';
      case 'checked_in': return 'bg-amber-100 text-amber-800';
      case 'in_waiting_room': return 'bg-orange-100 text-orange-800';
      case 'with_doctor': return 'bg-emerald-100 text-emerald-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQuickAction = (action: string) => {
    setActiveStat(action);
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
      case 'billing':
        navigate('/billing-summary');
        break;
        case 'profile-settings':
        navigate('/patient-settings');
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-indigo-50 p-5 lg:p-8">
      <div className="bg-white/90 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex justify-between gap-5 lg:gap-2 flex-col lg:flex-row items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hello, Ajith!</h1>
            <p className="text-gray-600 mt-1">12:14 PM IST, Aug 07, 2025</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/book-appointment')}
              className="bg-[#4273d9] text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 shadow-md transition-colors"
            >
              <Calendar className="h-5 w-5" />
              <span>Book Appointment</span>
            </button>
            <button
              onClick={() => handleQuickAction('emergency')}
              className="bg-rose-500 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 shadow-md transition-colors"
            >
              {/* <Phone className="h-5 w-5" /> */}
              <span>🚨 Emergency Slot</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(stat.title.toLowerCase().replace(' ', '-'))}
              className={`p-5 rounded-lg flex flex-col items-center justify-center h-39 shadow-lg transition-colors
                ${stat.color === '#f5f6fa' ? 'bg-[#f5f6fa] text-black' : 'bg-[#4273d9] text-white'}
                hover:bg-[#4273d9] hover:text-white
                ${activeStat === stat.title.toLowerCase().replace(' ', '-') ? 'bg-[#4273d9] text-white' : ''}`}
            >
              <img src={stat.icon} className="h-20 w-20 mb-2" />
              <span className="text-lg font-medium">{stat.title}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Appointments</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleViewAll('appointments')}
                  className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="space-y-4 overflow-x-auto">
              <table className="w-full min-w-[400px] border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left text-gray-700 whitespace-nowrap">Date</th>
                    <th className="p-3 text-left text-gray-700 whitespace-nowrap">Doctor</th>
                    <th className="p-3 text-left text-gray-700 whitespace-nowrap">Department</th>
                    <th className="p-3 text-left text-gray-700 whitespace-nowrap">Status</th>
                    <th className="p-3 text-left text-gray-700 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-3 whitespace-nowrap">{appointment.date}</td>
                      <td className="p-3 whitespace-nowrap">{appointment.doctor}</td>
                      <td className="p-3 whitespace-nowrap">{appointment.department}</td>
                      <td className={`p-3 ${getStatusColor(appointment.status)} rounded-full mt-2 px-3 py-1 inline-block whitespace-nowrap`}>{appointment.status}</td>
                      <td className="p-3 whitespace-nowrap">
                        <button onClick={() => handleAppointmentAction('view', appointment)} className="text-indigo-600 mr-2 hover:underline">View</button>
                        {appointment.status === 'confirmed' && <button onClick={() => handleAppointmentAction('cancel', appointment)} className="text-rose-600 hover:underline">Cancel</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex space-x-6 mt-8">
          <button onClick={() => handleQuickAction('billing')} className="bg-gray-100 p-5 rounded-lg flex items-center space-x-3 hover:bg-gray-200 transition-colors">
            <CreditCard className="h-6 w-6 text-indigo-600" />
            <span className="text-lg font-medium text-gray-900">Billing</span>
          </button>
          <button onClick={() => handleQuickAction('profile-settings')} className="bg-gray-100 p-5 rounded-lg flex items-center space-x-3 hover:bg-gray-200 transition-colors">
            <Shield className="h-6 w-6 text-purple-600" />
            <span className="text-lg font-medium text-gray-900">Profile / Settings</span>
          </button>
        </div>

        {showHealthGoalsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Today's Health Goals</h3>
                <button onClick={() => setShowHealthGoalsModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              <div className="space-y-4">
                {healthGoals.map((goal) => (
                  <div key={goal.id} className="p-4 bg-teal-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{goal.title}</h4>
                      <span className="text-sm text-gray-600">{goal.current}/{goal.target} {goal.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => { setShowHealthGoalsModal(false); navigate('/health-tracking'); }}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  View Full Tracking
                </button>
              </div>
            </div>
          </div>
        )}

        {showMedicationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Medication Schedule</h3>
                <button onClick={() => setShowMedicationModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              <div className="space-y-4">
                {medications.map((med) => (
                  <div key={med.id} className={`p-4 rounded-lg ${med.taken ? 'bg-emerald-50' : 'bg-amber-50'}`}>
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
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Log Symptoms</h3>
                <button onClick={() => setShowSymptomTracker(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling today?</label>
                  <div className="grid grid-cols-5 gap-2">
                    {['😢', '😕', '😐', '🙂', '😊'].map((emoji, index) => (
                      <button key={index} className="p-3 text-2xl bg-gray-100 rounded-lg hover:bg-gray-200" onClick={() => toast.success(`Mood logged: ${emoji}`)}>{emoji}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms (if any)</label>
                  <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white" placeholder="Describe any symptoms you're experiencing..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pain Level (0-10)</label>
                  <input type="range" min="0" max="10" className="w-full accent-indigo-600" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button onClick={() => setShowSymptomTracker(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button onClick={() => { toast.success('Symptoms logged successfully!'); setShowSymptomTracker(false); }} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">Save Entry</button>
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