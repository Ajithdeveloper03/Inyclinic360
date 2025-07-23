export interface HealthInsight {
  id: string;
  type: 'medication' | 'exercise' | 'diet' | 'checkup' | 'warning';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionRequired: boolean;
  dueDate?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

class AIService {
  async getHealthInsights(patientData: any): Promise<HealthInsight[]> {
    // Simulate AI-generated health insights
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            type: 'medication',
            title: 'Medication Reminder',
            description: 'Take your blood pressure medication at 8:00 PM daily',
            priority: 'high',
            actionRequired: true,
            dueDate: new Date().toISOString()
          },
          {
            id: '2',
            type: 'exercise',
            title: 'Exercise Goal Achievement',
            description: 'Great job! You\'ve completed 7/7 days of exercise this week',
            priority: 'low',
            actionRequired: false
          },
          {
            id: '3',
            type: 'checkup',
            title: 'Upcoming Checkup',
            description: 'Your annual cardiology checkup is due in 2 weeks',
            priority: 'medium',
            actionRequired: true,
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '4',
            type: 'warning',
            title: 'Blood Pressure Trend',
            description: 'Your recent readings show a slight increase. Consider reducing sodium intake.',
            priority: 'medium',
            actionRequired: true
          }
        ]);
      }, 1000);
    });
  }

  async chatWithAI(message: string, conversationHistory: ChatMessage[]): Promise<ChatMessage> {
    // Simulate AI chat response
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = [
          {
            content: "I understand your concern about your symptoms. Based on what you've described, I recommend scheduling an appointment with your primary care physician. In the meantime, make sure to stay hydrated and get plenty of rest.",
            suggestions: ["Book appointment", "View symptoms tracker", "Emergency contacts"]
          },
          {
            content: "Your medication schedule looks good. Remember to take your blood pressure medication at the same time each day for best results. Would you like me to set up automatic reminders?",
            suggestions: ["Set medication reminders", "View medication list", "Contact pharmacist"]
          },
          {
            content: "Based on your recent lab results, your cholesterol levels have improved since your last visit. Keep up the good work with your diet and exercise routine!",
            suggestions: ["View lab results", "Diet recommendations", "Exercise plan"]
          },
          {
            content: "I can help you prepare for your upcoming appointment. Here's a checklist of things to discuss with your doctor and questions you might want to ask.",
            suggestions: ["Appointment checklist", "Previous visit summary", "Insurance information"]
          }
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          type: 'ai',
          content: randomResponse.content,
          timestamp: new Date().toISOString(),
          suggestions: randomResponse.suggestions
        });
      }, 2000);
    });
  }

  async predictNoShow(appointmentData: any): Promise<{ probability: number; factors: string[] }> {
    // Simulate AI prediction for no-show probability
    return new Promise((resolve) => {
      setTimeout(() => {
        const probability = Math.random() * 0.3; // 0-30% chance
        const factors = [
          'Previous no-show history',
          'Weather conditions',
          'Time of appointment',
          'Distance from clinic',
          'Insurance status'
        ].filter(() => Math.random() > 0.5);

        resolve({ probability, factors });
      }, 1500);
    });
  }

  async generateFollowUpPlan(patientData: any): Promise<{ recommendations: string[]; nextAppointment: string }> {
    // Simulate AI-generated follow-up plan
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          recommendations: [
            'Continue current medication regimen',
            'Schedule follow-up in 3 months',
            'Monitor blood pressure daily',
            'Maintain low-sodium diet',
            'Regular exercise 30 minutes daily'
          ],
          nextAppointment: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
        });
      }, 2000);
    });
  }

  async analyzeSymptoms(symptoms: string[]): Promise<{ possibleConditions: string[]; urgency: 'low' | 'medium' | 'high' | 'emergency'; recommendations: string[] }> {
    // Simulate symptom analysis
    return new Promise((resolve) => {
      setTimeout(() => {
        const urgencyLevels = ['low', 'medium', 'high', 'emergency'] as const;
        const urgency = urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)];
        
        resolve({
          possibleConditions: [
            'Common cold',
            'Seasonal allergies',
            'Viral infection',
            'Stress-related symptoms'
          ].slice(0, Math.floor(Math.random() * 3) + 1),
          urgency,
          recommendations: [
            'Rest and hydration',
            'Monitor symptoms',
            'Consider over-the-counter medication',
            'Schedule appointment if symptoms persist'
          ]
        });
      }, 3000);
    });
  }
}

export const aiService = new AIService();