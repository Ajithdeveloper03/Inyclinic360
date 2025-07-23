import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import NotificationCenter from './NotificationCenter';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Logo from '../assets/logo.png';
import { 
  Heart, 
  Home, 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  Search,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  CreditCard,
  MessageCircle,
  Activity,
  UserCog,
  BarChart3,
  Shield,
  Stethoscope,
  Brain,
  Zap,
  Video,
  Phone,
  HelpCircle,
  Download,
  Building2, // Added for Clinic Management
  AlertTriangle // Added for Alerts & Logs
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isClinicUser = user?.role && ['doctor', 'nurse', 'admin'].includes(user.role);
  const isAdminUser = user?.role === 'super-admin';

  const adminMenuItems = [
    { name: 'Admin Dashboard', icon: Home, href: '/admin-dashboard' },
    { name: 'Clinic Management', icon: Building2, href: '/admin-clinics' },
    { name: 'Patient Management', icon: Users, href: '/admin-patients' },
    { name: 'System Analytics', icon: BarChart3, href: '/admin-analytics' },
    { name: 'Subscriptions', icon: CreditCard, href: '/admin-subscriptions' },
    { name: 'System Settings', icon: Settings, href: '/admin-settings' },
    { name: 'Alerts & Logs', icon: AlertTriangle, href: '/admin-alerts' },
    { name: 'User Support', icon: MessageCircle, href: '/admin-support' }
  ];

  const clinicMenuItems = [
    { name: 'Dashboard', icon: Home, href: '/clinic-dashboard' },
    { name: 'Live Tracking', icon: Activity, href: '/live-tracking' },
    { name: 'Appointments', icon: Calendar, href: '/appointments' },
    { name: 'Patients', icon: Users, href: '/patients' },
    { name: 'Medical Records', icon: FileText, href: '/records' },
    { name: 'Staff Management', icon: UserCog, href: '/staff' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics' },
    { name: 'Telemedicine', icon: Video, href: '/telemedicine' },
    { name: 'AI Insights', icon: Brain, href: '/ai-insights' },
    { name: 'Emergency', icon: Zap, href: '/emergency' },
    { name: 'Settings', icon: Settings, href: '/settings' }
  ];

  const patientMenuItems = [
    { name: 'Dashboard', icon: Home, href: '/patient-dashboard' },
    { name: 'Appointments', icon: Calendar, href: '/my-appointments' },
    { name: 'Medical Records', icon: FileText, href: '/my-records' },
    { name: 'Payments', icon: CreditCard, href: '/payments' },
    { name: 'Health Assistant', icon: MessageCircle, href: '/health-assistant' },
    { name: 'Telemedicine', icon: Video, href: '/patient-telemedicine' },
    { name: 'Health Tracking', icon: Activity, href: '/health-tracking' },
    { name: 'Insurance', icon: Shield, href: '/insurance' },
    { name: 'Emergency', icon: Phone, href: '/emergency-contact' },
    { name: 'Settings', icon: Settings, href: '/patient-settings' }
  ];

  const menuItems = isAdminUser ? adminMenuItems : isClinicUser ? clinicMenuItems : patientMenuItems;

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      toast.success(`Searching for: ${searchTerm}`);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'help':
        toast.info('Help center opened');
        break;
      case 'export':
        toast.success('Data export initiated');
        break;
      case 'emergency':
        navigate(isClinicUser ? '/emergency' : '/emergency-contact');
        break;
      default:
        toast.info(`${action} feature activated`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200 dark:border-gray-700`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <img src={Logo} className='h-10'/>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              Inyclinic 360
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-6">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActiveRoute(item.href)
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={user?.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.role} {user?.department && `• ${user.department}`}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex-1 lg:ml-0">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-4"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              <button
                className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                title="Emergency"
              >
                <Zap className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <img
                  src={user?.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {user?.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;