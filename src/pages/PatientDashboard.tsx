import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
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
    {
      title: "Next Appointment",
      value: "Dec 15",
      change: "2 days",
      changeType: "neutral" as const,
      icon: Calendar,
      color: "blue" as const,
    },
    {
      title: "Total Visits",
      value: "47",
      change: "+3 this year",
      changeType: "increase" as const,
      icon: Clock,
      color: "green" as const,
    },
    {
      title: "Pending Reports",
      value: "2",
      change: "Lab results",
      changeType: "neutral" as const,
      icon: FileText,
      color: "orange" as const,
    },
  ];

  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([
    {
      id: 1,
      date: "Dec 15, 2024",
      time: "10:30 AM",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
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
      date: "Dec 20, 2024",
      time: "2:00 PM",
      doctor: "Dr. Michael Brown",
      department: "Orthopedics",
      status: "confirmed",
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
      date: "Jan 5, 2025",
      time: "9:15 AM",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      status: "scheduled",
      type: "Check-up",
      fee: 150,
      paid: false,
      expectedDuration: 25,
      estimatedWaitTime: 60,
      queuePosition: 3,
      elapsedTime: 0,
    },
  ]);

  const recentVisits = [
    {
      id: 1,
      date: "Nov 28, 2024",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      type: "Follow-up",
      status: "completed",
      amount: 150,
    },
    {
      id: 2,
      date: "Nov 15, 2024",
      doctor: "Dr. Michael Brown",
      department: "Orthopedics",
      type: "Consultation",
      status: "completed",
      amount: 200,
    },
    {
      id: 3,
      date: "Oct 30, 2024",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      type: "Check-up",
      status: "completed",
      amount: 150,
    },
  ];

  const pendingPayments: Payment[] = [
    {
      id: 1,
      description: "Cardiology Consultation",
      amount: 150,
      dueDate: "Dec 20, 2024",
      doctor: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      description: "Lab Tests",
      amount: 75,
      dueDate: "Dec 25, 2024",
      doctor: "Dr. Michael Brown",
    },
  ];

  const healthReminders = [
    { id: 1, type: 'medication', title: 'Blood Pressure Medication', message: 'Take your medication at 8:00 PM', time: '2 hours' },
    { id: 2, type: 'exercise', title: 'Daily Exercise', message: 'Complete 30 minutes of cardio', time: 'Today' },
    { id: 3, type: 'appointment', title: 'Upcoming Checkup', message: 'Cardiology appointment in 2 days', time: '2 days' },
  ];

  const healthGoals = [
    { id: 1, title: 'Daily Steps', target: 10000, current: 7500, unit: 'steps' },
    { id: 2, title: 'Water Intake', target: 8, current: 6, unit: 'glasses' },
    { id: 3, title: 'Sleep Hours', target: 8, current: 7.5, unit: 'hours' },
    { id: 4, title: 'Exercise Minutes', target: 30, current: 25, unit: 'minutes' },
  ];

  const medications = [
    { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', nextDose: '8:00 PM', taken: false },
    { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', nextDose: '6:00 PM', taken: true },
    { id: 3, name: 'Vitamin D', dosage: '1000 IU', frequency: 'Once daily', nextDose: 'Tomorrow 9:00 AM', taken: true },
  ];

  // Live tracking updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUpcomingAppointments(prev =>
        prev.map(apt => {
          let newApt = { ...apt };
          const isToday = apt.date === 'Dec 15, 2024'; // Simulate for specific date
          if (isToday && ['scheduled', 'confirmed', 'checked_in', 'in_waiting_room', 'with_doctor'].includes(apt.status)) {
            switch (apt.status) {
              case 'in_waiting_room':
                if (apt.estimatedWaitTime > 0) {
                  newApt.estimatedWaitTime = Math.max(0, apt.estimatedWaitTime - Math.floor(Math.random() * 3) - 1);
                  if (newApt.estimatedWaitTime <= 2 && Math.random() > 0.7) {
                    newApt.status = 'with_doctor';
                    newApt.estimatedWaitTime = 0;
                    newApt.queuePosition = 0;
                    toast.success('You are now with the doctor!');
                  } else if (newApt.queuePosition > 1) {
                    newApt.queuePosition = Math.max(1, newApt.queuePosition - 1);
                    if (newApt.queuePosition === 1) {
                      toast.success('You are next in line!');
                    }
                  }
                }
                break;
              case 'checked_in':
                if (Math.random() > 0.8) {
                  newApt.status = 'in_waiting_room';
                  newApt.estimatedWaitTime = Math.max(5, apt.estimatedWaitTime - 5);
                  newApt.queuePosition = Math.max(1, apt.queuePosition - 1);
                  toast.success('You are now in the waiting room!');
                } else {
                  newApt.estimatedWaitTime = Math.max(0, apt.estimatedWaitTime - Math.floor(Math.random() * 2));
                }
                break;
              case 'with_doctor':
                newApt.elapsedTime = apt.elapsedTime + 1;
                if (newApt.elapsedTime >= apt.expectedDuration && Math.random() > 0.6) {
                  newApt.status = 'completed';
                  newApt.estimatedWaitTime = 0;
                  toast.success('Your appointment is complete!');
                }
                break;
              case 'confirmed':
                if (Math.random() > 0.95) {
                  newApt.status = 'checked_in';
                  newApt.estimatedWaitTime = Math.max(10, apt.estimatedWaitTime - 10);
                  toast.success('You have checked in for your appointment!');
                }
                break;
              case 'scheduled':
                if (Math.random() > 0.98) {
                  newApt.status = 'confirmed';
                  toast.success('Your appointment is confirmed!');
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
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'checked_in': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'in_waiting_room': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'with_doctor': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
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
              onClick={() => handleQuickAction('book-appointment')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
            <button
              onClick={() => handleQuickAction('patient-dashboard')}
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
            <div
              key={index}
              onClick={() => handleViewAll(stat.title === 'Pending Reports' ? 'records' : 'appointments')}
              className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
            >
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Quick Health Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Health Overview
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuickAction('medications')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <Pill className="h-4 w-4" />
                <span>Medications</span>
              </button>
              <button
                onClick={() => handleQuickAction('symptom-tracker')}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <Activity className="h-4 w-4" />
                <span>Symptoms</span>
              </button>
              <button
                onClick={() => handleQuickAction('health-goals')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <Target className="h-4 w-4" />
                <span>Goals</span>
              </button>
            </div>
          </div>
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
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Last updated: {lastUpdate.toLocaleTimeString()}
                  </span>
                  <button
                    onClick={() => handleViewAll('appointments')}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {appointment.doctor}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {appointment.department} • {appointment.date} • {appointment.time} • ₹{appointment.fee}
                          {appointment.paid && <span className="text-green-600 ml-2">• Paid</span>}
                        </div>
                        <div className="mt-2 w-48">
                          <AppointmentProgressBar
                            status={appointment.status}
                            queuePosition={appointment.queuePosition}
                            estimatedWaitTime={appointment.estimatedWaitTime}
                            expectedDuration={appointment.expectedDuration}
                            elapsedTime={appointment.elapsedTime}
                            showDetails={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status.replace('_', ' ')}
                      </span>
                      <div className="flex items-center space-x-1">
                        {/* {appointment.status === 'with_doctor' && (
                          <button
                            onClick={() => handleAppointmentAction('video-call', appointment)}
                            className="text-purple-600 hover:text-purple-500 dark:text-purple-400 p-1"
                            title="Video Call"
                          >
                            <Video className="h-4 w-4" />
                          </button>
                        )} */}
                        {/* {!appointment.paid && (
                          <button
                            onClick={() => handleAppointmentAction('pay', appointment)}
                            className="text-green-600 hover:text-green-500 dark:text-green-400 p-1"
                            title="Pay Now"
                          >
                            <CreditCard className="h-4 w-4" />
                          </button>
                        )} */}
                        <button
                          onClick={() => handleAppointmentAction('reschedule', appointment)}
                          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 p-1"
                          title="Reschedule"
                        >
                          <Calendar className="h-4 w-4" />
                        </button>
                        {/* <button
                          onClick={() => handleAppointmentAction('cancel', appointment)}
                          className="text-red-600 hover:text-red-500 dark:text-red-400 p-1"
                          title="Cancel"
                        >
                          <Phone className="h-4 w-4" />
                        </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Health Reminders */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleQuickAction('book-appointment')}
                  className="w-full flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                >
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Book Appointment
                  </span>
                </button>
                <button
                  onClick={() => handleQuickAction('medical-records')}
                  className="w-full flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200"
                >
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Medical Records
                  </span>
                </button>
                <button
                  onClick={() => handleQuickAction('payments')}
                  className="w-full flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200"
                >
                  <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Payment History
                  </span>
                </button>
                <button
                  // onClick={() => handleQuickAction('emergency')}
                  className="w-full flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                >
                  <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">
                    Emergency Contact
                  </span>
                </button>
                {/* <button
                  onClick={() => handleQuickAction('telemedicine')}
                  className="w-full flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200"
                >
                  <Video className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Telemedicine
                  </span>
                </button> */}
                {/* <button
                  onClick={() => handleQuickAction('insurance')}
                  className="w-full flex items-center space-x-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg transition-colors duration-200"
                >
                  <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    Insurance & Benefits
                  </span>
                </button> */}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleQuickAction('wellness')}
                  className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 hover:from-green-100 hover:to-blue-100 dark:hover:from-green-900/30 dark:hover:to-blue-900/30 rounded-lg transition-colors duration-200"
                >
                  <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Wellness Center
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
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        reminder.type === 'medication'
                          ? 'bg-blue-100 dark:bg-blue-900/20'
                          : reminder.type === 'exercise'
                          ? 'bg-green-100 dark:bg-green-900/20'
                          : 'bg-purple-100 dark:bg-purple-900/20'
                      }`}
                    >
                      {reminder.type === 'medication' ? (
                        <Pill className="h-4 w-4 text-blue-600 dark:text-blue-400" />
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
          </div>
        </div>

        {/* Health Goals Modal */}
        {showHealthGoalsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Today's Health Goals
                </h3>
                <button
                  onClick={() => setShowHealthGoalsModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                {healthGoals.map((goal) => (
                  <div key={goal.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {goal.title}
                      </h4>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {goal.target} {goal.unit}
                      </span>
                    </div>
                    {/* <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {Math.round((goal.current / goal.target) * 100)}% complete
                    </p> */}
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setShowHealthGoalsModal(false);
                    navigate('/health-tracking');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  View Full Tracking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Medication Modal */}
        {showMedicationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Medication Schedule
                </h3>
                <button
                  onClick={() => setShowMedicationModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                {medications.map((med) => (
                  <div
                    key={med.id}
                    className={`p-4 rounded-lg border-2 ${
                      med.taken
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {med.name}
                      </h4>
                      {/* <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          med.taken
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        }`}
                      >
                        {med.taken ? 'Taken' : 'Pending'}
                      </span> */}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {med.dosage} • {med.frequency}
                    </p>
                    {/* <p className="text-sm text-gray-600 dark:text-gray-400">
                      Next dose: {med.nextDose}
                    </p> */}
                    {/* {!med.taken && (
                      <button
                        onClick={() => toast.success(`Marked ${med.name} as taken`)}
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                      >
                        Mark as Taken
                      </button>
                    )} */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Symptom Tracker Modal */}
        {showSymptomTracker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Log Symptoms
                </h3>
                <button
                  onClick={() => setShowSymptomTracker(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How are you feeling today?
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {['😢', '😕', '😐', '🙂', '😊'].map((emoji, index) => (
                      <button
                        key={index}
                        className="p-3 text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                        onClick={() => toast.success(`Mood logged: ${emoji}`)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Symptoms (if any)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Describe any symptoms you're experiencing..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pain Level (0-10)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowSymptomTracker(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success('Symptoms logged successfully!');
                    setShowSymptomTracker(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        )}

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