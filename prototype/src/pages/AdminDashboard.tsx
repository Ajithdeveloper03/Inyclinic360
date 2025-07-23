import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import StatsCard from '../components/StatsCard';
import PaymentModal from '../components/PaymentModal';
import AppointmentProgressBar from '../components/AppointmentProgressBar';
import { APPOINTMENT_STATUSES } from '../utils/constants';
import { 
  Users, 
  Building2, 
  Calendar, 
  FileText, 
  DollarSign, 
  Activity, 
  Shield, 
  Settings,
  TrendingUp,
  AlertTriangle,
  UserCheck,
  Clock,
  BarChart3,
  Database,
  Bell,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Video,
  MessageCircle,
  Brain,
  Zap,
  CreditCard,
  Heart,
  Stethoscope
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock data for admin dashboard
  const systemStats = [
    {
      title: "Total Clinics",
      value: "247",
      change: "+12%",
      changeType: "increase" as const,
      icon: Building2,
      color: "blue" as const
    },
    {
      title: "Total Patients",
      value: "15,847",
      change: "+8.5%",
      changeType: "increase" as const,
      icon: Users,
      color: "green" as const
    },
    {
      title: "Active Sessions",
      value: "1,234",
      change: "+15%",
      changeType: "increase" as const,
      icon: Activity,
      color: "purple" as const
    },
    {
      title: "System Revenue",
      value: "$2.4M",
      change: "+22%",
      changeType: "increase" as const,
      icon: DollarSign,
      color: "orange" as const
    }
  ];

  const clinics = [
    { id: 1, name: 'City Medical Center', location: 'New York', patients: 1247, doctors: 15, status: 'active', subscription: 'premium', revenue: '$45,200' },
    { id: 2, name: 'Wellness Clinic', location: 'Los Angeles', patients: 892, doctors: 8, status: 'active', subscription: 'standard', revenue: '$28,900' },
    { id: 3, name: 'Family Health Care', location: 'Chicago', patients: 654, doctors: 6, status: 'inactive', subscription: 'basic', revenue: '$15,600' },
    { id: 4, name: 'Metro Hospital', location: 'Houston', patients: 2156, doctors: 25, status: 'active', subscription: 'premium', revenue: '$78,400' },
    { id: 5, name: 'Community Clinic', location: 'Phoenix', patients: 445, doctors: 4, status: 'active', subscription: 'basic', revenue: '$12,300' }
  ];

  const recentPatients = [
    { id: 1, name: 'John Smith', email: 'john@example.com', clinic: 'City Medical Center', lastVisit: '2024-12-14', status: 'active' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', clinic: 'Wellness Clinic', lastVisit: '2024-12-13', status: 'active' },
    { id: 3, name: 'Michael Davis', email: 'michael@example.com', clinic: 'Family Health Care', lastVisit: '2024-12-12', status: 'inactive' },
    { id: 4, name: 'Emma Thompson', email: 'emma@example.com', clinic: 'Metro Hospital', lastVisit: '2024-12-11', status: 'active' },
    { id: 5, name: 'David Lee', email: 'david@example.com', clinic: 'Community Clinic', lastVisit: '2024-12-10', status: 'active' }
  ];

  const [liveAppointments, setLiveAppointments] = useState([
    {
      id: 1,
      patient: 'John Smith',
      clinic: 'City Medical Center',
      doctor: 'Dr. Johnson',
      status: APPOINTMENT_STATUSES.WITH_DOCTOR,
      time: '09:00',
      expectedDuration: 30,
      elapsedTime: 15,
      estimatedWaitTime: 0,
      queuePosition: 0,
      department: 'Cardiology'
    },
    {
      id: 2,
      patient: 'Sarah Wilson',
      clinic: 'Wellness Clinic',
      doctor: 'Dr. Brown',
      status: APPOINTMENT_STATUSES.IN_WAITING_ROOM,
      time: '10:30',
      expectedDuration: 20,
      elapsedTime: 0,
      estimatedWaitTime: 8,
      queuePosition: 1,
      department: 'Orthopedics'
    },
    {
      id: 3,
      patient: 'Michael Davis',
      clinic: 'Metro Hospital',
      doctor: 'Dr. Smith',
      status: APPOINTMENT_STATUSES.CHECKED_IN,
      time: '11:15',
      expectedDuration: 45,
      elapsedTime: 0,
      estimatedWaitTime: 25,
      queuePosition: 2,
      department: 'Neurology'
    }
  ]);

  const pendingPayments = [
    { id: 1, patient: 'John Smith', clinic: 'City Medical Center', amount: 150, service: 'Cardiology Consultation', dueDate: '2024-12-20' },
    { id: 2, patient: 'Sarah Wilson', clinic: 'Wellness Clinic', amount: 75, service: 'Lab Tests', dueDate: '2024-12-22' },
    { id: 3, patient: 'Michael Davis', clinic: 'Metro Hospital', amount: 200, service: 'Orthopedic Treatment', dueDate: '2024-12-25' }
  ];

  const aiInsights = [
    { id: 1, type: 'efficiency', title: 'Clinic Efficiency Alert', message: 'City Medical Center showing 15% improvement in patient flow', priority: 'medium' },
    { id: 2, type: 'revenue', title: 'Revenue Optimization', message: 'Recommend premium plans for 3 high-volume clinics', priority: 'high' },
    { id: 3, type: 'patient', title: 'Patient Satisfaction', message: 'Overall satisfaction increased by 8% this month', priority: 'low' }
  ];

  // Live updates for admin dashboard
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAppointments(prev => prev.map(apt => {
        let newApt = { ...apt };
        
        switch (apt.status) {
          case APPOINTMENT_STATUSES.IN_WAITING_ROOM:
            if (apt.estimatedWaitTime > 0) {
              newApt.estimatedWaitTime = Math.max(0, apt.estimatedWaitTime - Math.floor(Math.random() * 3) - 1);
              if (newApt.estimatedWaitTime <= 2 && Math.random() > 0.7) {
                newApt.status = APPOINTMENT_STATUSES.WITH_DOCTOR;
                newApt.estimatedWaitTime = 0;
                newApt.queuePosition = 0;
              }
            }
            break;
          case APPOINTMENT_STATUSES.CHECKED_IN:
            if (Math.random() > 0.8) {
              newApt.status = APPOINTMENT_STATUSES.IN_WAITING_ROOM;
              newApt.estimatedWaitTime = Math.max(5, apt.estimatedWaitTime - 5);
            } else {
              newApt.estimatedWaitTime = Math.max(0, apt.estimatedWaitTime - Math.floor(Math.random() * 2));
            }
            break;
          case APPOINTMENT_STATUSES.WITH_DOCTOR:
            newApt.elapsedTime = apt.elapsedTime + 1;
            if (newApt.elapsedTime >= apt.expectedDuration && Math.random() > 0.6) {
              newApt.status = APPOINTMENT_STATUSES.COMPLETED;
              newApt.estimatedWaitTime = 0;
            }
            break;
        }
        
        return newApt;
      }));
      
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const systemAlerts = [
    { id: 1, type: 'warning', title: 'High Server Load', message: 'Server CPU usage at 85%', time: '5 min ago', severity: 'medium' },
    { id: 2, type: 'error', title: 'Payment Gateway Issue', message: 'Payment processing temporarily down', time: '15 min ago', severity: 'high' },
    { id: 3, type: 'info', title: 'Scheduled Maintenance', message: 'System maintenance in 2 hours', time: '1 hour ago', severity: 'low' },
    { id: 4, type: 'success', title: 'Backup Completed', message: 'Daily backup completed successfully', time: '2 hours ago', severity: 'low' }
  ];

  const subscriptionPlans = [
    { name: 'Basic', price: '$99/month', features: ['Up to 100 patients', 'Basic reporting', 'Email support'], clinics: 45 },
    { name: 'Standard', price: '$199/month', features: ['Up to 500 patients', 'Advanced reporting', 'Phone support', 'API access'], clinics: 128 },
    { name: 'Premium', price: '$399/month', features: ['Unlimited patients', 'Custom reporting', '24/7 support', 'White-label'], clinics: 74 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-clinic':
        setModalType('add-clinic');
        setShowModal(true);
        break;
      case 'system-backup':
        toast.success('System backup initiated');
        break;
      case 'send-notification':
        setModalType('send-notification');
        setShowModal(true);
        break;
      case 'export-data':
        toast.success('Data export started');
        break;
      default:
        toast.info(`${action} feature activated`);
    }
  };

  const handleClinicAction = (action: string, clinic: any) => {
    switch (action) {
      case 'view':
        toast.info(`Viewing ${clinic.name} details`);
        break;
      case 'edit':
        toast.info(`Editing ${clinic.name}`);
        break;
      case 'suspend':
        toast.warning(`${clinic.name} suspended`);
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete ${clinic.name}?`)) {
          toast.error(`${clinic.name} deleted`);
        }
        break;
      default:
        toast.info(`${action} performed on ${clinic.name}`);
    }
  };

  const handlePatientAction = (action: string, patient: any) => {
    switch (action) {
      case 'view':
        toast.info(`Viewing ${patient.name} profile`);
        break;
      case 'edit':
        toast.info(`Editing ${patient.name} profile`);
        break;
      case 'suspend':
        toast.warning(`${patient.name} account suspended`);
        break;
      default:
        toast.info(`${action} performed on ${patient.name}`);
    }
  };

  const handlePaymentRequest = (payment: any) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    toast.success('Payment processed successfully!');
    setShowPaymentModal(false);
    setSelectedPayment(null);
  };

  const handleAppointmentAction = (action: string, appointment: any) => {
    switch (action) {
      case 'call':
        toast.success(`Calling ${appointment.patient}...`);
        break;
      case 'message':
        toast.success(`Sending message to ${appointment.patient}...`);
        break;
      case 'video':
        toast.success(`Starting video call with ${appointment.patient}...`);
        break;
      default:
        toast.info(`${action} performed`);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage clinics, patients, and system operations
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleQuickAction('add-clinic')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Clinic</span>
            </button>
            <button 
              onClick={() => handleQuickAction('system-backup')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Database className="h-4 w-4" />
              <span>Backup</span>
            </button>
            <button 
              onClick={() => handleQuickAction('send-notification')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Bell className="h-4 w-4" />
              <span>Notify All</span>
            </button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <div key={index} className="cursor-pointer transform hover:scale-105 transition-transform duration-200">
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'live-tracking', name: 'Live Tracking', icon: Activity },
            { id: 'clinics', name: 'Clinics', icon: Building2 },
            { id: 'patients', name: 'Patients', icon: Users },
            { id: 'appointments', name: 'Appointments', icon: Calendar },
            { id: 'payments', name: 'Payments', icon: CreditCard },
            { id: 'ai-insights', name: 'AI Insights', icon: Brain },
            { id: 'analytics', name: 'Analytics', icon: TrendingUp },
            { id: 'subscriptions', name: 'Subscriptions', icon: DollarSign },
            { id: 'system', name: 'System', icon: Settings },
            { id: 'alerts', name: 'Alerts', icon: AlertTriangle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap ${
                selectedTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">New clinic registered</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Metro Hospital joined the platform</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Patient milestone reached</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">15,000+ patients now using the platform</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Revenue milestone</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Monthly revenue exceeded $2M</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                System Health
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Server Uptime</span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Database Performance</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">95%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">API Response Time</span>
                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">120ms</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'clinics' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Clinic Management
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search clinics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <button 
                    onClick={() => handleQuickAction('export-data')}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors duration-200"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Clinic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Patients
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Doctors
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Subscription
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {clinics.map((clinic) => (
                    <tr key={clinic.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-3">
                            <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {clinic.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {clinic.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {clinic.patients.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {clinic.doctors}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          clinic.subscription === 'premium' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' :
                          clinic.subscription === 'standard' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                        }`}>
                          {clinic.subscription}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {clinic.revenue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(clinic.status)}`}>
                          {clinic.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleClinicAction('view', clinic)}
                            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 p-1"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleClinicAction('edit', clinic)}
                            className="text-green-600 hover:text-green-500 dark:text-green-400 p-1"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleClinicAction('suspend', clinic)}
                            className="text-yellow-600 hover:text-yellow-500 dark:text-yellow-400 p-1"
                            title="Suspend"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleClinicAction('delete', clinic)}
                            className="text-red-600 hover:text-red-500 dark:text-red-400 p-1"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'patients' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Patient Management
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search patients..."
                      className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Clinic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-3">
                            <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {patient.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {patient.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {patient.clinic}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {patient.lastVisit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handlePatientAction('view', patient)}
                            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 p-1"
                            title="View Profile"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handlePatientAction('edit', patient)}
                            className="text-green-600 hover:text-green-500 dark:text-green-400 p-1"
                            title="Edit Profile"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handlePatientAction('suspend', patient)}
                            className="text-red-600 hover:text-red-500 dark:text-red-400 p-1"
                            title="Suspend Account"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'subscriptions' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    {plan.price}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {plan.clinics} active clinics
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200">
                  Manage Plan
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'alerts' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                System Alerts
              </h2>
              <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
            </div>
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                    alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                    alert.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                    'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {alert.title}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {alert.time}
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={selectedPayment?.amount || 0}
          description={selectedPayment?.service || ''}
          onSuccess={handlePaymentSuccess}
        />

        {/* Modals */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {modalType === 'add-clinic' ? 'Add New Clinic' : 'Send Notification'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              {modalType === 'add-clinic' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Clinic Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter clinic name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subscription Plan
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option value="basic">Basic</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Recipients
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option value="all">All Users</option>
                      <option value="clinics">All Clinics</option>
                      <option value="patients">All Patients</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your message"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success(modalType === 'add-clinic' ? 'Clinic added successfully!' : 'Notification sent!');
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  {modalType === 'add-clinic' ? 'Add Clinic' : 'Send Notification'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;