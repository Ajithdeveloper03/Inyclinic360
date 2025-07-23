import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Clock, FileText, CreditCard, CheckCircle } from 'lucide-react';
import TimeSlotPicker from './TimeSlotPicker.tsx';
import PaymentModal from './PaymentModal.tsx';
import toast from 'react-hot-toast';

interface Doctor {
  id: string;
  name: string;
  department: string;
  specialization: string;
  experience: string;
  rating: number;
  fee: number;
  avatar: string;
}

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (appointment: any) => void;
  preSelectedDoctor?: string;
  preSelectedDate?: string;
}

const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  preSelectedDoctor,
  preSelectedDate
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    department: '',
    doctor: preSelectedDoctor || '',
    date: preSelectedDate || '',
    time: '',
    type: '',
    reason: '',
    urgency: 'normal',
    duration: '30'
  });
  const [showPayment, setShowPayment] = useState(false);
  const [selectedDoctorData, setSelectedDoctorData] = useState<Doctor | null>(null);

  const departments = [
    'Cardiology',
    'Orthopedics', 
    'Pediatrics',
    'General Medicine',
    'Dermatology',
    'Neurology',
    'Emergency',
    'Psychiatry'
  ];

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      specialization: 'Interventional Cardiology',
      experience: '15 years',
      rating: 4.9,
      fee: 200,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Dr. Michael Brown',
      department: 'Orthopedics',
      specialization: 'Sports Medicine',
      experience: '12 years',
      rating: 4.8,
      fee: 180,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Dr. Emily Smith',
      department: 'Pediatrics',
      specialization: 'Child Development',
      experience: '10 years',
      rating: 4.9,
      fee: 150,
      avatar: 'https://images.unsplash.com/photo-1594824475317-d8b5b0b0b8b0?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Dr. David Wilson',
      department: 'General Medicine',
      specialization: 'Family Medicine',
      experience: '8 years',
      rating: 4.7,
      fee: 120,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation', duration: 30 },
    { value: 'follow-up', label: 'Follow-up', duration: 20 },
    { value: 'treatment', label: 'Treatment', duration: 45 },
    { value: 'check-up', label: 'Check-up', duration: 25 },
    { value: 'emergency', label: 'Emergency', duration: 60 }
  ];

  const filteredDoctors = formData.department 
    ? doctors.filter(doc => doc.department === formData.department)
    : doctors;

  useEffect(() => {
    if (formData.doctor) {
      const doctor = doctors.find(d => d.id === formData.doctor);
      setSelectedDoctorData(doctor || null);
    }
  }, [formData.doctor]);

  useEffect(() => {
    if (formData.type) {
      const appointmentType = appointmentTypes.find(t => t.value === formData.type);
      if (appointmentType) {
        setFormData(prev => ({ ...prev, duration: appointmentType.duration.toString() }));
      }
    }
  }, [formData.type]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset dependent fields
    if (field === 'department') {
      setFormData(prev => ({ ...prev, doctor: '', time: '' }));
      setSelectedDoctorData(null);
    }
    if (field === 'doctor' || field === 'date') {
      setFormData(prev => ({ ...prev, time: '' }));
    }
  };

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.department && formData.doctor;
      case 2:
        return formData.date && formData.time;
      case 3:
        return formData.type && formData.reason.trim();
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleBookAppointment = () => {
    if (!validateStep(3)) {
      toast.error('Please fill in all required fields');
      return;
    }

    const appointment = {
      id: Date.now(),
      ...formData,
      doctorName: selectedDoctorData?.name,
      department: selectedDoctorData?.department,
      fee: selectedDoctorData?.fee || 0,
      status: 'scheduled',
      paymentStatus: 'pending'
    };

    if (selectedDoctorData?.fee && selectedDoctorData.fee > 0) {
      setShowPayment(true);
    } else {
      // Free consultation
      onSuccess(appointment);
      onClose();
      resetForm();
      toast.success('Appointment booked successfully!');
    }
  };

  const handlePaymentSuccess = (paymentId: string) => {
    const appointment = {
      id: Date.now(),
      ...formData,
      doctorName: selectedDoctorData?.name,
      department: selectedDoctorData?.department,
      fee: selectedDoctorData?.fee || 0,
      status: 'scheduled',
      paymentStatus: 'paid',
      paymentId
    };

    onSuccess(appointment);
    onClose();
    resetForm();
    setShowPayment(false);
    toast.success('Appointment booked and payment completed!');
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      department: '',
      doctor: '',
      date: '',
      time: '',
      type: '',
      reason: '',
      urgency: 'normal',
      duration: '30'
    });
    setSelectedDoctorData(null);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90); // 3 months ahead
    return maxDate.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Book Appointment
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Schedule your visit with our healthcare professionals
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center mt-6">
              {[1, 2, 3, 4].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex justify-between mt-2 text-sm">
              <span className={step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}>
                Select Doctor
              </span>
              <span className={step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}>
                Choose Time
              </span>
              <span className={step >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}>
                Details
              </span>
              <span className={step >= 4 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}>
                Confirm
              </span>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            {/* Step 1: Select Doctor */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {formData.department && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Doctor *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredDoctors.map(doctor => (
                        <div
                          key={doctor.id}
                          onClick={() => handleInputChange('doctor', doctor.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.doctor === doctor.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={doctor.avatar}
                              alt={doctor.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {doctor.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {doctor.specialization}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-yellow-600">
                                  ★ {doctor.rating}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {doctor.experience}
                                </span>
                                <span className="text-xs font-medium text-green-600">
                                  ₹{doctor.fee}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Choose Date & Time */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <TimeSlotPicker
                  selectedDate={formData.date}
                  selectedDoctor={formData.doctor}
                  onTimeSelect={(time) => handleInputChange('time', time)}
                  selectedTime={formData.time}
                />
              </div>
            )}

            {/* Step 3: Appointment Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Appointment Type *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {appointmentTypes.map(type => (
                      <button
                        key={type.value}
                        onClick={() => handleInputChange('type', type.value)}
                        className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                          formData.type === type.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm opacity-75">{type.duration} min</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reason for Visit *
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Please describe your symptoms or reason for the visit..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Urgency Level
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="low">Low - Routine checkup</option>
                    <option value="normal">Normal - Standard consultation</option>
                    <option value="high">High - Urgent but not emergency</option>
                    <option value="emergency">Emergency - Immediate attention needed</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && selectedDoctorData && (
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Appointment Summary
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {selectedDoctorData.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedDoctorData.specialization}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(formData.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(`2000-01-01T${formData.time}`).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {appointmentTypes.find(t => t.value === formData.type)?.label}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Duration: {formData.duration} minutes
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            ₹{selectedDoctorData.fee}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Consultation Fee
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Reason for Visit:
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formData.reason}
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                    Important Notes:
                  </h5>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• Please arrive 15 minutes before your appointment time</li>
                    {/* <li>• Bring a valid ID and insurance card if applicable</li> */}
                    <li>• You can reschedule up to 24 hours before the appointment</li>
                    {/* <li>• Cancellation fees may apply for last-minute changes</li> */}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              <button
                onClick={step === 1 ? () => { onClose(); resetForm(); } : handlePrevious}
                className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                {step === 1 ? 'Cancel' : 'Previous'}
              </button>
              
              <button
                onClick={step === 4 ? handleBookAppointment : handleNext}
                disabled={!validateStep(step)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                {step === 4 ? (
                  <>
                    <CreditCard className="h-4 w-4" />
                    <span>Book & Pay ₹{selectedDoctorData?.fee || 0}</span>
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <Clock className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {/* {showPayment && selectedDoctorData && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          amount={selectedDoctorData.fee}
          description={`${formData.type} with ${selectedDoctorData.name}`}
          appointmentData={{
            doctor: selectedDoctorData.name,
            date: formData.date,
            time: formData.time,
            type: formData.type
          }}
          onSuccess={handlePaymentSuccess}
        />
      )} */}
    </>
  );
};

export default AppointmentBookingModal;