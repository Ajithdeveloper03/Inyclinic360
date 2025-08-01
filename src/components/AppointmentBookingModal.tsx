import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Calendar, User, Clock, FileText, CreditCard, CheckCircle, Phone } from 'lucide-react';
import TimeSlotPicker from '../components/TimeSlotPicker';
import PaymentModal from '../components/PaymentModal';
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

const PLATFORM_FEE = 10;

const AppointmentBookingModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctorName, department } = location.state || {};

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    otp: '',
    department: department || '',
    doctor: doctorName ? doctors.find(d => d.name === doctorName)?.id || '' : '',
    date: '',
    time: '',
    type: '',
    reason: '',
    urgency: 'normal',
    duration: '30',
    address: '',
    tags: [] as string[],
  });
  const [showPayment, setShowPayment] = useState(false);
  const [selectedDoctorData, setSelectedDoctorData] = useState<Doctor | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const departments = [
    'Cardiology',
    'Orthopedics',
    'Pediatrics',
    'General Medicine',
    'Dermatology',
    'Neurology',
    'Emergency',
    'Psychiatry',
  ];

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Ashok Rajgopal',
      department: 'Cardiology',
      specialization: 'Interventional Cardiology',
      experience: '15 years',
      rating: 4.9,
      fee: 200,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '2',
      name: 'Dr. Ashok Kumar',
      department: 'Orthopedics',
      specialization: 'Sports Medicine',
      experience: '12 years',
      rating: 4.8,
      fee: 180,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '3',
      name: 'Dr. Rahul',
      department: 'Pediatrics',
      specialization: 'Child Development',
      experience: '10 years',
      rating: 4.9,
      fee: 150,
      avatar: 'https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg',
    },
    {
      id: '4',
      name: 'Dr. V. P. Singh',
      department: 'General Medicine',
      specialization: 'Family Medicine',
      experience: '8 years',
      rating: 4.7,
      fee: 120,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    },
  ];

  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation', duration: 30 },
    { value: 'follow-up', label: 'Follow-up', duration: 20 },
    { value: 'treatment', label: 'Treatment', duration: 45 },
    { value: 'check-up', label: 'Check-up', duration: 25 },
    { value: 'emergency', label: 'Emergency', duration: 60 },
  ];

  const smartTags = ['Diabetes', 'BP', 'Asthma'];

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
    if (field === 'department') {
      setFormData(prev => ({ ...prev, doctor: '', time: '' }));
      setSelectedDoctorData(null);
    }
    if (field === 'doctor' || field === 'date') {
      setFormData(prev => ({ ...prev, time: '' }));
    }
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const sendOtp = () => {
    if (formData.phone && formData.phone.length === 10) {
      setOtpSent(true);
      toast.success('OTP sent to your phone');
    } else {
      toast.error('Please enter a valid 10-digit phone number');
    }
  };

  const verifyOtp = () => {
    if (formData.otp === '1234') {
      setIsOtpVerified(true);
      toast.success('OTP verified successfully');
    } else {
      toast.error('Invalid OTP');
    }
  };

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.name && formData.age && formData.gender && formData.phone && formData.email && isOtpVerified;
      case 2:
        return formData.department && formData.doctor && formData.date && formData.time;
      case 3:
        return formData.type && formData.address && formData.reason.trim();
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

    if ((selectedDoctorData?.fee || 0) + PLATFORM_FEE > 0) {
      setShowPayment(true);
    } else {
      const appointment = {
        id: Date.now(),
        doctorName: selectedDoctorData?.name,
        department: selectedDoctorData?.department,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        fee: (selectedDoctorData?.fee || 0) + PLATFORM_FEE,
        status: 'scheduled',
        paymentStatus: 'paid',
        tags: formData.tags,
      };
      navigate('/my-appointments', { state: { newAppointment: appointment } });
    }
  };

  const handlePaymentSuccess = (paymentId: string) => {
    const appointment = {
      id: Date.now(),
      doctorName: selectedDoctorData?.name,
      department: selectedDoctorData?.department,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      fee: (selectedDoctorData?.fee || 0) + PLATFORM_FEE,
      status: 'scheduled',
      paymentStatus: 'paid',
      paymentId,
      tags: formData.tags,
    };
    navigate('/my-appointments', { state: { newAppointment: appointment } });
    setShowPayment(false);
    toast.success('Appointment booked and payment completed! Confirmation sent via WhatsApp.');
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      otp: '',
      department: '',
      doctor: '',
      date: '',
      time: '',
      type: '',
      reason: '',
      urgency: 'normal',
      duration: '30',
      address: '',
      tags: [],
    });
    setSelectedDoctorData(null);
    setOtpSent(false);
    setIsOtpVerified(false);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4 w-full">
      <div className="bg-white rounded-2xl shadow-[inset_10px_10px_20px_#e0e0e0,inset_-10px_-10px_20px_#ffffff] p-6 w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-900">
            Book Appointment
          </h2>
          <button
            onClick={() => {
              resetForm();
              navigate('/my-appointments');
            }}
            className="text-indigo-400 hover:text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center shadow-[inset_2px_2px_5px_#e0e0e0,inset_-2px_-2px_5px_#ffffff]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center mb-6">
          {[1, 2, 3, 4].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-base font-medium ${
                  step >= stepNumber
                    ? 'bg-indigo-600 text-white shadow-[inset_2px_2px_5px_#4b5e8c,inset_-2px_-2px_5px_#6b82b4]'
                    : 'bg-gray-200 text-gray-600 shadow-[inset_2px_2px_5px_#e0e0e0,inset_-2px_-2px_5px_#ffffff]'
                }`}
              >
                {step > stepNumber ? <CheckCircle className="h-6 w-6" /> : stepNumber}
              </div>
              {stepNumber < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > stepNumber ? 'bg-indigo-600 shadow-[inset_1px_1px_3px_#4b5e8c]' : 'bg-gray-200 shadow-[inset_1px_1px_3px_#e0e0e0]'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex justify-between mb-6 text-sm">
          <span className={step >= 1 ? 'text-indigo-600' : 'text-gray-500'}>Patient Info</span>
          <span className={step >= 2 ? 'text-blue-600' : 'text-gray-500'}>Select Appt</span>
          <span className={step >= 3 ? 'text-purple-600' : 'text-gray-500'}>Add Info</span>
          <span className={step >= 4 ? 'text-teal-600' : 'text-gray-500'}>Confirm</span>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-indigo-700 mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-indigo-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
                <label className="block text-sm font-medium text-indigo-700 mb-2">Age *</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-indigo-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
                />
              </div>
              <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
                <label className="block text-sm font-medium text-indigo-700 mb-2">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-indigo-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-indigo-700 mb-2">Phone * (with OTP)</label>
              <div className="flex space-x-2">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  maxLength={10}
                  className="w-2/3 px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-indigo-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
                  placeholder="Enter 10-digit phone"
                />
                <button
                  onClick={sendOtp}
                  disabled={otpSent || !formData.phone || formData.phone.length !== 10}
                  className="w-1/3 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 shadow-[inset_4px_4px_8px_#4b5e8c,inset_-4px_-4px_8px_#6b82b4]"
                >
                  {otpSent ? 'Resend OTP' : 'Send OTP'}
                </button>
              </div>
              {otpSent && !isOtpVerified && (
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    value={formData.otp}
                    onChange={(e) => handleInputChange('otp', e.target.value)}
                    className="w-2/3 px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-indigo-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
                    placeholder="Enter OTP"
                  />
                  <button
                    onClick={verifyOtp}
                    disabled={!formData.otp}
                    className="w-1/3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 shadow-[inset_4px_4px_8px_#4b8c4b,inset_-4px_-4px_8px_#6bb46b]"
                  >
                    Verify OTP
                  </button>
                </div>
              )}
            </div>
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-indigo-700 mb-2">Email (optional)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-indigo-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-indigo-700 mb-2">Department *</label>
              <select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-indigo-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            {formData.department && (
              <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
                <label className="block text-sm font-medium text-indigo-700 mb-2">Select Doctor *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredDoctors.map(doctor => (
                    <div
                      key={doctor.id}
                      onClick={() => handleInputChange('doctor', doctor.id)}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 bg-white shadow-[inset_6px_6px_12px_#f0f0f0,inset_-6px_-6px_12px_#ffffff] ${
                        formData.doctor === doctor.id
                          ? 'border-2 border-indigo-500'
                          : 'hover:shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={doctor.avatar}
                          alt={doctor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-indigo-900">{doctor.name}</h4>
                          <p className="text-sm text-indigo-600">{doctor.specialization}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-yellow-600">★ {doctor.rating}</span>
                            <span className="text-xs text-indigo-500">{doctor.experience}</span>
                            <span className="text-xs font-medium text-green-600">₹{doctor.fee}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-indigo-700 mb-2">Appointment Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={getMinDate()}
                max={getMaxDate()}
                className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-indigo-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
              />
            </div>
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <TimeSlotPicker
                selectedDate={formData.date}
                selectedDoctor={formData.doctor}
                onTimeSelect={(time) => handleInputChange('time', time)}
                selectedTime={formData.time}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-indigo-700 mb-2">Appointment Type *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {appointmentTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => handleInputChange('type', type.value)}
                    className={`p-4 rounded-lg text-center transition-all duration-200 bg-white shadow-[inset_6px_6px_12px_#f0f0f0,inset_-6px_-6px_12px_#ffffff] ${
                      formData.type === type.value
                        ? 'border-2 border-indigo-500'
                        : 'hover:shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff]'
                    }`}
                  >
                    <div className="font-medium text-indigo-900">{type.label}</div>
                    <div className="text-sm opacity-75 text-indigo-600">{type.duration} min</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-indigo-700 mb-2">Full Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-indigo-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
                placeholder="Enter your full address..."
              />
            </div>
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-indigo-700 mb-2">Reason for Visit *</label>
              <textarea
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-indigo-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
                placeholder="Please describe your symptoms or reason for the visit..."
              />
            </div>
          </div>
        )}

        {step === 4 && selectedDoctorData && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <h4 className="text-lg font-semibold text-indigo-900 mb-4">Appointment Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg shadow-[inset_6px_6px_12px_#f0f0f0,inset_-6px_-6px_12px_#ffffff]">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="font-medium text-indigo-900">{selectedDoctorData.name}</p>
                        <p className="text-sm text-indigo-600">{selectedDoctorData.specialization}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-[inset_6px_6px_12px_#f0f0f0,inset_-6px_-6px_12px_#ffffff]">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="font-medium text-indigo-900">{new Date(formData.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}</p>
                        <p className="text-sm text-indigo-600">{new Date(`2000-01-01T${formData.time}`).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg shadow-[inset_6px_6px_12px_#f0f0f0,inset_-6px_-6px_12px_#ffffff]">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="font-medium text-indigo-900">{appointmentTypes.find(t => t.value === formData.type)?.label}</p>
                        <p className="text-sm text-indigo-600">Duration: {formData.duration} minutes</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-[inset_6px_6px_12px_#f0f0f0,inset_-6px_-6px_12px_#ffffff]">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="font-medium text-indigo-900">₹{(selectedDoctorData.fee + PLATFORM_FEE)}</p>
                        <p className="text-sm text-indigo-600">Consultation Fee: ₹{selectedDoctorData.fee}</p>
                        <p className="text-sm text-indigo-600">Platform Fee: ₹{PLATFORM_FEE}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg shadow-[inset_6px_6px_12px_#f0f0f0,inset_-6px_-6px_12px_#ffffff]">
                <p className="text-sm font-medium text-indigo-900 mb-1">Reason for Visit:</p>
                <p className="text-sm text-indigo-600">{formData.reason}</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <h5 className="font-medium text-yellow-800 mb-2">Important Notes:</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Please arrive 15 minutes before your appointment time</li>
                <li>• You can reschedule up to 24 hours before the appointment</li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            onClick={step === 1 ? () => navigate('/my-appointments') : handlePrevious}
            className="px-6 py-3 text-indigo-700 hover:bg-gray-100 rounded-lg shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff] transition-shadow duration-200"
          >
            {step === 1 ? 'Cancel' : 'Previous'}
          </button>
          <button
            onClick={step === 4 ? handleBookAppointment : handleNext}
            disabled={!validateStep(step)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg shadow-[inset_4px_4px_8px_#4b5e8c,inset_-4px_-4px_8px_#6b82b4] transition-shadow duration-200 flex items-center space-x-2"
          >
            {step === 4 ? (
              <>
                <CreditCard className="h-4 w-4" />
                <span>Book & Pay ₹{(selectedDoctorData?.fee || 0) + PLATFORM_FEE}</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <Clock className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {showPayment && selectedDoctorData && (
          <PaymentModal
            isOpen={showPayment}
            onClose={() => setShowPayment(false)}
            amount={(selectedDoctorData.fee + PLATFORM_FEE)}
            description={`${formData.type} with ${selectedDoctorData.name} (incl. ₹${PLATFORM_FEE} platform fee)`}
            appointmentData={{
              doctor: selectedDoctorData.name,
              date: formData.date,
              time: formData.time,
              type: formData.type,
            }}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentBookingModal;