import { format, parseISO, isToday, isTomorrow, isYesterday } from 'date-fns';

export const formatDate = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(dateObj)) return 'Today';
  if (isTomorrow(dateObj)) return 'Tomorrow';
  if (isYesterday(dateObj)) return 'Yesterday';
  
  return format(dateObj, 'MMM dd, yyyy');
};
export const getEstimatedStartTime = (estimatedWaitTime: number): string => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + estimatedWaitTime);
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatTime = (time: string) => {
  return format(parseISO(`2000-01-01T${time}`), 'h:mm a');
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string) => {
  const re = /^\+?[\d\s\-\(\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
};