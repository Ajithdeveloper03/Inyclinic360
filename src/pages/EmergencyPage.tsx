import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Zap, Phone, AlertTriangle, Clock, CheckCircle, User, CreditCard } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
import toast from 'react-hot-toast';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  avatar?: string;
}

interface Timeslot {
  time: string;
}

const PLATFORM_FEE = 15;

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    age: '',
    gender: '',
    mobile: '',
    otp: '',
    category: '',
    otherDetails: '',
    doctor: '',
    timeslot: '',
  });
  const [otpTimer, setOtpTimer] = useState(30);
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Cardiac', 'Trauma', 'Stroke', 'Other'];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && !isOtpVerified) {
      timer = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setOtpSent(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, isOtpVerified]);

  const sendOtp = () => {
    if (/^\d{10}$/.test(formData.mobile)) {
      setOtpSent(true);
      setOtpTimer(30);
      toast.success('OTP sent to your mobile');
    } else {
      toast.error('Please enter a valid 10-digit mobile number');
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

  const fetchDoctors = (category: string) => {
    if (!category) return;
    setLoading(true);
    const mockDoctors: Doctor[] = [
      { id: '1', name: 'Dr. Smith', specialization: category === 'Cardiac' ? 'Cardiology' : category === 'Trauma' ? 'Orthopedics' : category === 'Stroke' ? 'Neurology' : 'General', avatar: 'https://via.placeholder.com/50' },
      { id: '2', name: 'Dr. Jones', specialization: category === 'Cardiac' ? 'Cardiology' : category === 'Trauma' ? 'Trauma Surgery' : category === 'Stroke' ? 'Neurology' : 'General', avatar: 'https://via.placeholder.com/50' },
    ];
    setDoctors(mockDoctors);
    setError('');
    setLoading(false);
  };

  const fetchTimeslots = (doctorId: string) => {
    if (!doctorId) return;
    setLoading(true);
    const mockTimeslots: Timeslot[] = [
      { time: '10:00 AM' },
      { time: '11:00 AM' },
      { time: '12:00 PM' },
    ];
    setTimeslots(mockTimeslots);
    setError('');
    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'category' && value) {
      setFormData(prev => ({ ...prev, doctor: '', timeslot: '' }));
      setDoctors([]);
      setTimeslots([]);
      fetchDoctors(value);
    }
    if (field === 'doctor' && value) {
      setFormData(prev => ({ ...prev, timeslot: '' }));
      setTimeslots([]);
      fetchTimeslots(value);
    }
  };

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return formData.fname && formData.lname && formData.age && formData.gender && formData.mobile && isOtpVerified;
      case 2: return formData.category && formData.doctor && formData.timeslot;
      case 3: return true;
      default: return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      toast.error('Please fill all required fields');
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleBookEmergency = () => {
    if (validateStep(3)) {
      setShowPayment(true);
    } else {
      toast.error('Please fill all required fields');
    }
  };

  const handlePaymentSuccess = (paymentId: string) => {
    const emergencyBooking = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      doctorName: doctors.find(d => d.id === formData.doctor)?.name,
      timeslot: formData.timeslot,
      fee: PLATFORM_FEE,
      status: 'scheduled',
      paymentId,
    };
    navigate('/emergency-confirmation', { state: { emergencyBooking } });
    setShowPayment(false);
    resetForm();
    toast.success('Emergency booked and payment completed! Confirmation sent via WhatsApp.');
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      fname: '',
      lname: '',
      age: '',
      gender: '',
      mobile: '',
      otp: '',
      category: '',
      otherDetails: '',
      doctor: '',
      timeslot: '',
    });
    setOtpSent(false);
    setIsOtpVerified(false);
    setOtpTimer(30);
    setDoctors([]);
    setTimeslots([]);
    setError('');
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4 w-full">
      <div className="bg-white rounded-2xl shadow-[inset_10px_10px_20px_#e0e0e0,inset_-10px_-10px_20px_#ffffff] p-6 w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-red-900">Emergency Booking</h2>
          <button
            onClick={() => {
              resetForm();
              navigate('/patient-dashboard');
            }}
            className="text-red-400 hover:text-red-600 rounded-full w-10 h-10 flex items-center justify-center shadow-[inset_2px_2px_5px_#e0e0e0,inset_-2px_-2px_5px_#ffffff]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center mb-6">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-base font-medium ${
                  step >= stepNumber
                    ? 'bg-red-600 text-white shadow-[inset_2px_2px_5px_#8b0000,inset_-2px_-2px_5px_#ff4040]'
                    : 'bg-gray-200 text-gray-600 shadow-[inset_2px_2px_5px_#e0e0e0,inset_-2px_-2px_5px_#ffffff]'
                }`}
              >
                {step > stepNumber ? <CheckCircle className="h-6 w-6" /> : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > stepNumber ? 'bg-red-600 shadow-[inset_1px_1px_3px_#8b0000]' : 'bg-gray-200 shadow-[inset_1px_1px_3px_#e0e0e0]'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex justify-between mb-6 text-sm">
          <span className={step >= 1 ? 'text-red-600' : 'text-gray-500'}>Patient Info</span>
          <span className={step >= 2 ? 'text-orange-600' : 'text-gray-500'}>Emergency Details</span>
          <span className={step >= 3 ? 'text-red-600' : 'text-gray-500'}>Confirm</span>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-red-700 mb-2">First Name *</label>
              <input
                type="text"
                value={formData.fname}
                onChange={(e) => handleInputChange('fname', e.target.value)}
                className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-red-500 text-red-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
              />
            </div>
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-red-700 mb-2">Last Name *</label>
              <input
                type="text"
                value={formData.lname}
                onChange={(e) => handleInputChange('lname', e.target.value)}
                className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-red-500 text-red-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
              />
            </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
                <label className="block text-sm font-medium text-red-700 mb-2">Age *</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-red-500 text-red-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
                />
              </div>
              <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
                <label className="block text-sm font-medium text-red-700 mb-2">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-red-500 text-red-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-red-700 mb-2">Mobile * (with OTP)</label>
              <div className="flex space-x-2">
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  maxLength={10}
                  className="w-2/3 px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-red-500 text-red-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
                  placeholder="Enter 10-digit mobile"
                />
                <button
                  onClick={sendOtp}
                  disabled={otpSent || !formData.mobile || formData.mobile.length !== 10}
                  className="w-1/3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 shadow-[inset_4px_4px_8px_#8b0000,inset_-4px_-4px_8px_#ff4040]"
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
                    className="w-2/3 px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-red-500 text-red-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
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
              {otpSent && !isOtpVerified && (
                <p className="text-sm text-red-600 mt-2">Resend OTP in {otpTimer} seconds</p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-red-700 mb-2">Emergency Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-red-500 text-red-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {formData.category && (
              <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
                <label className="block text-sm font-medium text-red-700 mb-2">Select Doctor *</label>
                {loading && <p className="text-sm text-red-600">Loading doctors...</p>}
                {error && <p className="text-sm text-red-600">{error}</p>}
                {!loading && doctors.length === 0 && !error && <p className="text-sm text-red-600">No doctors available</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => handleInputChange('doctor', doc.id)}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 bg-white shadow-[inset_6px_6px_12px_#f0f0f0,inset_-6px_-6px_12px_#ffffff] ${formData.doctor === doc.id ? 'border-2 border-red-500' : 'hover:shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff]'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <img src={doc.avatar || 'https://via.placeholder.com/50'} alt={doc.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-red-900">{doc.name}</h4>
                          <p className="text-sm text-red-600">{doc.specialization}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <label className="block text-sm font-medium text-red-700 mb-2">Timeslot *</label>
              {loading && <p className="text-sm text-red-600">Loading timeslots...</p>}
              {error && <p className="text-sm text-red-600">{error}</p>}
              {!loading && timeslots.length === 0 && !error && <p className="text-sm text-red-600">No timeslots available</p>}
              <select
                value={formData.timeslot}
                onChange={(e) => handleInputChange('timeslot', e.target.value)}
                className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-red-500 text-red-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
              >
                <option value="">Select Timeslot</option>
                {timeslots.map((slot) => (
                  <option key={slot.time} value={slot.time}>{slot.time}</option>
                ))}
              </select>
            </div>
            {formData.category === 'Other' && (
              <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
                <label className="block text-sm font-medium text-red-700 mb-2">Additional Details</label>
                <textarea
                  value={formData.otherDetails}
                  onChange={(e) => handleInputChange('otherDetails', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-none bg-white rounded-lg focus:ring-2 focus:ring-red-500 text-red-900 shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]"
                  placeholder="Describe the emergency..."
                />
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <h4 className="text-lg font-semibold text-red-900 mb-4">Emergency Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg shadow-[inset_6px_6px_12px_#f0f0f0,inset_-6px_-6px_12px_#ffffff]">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900">{formData.fname} {formData.lname}</p>
                        <p className="text-sm text-red-600">Age: {formData.age}, {formData.gender}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-[inset_6px_6px_12px_#f0f0f0,inset_-6px_-6px_12px_#ffffff]">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900">{formData.category}</p>
                        {formData.otherDetails && <p className="text-sm text-red-600">{formData.otherDetails}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg shadow-[inset_6px_6px_12px_#f0f0f0,inset_-6px_-6px_12px_#ffffff]">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900">{doctors.find((d) => d.id === formData.doctor)?.name || 'Not selected'}</p>
                        <p className="text-sm text-red-600">{doctors.find((d) => d.id === formData.doctor)?.specialization || ''}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-[inset_6px_6px_12px_#f0f0f0,inset_-6px_-6px_12px_#ffffff]">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900">{formData.timeslot || 'Not selected'}</p>
                        <p className="text-sm text-red-600">Platform Fee: ₹{PLATFORM_FEE}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-[inset_10px_10px_20px_#f0f0f0,inset_-10px_-10px_20px_#ffffff]">
              <h5 className="font-medium text-yellow-800 mb-2">Important Notes:</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Arrive immediately</li>
                {/* <li>• Contact emergency services if critical</li> */}
                <li>• Payment of ₹{PLATFORM_FEE} required to confirm booking</li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            onClick={step === 1 ? () => navigate('/patient-dashboard') : handlePrevious}
            className="px-6 py-3 text-red-700 hover:bg-gray-100 rounded-lg shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff] transition-shadow duration-200"
          >
            {step === 1 ? 'Cancel' : 'Previous'}
          </button>
          <button
            onClick={step === 3 ? handleBookEmergency : handleNext}
            disabled={!validateStep(step)}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg shadow-[inset_4px_4px_8px_#8b0000,inset_-4px_-4px_8px_#ff4040] transition-shadow duration-200 flex items-center space-x-2"
          >
            {step === 3 ? (
              <>
                <CreditCard className="h-4 w-4" />
                <span>Book & Pay ₹{PLATFORM_FEE}</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <Clock className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {showPayment && (
          <PaymentModal
            isOpen={showPayment}
            onClose={() => setShowPayment(false)}
            amount={PLATFORM_FEE}
            description={`Emergency ${formData.category} with ${doctors.find(d => d.id === formData.doctor)?.name} (incl. ₹${PLATFORM_FEE} platform fee)`}
            appointmentData={{
              doctor: doctors.find(d => d.id === formData.doctor)?.name || '',
              date: new Date().toISOString().split('T')[0],
              time: formData.timeslot,
              type: formData.category,
            }}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default EmergencyPage;