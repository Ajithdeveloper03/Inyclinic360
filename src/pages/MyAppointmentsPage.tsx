import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Plus, Phone, Home, Activity } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
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
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past' | 'live'>('upcoming');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([
    { id: 1, date: 'Aug 02, 2025', time: '10:30 AM', doctor: 'Dr. Naresh', department: 'Cardiology', status: 'in_waiting_room', type: 'Follow-up', fee: 150, paid: true, expectedDuration: 30, estimatedWaitTime: 5, queuePosition: 1, elapsedTime: 0 },
    { id: 2, date: 'Aug 02, 2025', time: '11:00 AM', doctor: 'Dr. Ashok Seth', department: 'Orthopedics', status: 'with_doctor', type: 'Consultation', fee: 200, paid: true, expectedDuration: 20, estimatedWaitTime: 0, queuePosition: 0, elapsedTime: 10 },
    { id: 3, date: 'Aug 02, 2025', time: '12:00 PM', doctor: 'Dr. Sandeep Vaishya', department: 'Cardiology', status: 'confirmed', type: 'Check-up', fee: 150, paid: false, expectedDuration: 25, estimatedWaitTime: 60, queuePosition: 3, elapsedTime: 0 },
    { id: 4, date: 'Aug 03, 2025', time: '9:15 AM', doctor: 'Dr. Priya Sharma', department: 'Neurology', status: 'scheduled', type: 'Consultation', fee: 180, paid: false, expectedDuration: 30, estimatedWaitTime: 45, queuePosition: 2, elapsedTime: 0 },
  ]);

  const pastAppointments: Appointment[] = [
    { id: 5, date: 'Jul 28, 2025', time: '10:30 AM', doctor: 'Dr. V. P. Singh', department: 'Cardiology', status: 'completed', type: 'Follow-up', fee: 150, paid: true, expectedDuration: 30, estimatedWaitTime: 0, queuePosition: 0, elapsedTime: 30 },
    { id: 6, date: 'Jul 15, 2025', time: '2:00 PM', doctor: 'Dr. Rana Patir', department: 'Orthopedics', status: 'completed', type: 'Consultation', fee: 200, paid: true, expectedDuration: 20, estimatedWaitTime: 0, queuePosition: 0, elapsedTime: 20 },
    { id: 7, date: 'Jun 30, 2025', time: '9:15 AM', doctor: 'Dr. Sarah Johnson', department: 'Cardiology', status: 'completed', type: 'Check-up', fee: 150, paid: true, expectedDuration: 25, estimatedWaitTime: 0, queuePosition: 0, elapsedTime: 25 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setUpcomingAppointments(prev =>
        prev.map(apt => {
          let newApt = { ...apt };
          const isToday = apt.date === 'Aug 02, 2025';
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

  const appointments = selectedTab === 'upcoming' ? upcomingAppointments : selectedTab === 'past' ? pastAppointments : upcomingAppointments.filter(apt => apt.date === 'Aug 02, 2025');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <button
          onClick={() => navigate('/patient-dashboard')}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center space-x-1 mb-2 md:mb-0"
        >
          <Home className="h-4 w-4" />
          <span className="text-sm">Back to Home</span>
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 text-sm">View and manage your appointments</p>
        </div>
        <button
          onClick={() => navigate('/book-appointment')}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center space-x-1 mt-2 md:mt-0"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm">Book Appointment</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <button
          onClick={() => setSelectedTab('upcoming')}
          className={`px-3[], py-2 rounded-lg font-medium ${selectedTab === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Upcoming ({upcomingAppointments.length})
        </button>
        <button
          onClick={() => setSelectedTab('past')}
          className={`px-3 py-2 rounded-lg font-medium ${selectedTab === 'past' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Past ({pastAppointments.length})
        </button>
        <button
          onClick={() => setSelectedTab('live')}
          className={`px-3 py-2 rounded-lg font-medium ${selectedTab === 'live' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Live Tracking
        </button>
      </div>

      <div className="bg-white rounded-2xl">
        <div className="p-4 border-b```typescriptreact
        border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedTab === 'upcoming' ? 'Upcoming Appointments' : selectedTab === 'past' ? 'Past Appointments' : 'Live Appointment Tracking'}
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {appointments.length === 0 && selectedTab === 'live' && (
            <div className="p-4 text-center text-gray-500">
              No live appointments today.
            </div>
          )}
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`p-4 ${selectedTab === 'live' && appointment.status !== 'completed' && appointment.status !== 'cancelled' ? 'bg-blue-50' : ''}`}
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor}</h3>
                  <p className="text-gray-600">{appointment.date} at {appointment.time}</p>
                  <span className={`mt-1 px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status === 'in_waiting_room' ? 'Waiting' : appointment.status === 'with_doctor' ? 'With Doctor' : appointment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
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