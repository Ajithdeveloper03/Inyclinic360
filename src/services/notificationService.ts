export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
}

class NotificationService {
  private notifications: Notification[] = [
    {
      id: '1',
      type: 'appointment_reminder',
      title: 'Appointment Reminder',
      message: 'You have an appointment with Dr. Johnson tomorrow at 10:30 AM',
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'medium',
      actionUrl: '/my-appointments'
    },
    {
      id: '2',
      type: 'lab_result',
      title: 'Lab Results Available',
      message: 'Your blood test results are now available for review',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      priority: 'high',
      actionUrl: '/my-records'
    },
    {
      id: '3',
      type: 'payment_due',
      title: 'Payment Due',
      message: 'Payment of $150.00 is due for your recent consultation',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
      priority: 'medium',
      actionUrl: '/payments'
    }
  ];

  async getNotifications(): Promise<Notification[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.notifications]);
      }, 500);
    });
  }

  async markAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  async markAllAsRead(): Promise<void> {
    this.notifications.forEach(n => n.read = true);
  }

  async sendNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Promise<void> {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false
    };
    this.notifications.unshift(newNotification);
  }

  async sendSMS(phoneNumber: string, message: string): Promise<boolean> {
    // Simulate SMS sending
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.1); // 90% success rate
      }, 1000);
    });
  }

  async sendWhatsApp(phoneNumber: string, message: string): Promise<boolean> {
    // Simulate WhatsApp sending
    console.log(`Sending WhatsApp to ${phoneNumber}: ${message}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.05); // 95% success rate
      }, 1500);
    });
  }

  async sendEmail(email: string, subject: string, message: string): Promise<boolean> {
    // Simulate email sending
    console.log(`Sending email to ${email}: ${subject} - ${message}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.02); // 98% success rate
      }, 2000);
    });
  }
}

export const notificationService = new NotificationService();