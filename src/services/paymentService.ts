import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo');

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

class PaymentService {
  async createPaymentIntent(amount: number, description: string): Promise<PaymentIntent> {
    // Simulate API call to create payment intent
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `pi_${Math.random().toString(36).substr(2, 9)}`,
          amount,
          currency: 'usd',
          status: 'requires_payment_method',
          description
        });
      }, 1000);
    });
  }

  async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<{ success: boolean; error?: string }> {
    // Simulate payment confirmation
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        resolve({
          success,
          error: success ? undefined : 'Payment failed. Please try again.'
        });
      }, 2000);
    });
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    // Simulate fetching saved payment methods
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'pm_1',
            type: 'card',
            card: {
              brand: 'visa',
              last4: '4242',
              exp_month: 12,
              exp_year: 2025
            }
          },
          {
            id: 'pm_2',
            type: 'card',
            card: {
              brand: 'mastercard',
              last4: '5555',
              exp_month: 8,
              exp_year: 2026
            }
          }
        ]);
      }, 500);
    });
  }

  async processInsuranceClaim(claimData: any): Promise<{ approved: boolean; coverageAmount: number; patientResponsibility: number }> {
    // Simulate insurance claim processing
    return new Promise((resolve) => {
      setTimeout(() => {
        const approved = Math.random() > 0.2; // 80% approval rate
        const coverageAmount = approved ? claimData.amount * 0.8 : 0;
        const patientResponsibility = claimData.amount - coverageAmount;
        
        resolve({
          approved,
          coverageAmount,
          patientResponsibility
        });
      }, 3000);
    });
  }
}

export const paymentService = new PaymentService();