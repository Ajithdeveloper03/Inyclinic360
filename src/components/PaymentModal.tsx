import React, { useState, useEffect } from 'react';
import { X, CreditCard, Shield, Check, AlertCircle, Lock } from 'lucide-react';
import { paymentService, PaymentMethod } from '../services/paymentService';
import { formatCurrency } from '../utils/helpers';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  appointmentData?: any;
  onSuccess: (paymentId: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  description,
  appointmentData,
  onSuccess
}) => {
  const [step, setStep] = useState<'method' | 'processing' | 'success' | 'error'>('method');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    zipCode: ''
  });
  const [useNewCard, setUseNewCard] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadPaymentMethods();
    }
  }, [isOpen]);

  const loadPaymentMethods = async () => {
    try {
      const methods = await paymentService.getPaymentMethods();
      setPaymentMethods(methods);
      if (methods.length > 0) {
        setSelectedMethod(methods[0].id);
      } else {
        setUseNewCard(true);
      }
    } catch (error) {
      console.error('Failed to load payment methods:', error);
      setUseNewCard(true);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setNewCard({ ...newCard, number: formatted });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.length <= 5) {
      setNewCard({ ...newCard, expiry: formatted });
    }
  };

  const validateCard = () => {
    if (useNewCard) {
      if (!newCard.number || newCard.number.replace(/\s/g, '').length < 13) {
        return 'Please enter a valid card number';
      }
      if (!newCard.expiry || newCard.expiry.length < 5) {
        return 'Please enter a valid expiry date';
      }
      if (!newCard.cvc || newCard.cvc.length < 3) {
        return 'Please enter a valid CVC';
      }
      if (!newCard.name.trim()) {
        return 'Please enter the cardholder name';
      }
      if (!newCard.zipCode || newCard.zipCode.length < 5) {
        return 'Please enter a valid ZIP code';
      }
    } else if (!selectedMethod) {
      return 'Please select a payment method';
    }
    return null;
  };

  const handlePayment = async () => {
    const validationError = validateCard();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setStep('processing');
    setError('');

    try {
      // Create payment intent
      const paymentIntent = await paymentService.createPaymentIntent(amount, description);
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Confirm payment
      const result = await paymentService.confirmPayment(
        paymentIntent.id,
        useNewCard ? 'new_card' : selectedMethod
      );

      if (result.success) {
        setStep('success');
        toast.success('Payment successful!');
        
        // Save appointment with payment info
        if (appointmentData) {
          const appointmentWithPayment = {
            ...appointmentData,
            paymentId: paymentIntent.id,
            paymentStatus: 'paid',
            amount: amount
          };
          // Here you would save to your backend
          console.log('Saving appointment:', appointmentWithPayment);
        }

        setTimeout(() => {
          onSuccess(paymentIntent.id);
          onClose();
          resetModal();
        }, 2000);
      } else {
        setStep('error');
        setError(result.error || 'Payment failed');
        toast.error(result.error || 'Payment failed');
      }
    } catch (error) {
      setStep('error');
      setError('An unexpected error occurred');
      toast.error('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setStep('method');
    setError('');
    setUseNewCard(false);
    setNewCard({ number: '', expiry: '', cvc: '', name: '', zipCode: '' });
    setSaveCard(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {step === 'success' ? 'Payment Successful' : 
             step === 'error' ? 'Payment Failed' : 'Secure Payment'}
          </h3>
          <button
            onClick={() => {
              onClose();
              resetModal();
            }}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === 'method' && (
          <div className="space-y-6">
            {/* Amount Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Appointment Fee:</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatCurrency(amount)}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
              {appointmentData && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>Doctor: {appointmentData.doctor}</p>
                  <p>Date: {appointmentData.date} at {appointmentData.time}</p>
                </div>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Payment Method
                </h4>
                {paymentMethods.length > 0 && (
                  <button
                    onClick={() => setUseNewCard(!useNewCard)}
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                  >
                    {useNewCard ? 'Use saved card' : 'Add new card'}
                  </button>
                )}
              </div>

              {!useNewCard && paymentMethods.length > 0 ? (
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="sr-only"
                      />
                      <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            •••• •••• •••• {method.card?.last4}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                            {method.card?.brand}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Expires {method.card?.exp_month}/{method.card?.exp_year}
                        </span>
                      </div>
                      {selectedMethod === method.id && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </label>
                  ))}
                  <div className="flex space-x-3 mt-2">
                    <img src="https://animationvisarts.com/wp-content/uploads/2023/11/Frame-43-1.png" alt="Google Pay" className="h-20 w-20" />
                    {/* <img src="https://www.guide2gambling.in/wp-content/uploads/2021/10/PhonePe-Logo.png" alt="PhonePe" className="h-8 w-8" /> */}
                    <img src="https://thefinrate.com/wp-content/uploads/2023/09/Screenshot-2024-11-08-180132.png" alt="Paytm" className="h-20 w-25" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={newCard.number}
                      onChange={handleCardNumberChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={newCard.expiry}
                        onChange={handleExpiryChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={newCard.cvc}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 4) {
                            setNewCard({ ...newCard, cvc: value });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Ajith"
                      value={newCard.name}
                      onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      placeholder="12345"
                      value={newCard.zipCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 5) {
                          setNewCard({ ...newCard, zipCode: value });
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="save-card"
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="save-card" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Save this card for future payments
                    </label>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Lock className="h-4 w-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span>{loading ? 'Processing...' : `Pay ${formatCurrency(amount)}`}</span>
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Processing Payment
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we securely process your payment...
            </p>
            <div className="mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Amount: {formatCurrency(amount)}
              </p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Payment Successful!
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your payment of {formatCurrency(amount)} has been processed successfully.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <p className="text-sm text-green-800 dark:text-green-200">
                Your appointment has been confirmed and you will receive a confirmation email shortly.
              </p>
            </div>
          </div>
        )}

        {step === 'error' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Payment Failed
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <div className="space-y-3">
              <button
                onClick={() => setStep('method')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  onClose();
                  resetModal();
                }}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;