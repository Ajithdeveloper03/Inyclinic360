import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import PaymentModal from '../components/PaymentModal';
import AppointmentProgressBar from '../components/AppointmentProgressBar';
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
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([
    { id: 1, date: 'Dec 15, 2024', time: '10:30 AM', doctor: 'Dr. Naresh', department: 'Cardiology', status: 'confirmed', type: 'Follow-up', fee: 150, paid: true, expectedDuration: 30, estimatedWaitTime: 0, queuePosition: 0, elapsedTime: 0 },
    { id: 2, date: 'Dec 20, 2024', time: '2:00 PM', doctor: 'Dr. Ashok Seth', department: 'Orthopedics', status: 'confirmed', type: 'Consultation', fee: 200, paid: true, expectedDuration: 20, estimatedWaitTime: 0, queuePosition: 0, elapsedTime: 0 },
    { id: 3, date: 'Jan 5, 2025', time: '9:15 AM', doctor: 'Dr. Sandeep Vaishya', department: 'Cardiology', status: 'scheduled', type: 'Check-up', fee: 150, paid: false, expectedDuration: 25, estimatedWaitTime: 60, queuePosition: 3, elapsedTime: 0 },
  ]);

  const pastAppointments: Appointment[] = [
    { id: 4, date: 'Nov 28, 2024', time: '10:30 AM', doctor: 'Dr. V. P. Singh', department: 'Cardiology', status: 'completed', type: 'Follow-up', fee: 150, paid: true, expectedDuration: 30, estimatedWaitTime: 0, queuePosition: 0, elapsedTime: 30 },
    { id: 5, date: 'Nov 15, 2024', time: '2:00 PM', doctor: 'Dr. Rana Patir', department: 'Orthopedics', status: 'completed', type: 'Consultation', fee: 200, paid: true, expectedDuration: 20, estimatedWaitTime: 0, queuePosition: 0, elapsedTime: 20 },
    { id: 6, date: 'Oct 30, 2024', time: '9:15 AM', doctor: 'Dr. Sarah Johnson', department: 'Cardiology', status: 'completed', type: 'Check-up', fee: 150, paid: true, expectedDuration: 25, estimatedWaitTime: 0, queuePosition: 0, elapsedTime: 25 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setUpcomingAppointments(prev =>
        prev.map(apt => {
          let newApt = { ...apt };
          const isToday = apt.date === 'July 28, 2025';
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

  useEffect(() => {
    if (location.state?.newAppointment) {
      const { newAppointment } = location.state;
      setUpcomingAppointments(prev => [
        ...prev,
        {
          id: newAppointment.id,
          date: new Date(newAppointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: new Date(`2000-01-01T${newAppointment.time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
          doctor: newAppointment.doctorName,
          department: newAppointment.department,
          status: newAppointment.status,
          type: newAppointment.type,
          fee: newAppointment.fee,
          paid: newAppointment.paymentStatus === 'paid',
          paymentId: newAppointment.paymentId,
          expectedDuration: parseInt(newAppointment.duration),
          estimatedWaitTime: 60,
          queuePosition: 5,
          elapsedTime: 0,
        },
      ]);
      toast.success('Appointment booked successfully!');
      navigate('/my-appointments', { state: {}, replace: true });
    }
  }, [location.state, navigate]);

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
    navigate('/book-appointment', { state: { doctorName: appointment.doctor, department: appointment.department } });
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 text-sm md:text-base">View and manage your appointments</p>
        </div>
        <button
          onClick={() => navigate('/book-appointment')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium mt-2 md:mt-0 flex items-center space-x-1 md:space-x-2 w-full md:w-auto"
        >
          <Plus className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-sm md:text-base">Book Appointment</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <button
          onClick={() => setSelectedTab('upcoming')}
          className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${selectedTab === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Upcoming ({upcomingAppointments.length})
        </button>
        <button
          onClick={() => setSelectedTab('past')}
          className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${selectedTab === 'past' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Past ({pastAppointments.length})
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">{selectedTab === 'upcoming' ? 'Upcoming Appointments' : 'Past Appointments'}</h2>
            {selectedTab === 'upcoming' && (
              <div className="flex items-center space-x-1 text-xs md:text-sm text-gray-500 mt-2 md:mt-0">
                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                <span>Live updates • Last updated {lastUpdate.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor}</h3>
                      <span className={`px-2 py-1 text-xs md:text-sm font-medium rounded-full ${getStatusColor(appointment.status)}`}>{appointment.status.replace('_', ' ')}</span>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-1 md:space-y-0 md:space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1"><Calendar className="h-4 w-4" /><span>{appointment.date}</span></div>
                      <div className="flex items-center space-x-1"><Clock className="h-4 w-4" /><span>{appointment.time}</span></div>
                      <div className="flex items-center space-x-1"><User className="h-4 w-4" /><span>{appointment.department} • ₹{appointment.fee}{appointment.paid && <span className="text-green-600 ml-1">• Paid</span>}</span></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{appointment.type}</p>
                    {selectedTab === 'upcoming' && (
                      <div className="mt-2 w-full md:w-48">
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

                <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 mt-2 md:mt-0">
                  {selectedTab === 'upcoming' && (
                    <>
                      {!appointment.paid && (
                        <button onClick={() => handlePayNow(appointment)} className="text-green-600 hover:text-green-500 text-sm font-medium flex items-center space-x-1">Pay Now</button>
                      )}
                      <button onClick={() => handleReschedule(appointment.id)} className="text-blue-600 hover:text-blue-500 text-sm font-medium">Reschedule</button>
                      <button onClick={() => handleCancel(appointment.id)} className="text-red-600 hover:text-red-500 text-sm font-medium">Cancel</button>
                    </>
                  )}
                  {selectedTab === 'past' && (
                    <>
                      <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">View Details</button>
                      <button onClick={() => handleBookAgain(appointment)} className="text-green-600 hover:text-green-500 text-sm font-medium">Book Again</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><Calendar className="h-4 w-4 text-blue-600" /></div>
            <h3 className="text-lg font-semibold text-gray-900">Book New Appointment</h3>
          </div>
          <p className="text-gray-600 mb-2">Schedule your next visit with our healthcare professionals</p>
          <button onClick={() => navigate('/book-appointment')} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">Book Now</button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center"><Phone className="h-4 w-4 text-red-600" /></div>
            <h3 className="text-lg font-semibold text-gray-900">Emergency Appointment</h3>
          </div>
          <p className="text-gray-600 mb-2">Need urgent medical attention? Book an emergency slot</p>
          <button onClick={handleEmergencyBooking} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium">Emergency Booking</button>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={selectedAppointment?.fee || 0}
        description={`${selectedAppointment?.department} ${selectedAppointment?.type}`}
        appointmentData={selectedAppointment}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default MyAppointmentsPage;