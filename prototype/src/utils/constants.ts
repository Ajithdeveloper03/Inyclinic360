// Appointment Status Constants
export const APPOINTMENT_STATUSES = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  CHECKED_IN: 'checked_in',
  IN_WAITING_ROOM: 'in_waiting_room',
  WITH_DOCTOR: 'with_doctor',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show'
} as const;

export const APPOINTMENT_STATUS_LABELS = {
  [APPOINTMENT_STATUSES.SCHEDULED]: 'Scheduled',
  [APPOINTMENT_STATUSES.CONFIRMED]: 'Confirmed',
  [APPOINTMENT_STATUSES.CHECKED_IN]: 'Checked In',
  [APPOINTMENT_STATUSES.IN_WAITING_ROOM]: 'In Waiting Room',
  [APPOINTMENT_STATUSES.WITH_DOCTOR]: 'With Doctor',
  [APPOINTMENT_STATUSES.IN_PROGRESS]: 'In Progress',
  [APPOINTMENT_STATUSES.COMPLETED]: 'Completed',
  [APPOINTMENT_STATUSES.CANCELLED]: 'Cancelled',
  [APPOINTMENT_STATUSES.NO_SHOW]: 'No Show'
} as const;

// Live Tracking Constants
export const LIVE_TRACKING_STATUSES = {
  WAITING: 'waiting',
  IN_QUEUE: 'in_queue',
  BEING_SERVED: 'being_served',
  COMPLETED: 'completed'
} as const;

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: 'super-admin',
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  PATIENT: 'patient'
} as const;

// Department Constants
export const DEPARTMENTS = {
  CARDIOLOGY: 'cardiology',
  ORTHOPEDICS: 'orthopedics',
  PEDIATRICS: 'pediatrics',
  GENERAL: 'general',
  EMERGENCY: 'emergency',
  NEUROLOGY: 'neurology',
  DERMATOLOGY: 'dermatology',
  PSYCHIATRY: 'psychiatry'
} as const;

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
  CRITICAL: 'critical'
} as const;