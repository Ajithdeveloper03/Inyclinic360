import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import PaymentModal from '../components/PaymentModal';
import { Calendar, Clock, User, Plus, Filter, Search, Phone, Video, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const MyAppointmentsPage = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { id: 1, date: 'Dec 15, 2024', time: '10:30 AM', doctor: 'Dr. Sarah Johnson', department: 'Cardiology', status: 'confirmed', type: 'Follow-up', fee: 150, paid: true },
    { id: 2, date: 'Dec 20, 2024', time: '2:00 PM', doctor: 'Dr. Michael Brown', department: 'Orthopedics', status: 'confirmed', type: 'Consultation', fee: 200, paid: true },
    { id: 3, date: 'Jan 5, 2025', time: '9:15 AM', doctor: 'Dr. Sarah Johnson', department: 'Cardiology', status: 'scheduled', type: 'Check-up', fee: 150, paid: false }
  ]);

  const pastAppointments = [
    { id: 4, date: 'Nov 28, 2024', time: '10:30 AM', doctor: 'Dr. Sarah Johnson', department: 'Cardiology', status: 'completed', type: 'Follow-up' },
    { id: 5, date: 'Nov 15, 2024', time: '2:00 PM', doctor: 'Dr. Michael Brown', department: 'Orthopedics', status: 'completed', type: 'Consultation' },
    { id: 6, date: 'Oct 30, 2024', time: '9:15 AM', doctor: 'Dr. Sarah Johnson', department: 'Cardiology', status: 'completed', type: 'Check-up' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
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
    }
  };

  const handleBookAgain = (appointment: any) => {
    setShowBookingModal(true);
    toast.success(`Booking new appointment with ${appointment.doctor}`);
  };

  const handleEmergencyBooking = () => {
    toast.success('Emergency booking initiated. You will be contacted shortly.');
  };

  const handleVideoCall = (appointment: any) => {
    toast.success(`Starting video call with ${appointment.doctor}`);
  };

  const handlePayNow = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    toast.success('Payment completed successfully!');
    // Update appointment as paid
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
              {/* <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div> */}
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
                          {appointment.status}
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
                          <span>{appointment.department} • ₹{appointment.fee}</span>
                          {appointment.paid && <span className="text-green-600 ml-2">• Paid</span>}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {appointment.type}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {selectedTab === 'upcoming' && (
                      <>
                        {!appointment.paid && (
                          <button 
                            // onClick={() => handlePayNow(appointment)}
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

          {/* <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Video className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Telemedicine
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Consult with doctors remotely via video call
            </p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors duration-200">
              Start Video Call
            </button>
          </div> */}
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Book New Appointment
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select Department</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="general">General Medicine</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Doctor
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select Doctor</option>
                    <option value="dr-johnson">Dr. Sarah Johnson</option>
                    <option value="dr-brown">Dr. Michael Brown</option>
                    <option value="dr-smith">Dr. Emily Smith</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Preferred Time
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select Time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reason for Visit
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Describe your symptoms or reason for visit"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const newAppointment = {
                      id: Date.now(),
                      date: '2024-12-25',
                      time: '10:00 AM',
                      doctor: 'Dr. Sarah Johnson',
                      department: 'Cardiology',
                      status: 'scheduled',
                      type: 'Consultation',
                      fee: 150,
                      paid: false
                    };
                    
                    // Show payment modal for new appointment
                    setSelectedAppointment(newAppointment);
                    setShowBookingModal(false);
                    setShowPaymentModal(false);
                    toast.success('Appointment scheduled! Please complete payment.');
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        )}

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