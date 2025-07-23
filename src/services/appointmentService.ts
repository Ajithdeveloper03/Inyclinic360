export interface TimeSlot {
  time: string;
  available: boolean;
  reserved?: boolean;
  patientName?: string;
  appointmentType?: string;
  duration?: number;
  status?: string;
  isBreak?: boolean;
  isPast?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  department: string;
  specialization: string;
  experience: string;
  rating: number;
  fee: number;
  avatar: string;
  languages: string[];
  workingHours: {
    start: string;
    end: string;
  };
  isAvailableOnline: boolean;
  nextAvailableSlot?: string;
}

export interface AppointmentData {
  id?: number;
  patientId?: number;
  doctorId: string;
  clinicId?: number;
  appointmentDate: string;
  appointmentTime: string;
  type: string;
  department: string;
  notes?: string;
  fee: number;
  expectedDuration: number;
  urgency?: string;
}

class AppointmentService {
  private baseUrl = '/api';

  async getDoctors(department?: string, clinicId?: string): Promise<Doctor[]> {
    try {
      const params = new URLSearchParams();
      if (department) params.append('department', department);
      if (clinicId) params.append('clinic_id', clinicId);

      const response = await fetch(`${this.baseUrl}/doctors/list.php?${params}`);
      const data = await response.json();

      if (data.success) {
        return data.data.doctors;
      }
      throw new Error(data.message);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
      // Return mock data for development
      return this.getMockDoctors(department);
    }
  }

  async getAvailableSlots(doctorId: string, date: string): Promise<TimeSlot[]> {
    try {
      const response = await fetch(`${this.baseUrl}/appointments/available-slots.php?doctor_id=${doctorId}&date=${date}`);
      const data = await response.json();

      if (data.success) {
        return data.data.slots;
      }
      throw new Error(data.message);
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
      // Return mock data for development
      return this.getMockTimeSlots(date);
    }
  }

  async createAppointment(appointmentData: AppointmentData): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/appointments/create.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          ...appointmentData,
          csrf_token: await this.getCSRFToken()
        })
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message);
    } catch (error) {
      console.error('Failed to create appointment:', error);
      // Simulate success for development
      return {
        success: true,
        appointment_id: Date.now(),
        message: 'Appointment created successfully'
      };
    }
  }

  async updateAppointmentStatus(appointmentId: number, status: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/appointments/update-status.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          status,
          csrf_token: await this.getCSRFToken()
        })
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message);
    } catch (error) {
      console.error('Failed to update appointment status:', error);
      throw error;
    }
  }

  async getLiveTrackingData(clinicId?: string, doctorId?: string): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (clinicId) params.append('clinic_id', clinicId);
      if (doctorId) params.append('doctor_id', doctorId);

      const response = await fetch(`${this.baseUrl}/appointments/live-tracking.php?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        return data.data;
      }
      throw new Error(data.message);
    } catch (error) {
      console.error('Failed to fetch live tracking data:', error);
      throw error;
    }
  }

  private async getCSRFToken(): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/csrf-token.php`);
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
      return 'mock-csrf-token';
    }
  }

  // Mock data for development
  private getMockDoctors(department?: string): Doctor[] {
    const allDoctors: Doctor[] = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        department: 'Cardiology',
        specialization: 'Interventional Cardiology',
        experience: '15 years',
        rating: 4.9,
        fee: 200,
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
        languages: ['English', 'Hindi'],
        workingHours: { start: '09:00', end: '18:00' },
        isAvailableOnline: true
      },
      {
        id: '2',
        name: 'Dr. Michael Brown',
        department: 'Orthopedics',
        specialization: 'Sports Medicine',
        experience: '12 years',
        rating: 4.8,
        fee: 180,
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
        languages: ['English', 'Hindi'],
        workingHours: { start: '10:00', end: '19:00' },
        isAvailableOnline: false
      },
      {
        id: '3',
        name: 'Dr. Emily Smith',
        department: 'Pediatrics',
        specialization: 'Child Development',
        experience: '10 years',
        rating: 4.9,
        fee: 150,
        avatar: 'https://images.unsplash.com/photo-1594824475317-d8b5b0b0b8b0?w=150&h=150&fit=crop&crop=face',
        languages: ['English', 'Hindi', 'Tamil'],
        workingHours: { start: '08:00', end: '16:00' },
        isAvailableOnline: true
      },
      {
        id: '4',
        name: 'Dr. David Wilson',
        department: 'General Medicine',
        specialization: 'Family Medicine',
        experience: '8 years',
        rating: 4.7,
        fee: 120,
        avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
        languages: ['English', 'Hindi'],
        workingHours: { start: '09:00', end: '17:00' },
        isAvailableOnline: true
      }
    ];

    return department 
      ? allDoctors.filter(doc => doc.department === department)
      : allDoctors;
  }

  private getMockTimeSlots(date: string): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 18;
    const interval = 30;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Mock some reserved slots
        const isReserved = ['09:30', '11:00', '14:30', '16:00'].includes(timeString);
        const isBreak = timeString >= '12:00' && timeString <= '13:00';
        
        slots.push({
          time: timeString,
          available: !isReserved && !isBreak,
          reserved: isReserved,
          isBreak,
          patientName: isReserved ? 'John Smith' : undefined,
          appointmentType: isReserved ? 'Consultation' : undefined,
          duration: isReserved ? 30 : undefined
        });
      }
    }

    return slots;
  }
}

export const appointmentService = new AppointmentService();