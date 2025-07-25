import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import PaymentModal from '../components/PaymentModal';
import AppointmentProgressBar from '../components/AppointmentProgressBar';
import AppointmentBookingModal from '../components/AppointmentBookingModal';
import { Calendar, Clock, User, Plus, Phone } from 'lucide-react';
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
  paymentId?: string;
  expectedDuration: number;
  estimatedWaitTime: number;
  queuePosition: number;
  elapsedTime: number;
}

const MyAppointmentsPage = () => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([
    {
      id: 1,
      date: 'Dec 15, 2024',
      time: '10:30 AM',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      status: 'confirmed',
      type: 'Follow-up',
      fee: 150,
      paid: true,
      expectedDuration: 30,
      estimatedWaitTime: 0,
      queuePosition: 0,
      elapsedTime: 0,
    },
    {
      id: 2,
      date: 'Dec 20, 2024',
      time: '2:00 PM',
      doctor: 'Dr. Michael Brown',
      department: 'Orthopedics',
      status: 'confirmed',
      type: 'Consultation',
      fee: 200,
      paid: true,
      expectedDuration: 20,
      estimatedWaitTime: 0,
      queuePosition: 0,
      elapsedTime: 0,
    },
    {
      id: 3,
      date: 'Jan 5, 2025',
      time: '9:15 AM',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      status: 'scheduled',
      type: 'Check-up',
      fee: 150,
      paid: false,
      expectedDuration: 25,
      estimatedWaitTime: 60,
      queuePosition: 3,
      elapsedTime: 0,
    },
  ]);

  const pastAppointments: Appointment[] = [
    {
      id: 4,
      date: 'Nov 28, 2024',
      time: '10:30 AM',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      status: 'completed',
      type: 'Follow-up',
      fee: 150,
      paid: true,
      expectedDuration: 30,
      estimatedWaitTime: 0,
      queuePosition: 0,
      elapsedTime: 30,
    },
    {
      id: 5,
      date: 'Nov 15, 2024',
      time: '2:00 PM',
      doctor: 'Dr. Michael Brown',
      department: 'Orthopedics',
      status: 'completed',
      type: 'Consultation',
      fee: 200,
      paid: true,
      expectedDuration: 20,
      estimatedWaitTime: 0,
      queuePosition: 0,
      elapsedTime: 20,
    },
    {
      id: 6,
      date: 'Oct 30, 2024',
      time: '9:15 AM',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      status: 'completed',
      type: 'Check-up',
      fee: 150,
      paid: true,
      expectedDuration: 25,
      estimatedWaitTime: 0,
      queuePosition: 0,
      elapsedTime: 25,
    },
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
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'checked_in': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'in_waiting_room': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'with_doctor': return 'bg緑-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const handleReschedule = (id: number) => {
    alert(`Rescheduling appointment ${id}`);
  };

  const handleCancel = (id: number) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setUpcomingAppointments(upcomingAppointments.filter(apt => apt.id !== id));
      toast.success('Appointment cancelled.');
    }
  };

  const handleBookAgain = (appointment: Appointment) => {
    setShowBookingModal(true);
    toast.success(`Booking new appointment with ${appointment.doctor}`);
  };

  const handleEmergencyBooking = () => {
    toast.success('Emergency booking initiated. You will be contacted shortly.');
  };

  const handlePayNow = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    toast.success('Payment completed successfully!');
    setUpcomingAppointments(prev =>
      prev.map(apt =>
        apt.id === selectedAppointment?.id
          ? { ...apt, paid: true, paymentId }
          : apt
      )
    );
    setShowPaymentModal(false);
    setSelectedAppointment(null);
  };

  const appointments = selectedTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Appointments
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage your appointments
            </p>
          </div>
          <button
            onClick={() => setShowBookingModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              selectedTab === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Upcoming ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setSelectedTab('past')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              selectedTab === 'past'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Past ({pastAppointments.length})
          </button>
        </div>

        {/* Appointments List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedTab === 'upcoming' ? 'Upcoming Appointments' : 'Past Appointments'}
              </h2>
              {selectedTab === 'upcoming' && (
                <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>Live updates • Last updated {lastUpdate.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {appointment.doctor}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>
                            {appointment.department} • ₹{appointment.fee}
                            {appointment.paid && <span className="text-green-600 ml-2">• Paid</span>}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {appointment.type}
                      </p>
                      {selectedTab === 'upcoming' && (
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
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {selectedTab === 'upcoming' && (
                      <>
                        {!appointment.paid && (
                          <button
                            onClick={() => handlePayNow(appointment)}
                            className="text-green-600 hover:text-green-500 dark:text-green-400 text-sm font-medium flex items-center space-x-1"
                          >
                            <span>Pay Now</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleReschedule(appointment.id)}
                          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          className="text-red-600 hover:text-red-500 dark:text-red-400 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {selectedTab === 'past' && (
                      <>
                        <button className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium">
                          View Details
                        </button>
                        <button
                          onClick={() => handleBookAgain(appointment)}
                          className="text-green-600 hover:text-green-500 dark:text-green-400 text-sm font-medium"
                        >
                          Book Again
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Book New Appointment
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Schedule your next visit with our healthcare professionals
            </p>
            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Book Now
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Emergency Appointment
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Need urgent medical attention? Book an emergency slot
            </p>
            <button
              onClick={handleEmergencyBooking}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Emergency Booking
            </button>
          </div>
        </div>

        {/* Enhanced Booking Modal */}
        <AppointmentBookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          onSuccess={(appointment) => {
            const newAppointment: Appointment = {
              id: appointment.id,
              date: new Date(appointment.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              }),
              time: new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              }),
              doctor: appointment.doctorName,
              department: appointment.department,
              status: 'scheduled',
              type: appointment.type,
              fee: appointment.fee,
              paid: appointment.paymentStatus === 'paid',
              paymentId: appointment.paymentId,
              expectedDuration: parseInt(appointment.duration),
              estimatedWaitTime: 60,
              queuePosition: 5,
              elapsedTime: 0,
            };
            setUpcomingAppointments([...upcomingAppointments, newAppointment]);
            toast.success('Appointment booked successfully!');
          }}
        />

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={selectedAppointment?.fee || 0}
          description={`${selectedAppointment?.department} ${selectedAppointment?.type}`}
          appointmentData={selectedAppointment}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    </DashboardLayout>
  );
};

export default MyAppointmentsPage;