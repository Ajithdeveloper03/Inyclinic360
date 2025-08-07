import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clinicBg1 from '../assets/clinic-bg1.jpg';
import clinicBg2 from '../assets/clinic-bg2.jpg';
import clinicBg3 from '../assets/clinic-bg3.jpg';
import clinicBg4 from '../assets/clinic-bg4.jpg';
import access from '../assets/access.png';
import analytics from '../assets/analytics.png';
import appointemnt from '../assets/appointemnt.png';
import billing from '../assets/billing.png';
import mobile from '../assets/mobile.png';
import prescription from '../assets/prescription.png';
import records from '../assets/records.png';
import reminders from '../assets/reminders.png';
import schedules from '../assets/schedules.png';
import toast from 'react-hot-toast';
import Logo from '../assets/logo.png';
import choose from '../assets/why-chhose.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  UserRound, ShieldCheck, Rocket, RefreshCcw, BrainCog, SlidersHorizontal, Smile,
  Stethoscope,
  Users,
  Calendar,
  Shield,
  Activity,
  Heart,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Star,
  Smartphone,
  MessageCircle,
  FileText,
  CreditCard,
  Clock,
  Brain,
  Video,
  Globe,
  Award,
  Zap,
  Lock,
  Headphones,
  Settings,
  Menu,
  X
} from 'lucide-react';

const LandingPage = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoType, setDemoType] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    specialty: '',
    message: '',
    preferredTime: '',
    clinicSize: ''
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    { image: clinicBg1 },
    { image: clinicBg2 },
    { image: clinicBg3 },
    { image: clinicBg4 },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Online Appointment Booking",
      description: "Web + WhatsApp integration for seamless booking",
      image: appointemnt
    },
    {
      icon: FileText,
      title: "Digital Patient Records",
      description: "Complete history management and secure storage",
      image: records
    },
    {
      icon: MessageCircle,
      title: "Automated Reminders",
      description: "SMS & WhatsApp notifications for appointments",
      image: reminders
    },
    {
      icon: Stethoscope,
      title: "Prescription Generator",
      description: "Digital prescriptions and report generation",
      image: prescription
    },
    {
      icon: CreditCard,
      title: "Billing & Payments",
      description: "Integrated payment gateway and invoicing",
      image: billing
    },
    {
      icon: Clock,
      title: "Doctor Schedules",
      description: "Multi-branch access and schedule management",
      image: schedules
    },
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Smart insights and automated reports",
      image: analytics
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Secure access control for different user types",
      image: access
    },
    {
      icon: Smartphone,
      title: "Mobile-Friendly",
      description: "Responsive interface for all devices",
      image: mobile
    }
  ];

  const clinicTypes = [
    "Single & Multi-Specialty Clinics",
    "Dental Clinics",
    "Eye Care Centers",
    "Skin & Dermatology Clinics",
    "Orthopedic Centers",
    "ENT Clinics",
    "Diagnostic Labs",
    "Therapy Centers"
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: "360-Degree Automation",
      description: "Manage everything from appointments to payments seamlessly"
    },
    {
      icon: Brain,
      title: "AI-Integrated",
      description: "Smart suggestions for follow-ups, medicine reminders, and patient insights"
    },
    {
      icon: Settings,
      title: "Customizable",
      description: "Tailor the software to your clinic's needs – from small setups to large practices"
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "No tech background needed. Just log in and go!"
    },
    {
      icon: Lock,
      title: "Data Security",
      description: "HIPAA-compliant with cloud-based encrypted storage"
    },
    {
      icon: Headphones,
      title: "Support That Cares",
      description: "24/7 tech support + training provided for your team"
    }
  ];
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  const testimonials = [
    {
      name: "Dr. Aravind Raj",
      clinic: "Aravind ENT Clinic, Tiruchirappalli",
      message: "InyClinic360° completely transformed the way we handle patient flow and medical records. It's fast, efficient.",
      rating: 5
    },
    {
      name: "Dr. Kavitha Suresh",
      clinic: "Kavitha Skin Clinic, Madurai",
      message: "I used to manage appointments manually. Now, everything is online and patients love it. Highly recommend this software!",
      rating: 5
    },
    {
      name: "Dr. Vimal",
      clinic: "Smile Dental Care, Erode",
      message: "The WhatsApp integration is brilliant. Patients receive reminders without us lifting a finger!",
      rating: 5
    },
     {
      name: "Dr. Aravind Raj",
      clinic: "Aravind ENT Clinic, Tiruchirappalli",
      message: "InyClinic360° completely transformed the way we handle patient flow and medical records. It's fast, efficient.",
      rating: 5
    },
    {
      name: "Dr. Kavitha Suresh",
      clinic: "Kavitha Skin Clinic, Madurai",
      message: "I used to manage appointments manually. Now, everything is online and patients love it. Highly recommend this software!",
      rating: 5
    },
    {
      name: "Dr. Vimal",
      clinic: "Smile Dental Care, Erode",
      message: "The WhatsApp integration is brilliant. Patients receive reminders without us lifting a finger!",
      rating: 5
    }
  ];

  const handleDemoRequest = (type) => {
    setDemoType(type);
    setShowDemoModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Demo request submitted successfully! We will contact you within 24 hours.');

    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      role: '',
      specialty: '',
      message: '',
      preferredTime: '',
      clinicSize: ''
    });
    setShowDemoModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={Logo} className="h-10" alt="Logo" />
              <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
                InyClinic360°
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                Features
              </a>
              <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                Testimonials
              </a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                Contact
              </a>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden flex flex-col space-y-2 py-4">
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                Features
              </a>
              <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                Testimonials
              </a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                Contact
              </a>
              <Link
                to="/login"
                className="w-[100px] bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </header>
      {/* Hero Section */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="absolute inset-0 z-0">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage: `url(${banner.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-white/85 dark:bg-black/85" />
            </div>
          ))}
          <div className="absolute inset-0 pointer-events-none">
            <Stethoscope
              className="absolute w-12 h-12 text-blue-600 dark:text-blue-400 opacity-50 animate-float"
              style={{ top: '20%', left: '10%', animationDelay: '0s' }}
            />
            <Heart
              className="absolute w-10 h-10 text-red-500 dark:text-red-400 opacity-50 animate-float"
              style={{ top: '13%', right: '5%', animationDelay: '1s' }}
            />
            <FileText
              className="absolute w-14 h-14 text-green-600 dark:text-green-400 opacity-50 animate-float"
              style={{ bottom: '45%', left: '15%', animationDelay: '2s' }}
            />
            <Brain
              className="absolute w-12 h-12 text-purple-600 dark:text-purple-400 opacity-50 animate-float"
              style={{ top: '60%', right: '10%', animationDelay: '3s' }}
            />
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Revolutionize Your Clinic with
              <span className="text-blue-600 dark:text-blue-400"> InyClinic360°</span>
            </h1>
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30 rounded-full blur-3xl animate-glow"></div>
              <p className="relative text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-slide tracking-wide">
                “The Future of Clinics, Built Today.”
              </p>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-6xl mx-auto">
              Are you tired of managing patient records manually? Struggling with double bookings, missing appointments, or slow documentation? InyClinic360° is your one-stop solution – a robust, cloud-based clinic management software designed for modern clinics in Tamil Nadu, across India, and in the USA.
            </p>
           
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span onClick={() => handleDemoRequest('general')}>Book Free Demo</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Call +91-8056553322</span>
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-6">
                  <Stethoscope className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Clinic Portal
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  For doctors, nurses, and administrators to manage appointments, patient records, and staff schedules with AI-powered insights.
                </p>
                <Link
                  to="/login?role=clinic"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Access Clinic Portal
                </Link>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mx-auto mb-6">
                  <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Patient Portal
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  For patients to book appointments via Web + WhatsApp, access medical records, and manage their healthcare journey.
                </p>
                <Link
                  to="/login?role=patient"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Access Patient Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Key Features Section */}
      <section id="features" className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our hospital information system India is built to handle small clinics to multi-specialty hospitals. With powerful features like cloud-based EMR, pharmacy, lab, and finance modules, InyClinic360° helps you run your clinic smartly and securely.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img src={feature.image} alt={feature.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Designed For Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🎯 Designed For
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Whether you're in Chennai, Madurai, Coimbatore, Trichy or anywhere in India and USA, InyClinic360° empowers clinics across Tamil Nadu with fully localized solutions. From patient interfaces to state-compliant billing, we understand your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clinicTypes.map((type, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <p className="text-white font-medium">{type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Streamline your clinic with smart, secure technology tailored for Tamil Nadu, India, and the USA.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={choose}
                alt="AI Illustration"
                className="rounded-2xl shadow-md"
              />
              <div className="absolute -bottom-4 -right-3 bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-lg flex items-center space-x-3">
                <span className="text-yellow-500 text-2xl">🏅</span>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">Industry Leaders</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Trusted by 1,000+ Clinics</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "360-Degree Automation",
                  description: "Manage everything from appointments to payments seamlessly.",
                  icon: <RefreshCcw className="w-7 h-7 text-white" />,
                  gradient: "from-purple-500 to-purple-600"
                },
                {
                  title: "AI-Integrated",
                  description: "Smart suggestions for follow-ups, medicine reminders, and patient insights.",
                  icon: <BrainCog className="w-7 h-7 text-white" />,
                  gradient: "from-indigo-500 to-indigo-600"
                },
                {
                  title: "Customizable",
                  description: "Tailor the software to your clinic's needs – from small setups to large practices.",
                  icon: <SlidersHorizontal className="w-7 h-7 text-white" />,
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  title: "User-Friendly",
                  description: "No tech background needed. Just log in and go!",
                  icon: <Smile className="w-7 h-7 text-white" />,
                  gradient: "from-green-400 to-green-500"
                },
                {
                  title: "Data Security",
                  description: "HIPAA-compliant with cloud-based encrypted storage.",
                  icon: <Lock className="w-7 h-7 text-white" />,
                  gradient: "from-teal-400 to-teal-500"
                },
                {
                  title: "Support That Cares",
                  description: "24/7 tech support + training provided for your team.",
                  icon: <MessageCircle className="w-7 h-7 text-white" />,
                  gradient: "from-orange-400 to-orange-500"
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              👨‍⚕️ Doctors Testimonials
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from healthcare professionals who trust InyClinic360°
            </p>
          </div>
          {/* Slider */}
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4 mb-5">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                    "{testimonial.message}"
                  </p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.clinic}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
          <div className="max-w-4xl mx-auto mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700">
            {/* Heading */}
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Start Your Free Trial Today 🚀
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Experience the future of clinic operations with InyClinic360°
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
                <p className="font-semibold text-gray-900 dark:text-white text-center">
                  7-Day Free Trial
                </p>
              </div>
              <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
                <p className="font-semibold text-gray-900 dark:text-white text-center">
                  No Credit Card Required
                </p>
              </div>
              <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
                <p className="font-semibold text-gray-900 dark:text-white text-center">
                  WhatsApp & Email Support
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="text-center">
              <button
                onClick={() => handleDemoRequest('general')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-transform transform hover:scale-105"
              >
                Start Free Trial
              </button>
            </div>
          </div>

        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-b from-blue-900 to-blue-700 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-white mb-3">Get in Touch</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Questions? Ready for a demo? Contact us to elevate your clinic!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
              <a href="mailto:support@inyclinic360.com" className="text-blue-200 hover:text-white">
                support@inyclinic360.com
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Phone/WhatsApp</h3>
              <a href="tel:+918056553322" className="text-blue-200 hover:text-white">
                +91-8056553322
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Address</h3>
              <p className="text-blue-200 text-sm">
                Tennur High Road, Trichy, Tamil Nadu - 620017
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Revolutionize Your Clinic?
            </h3>
            <p className="text-blue-100 mb-6">
              Discover how InyClinic360° can streamline your practice with a 7-day free trial, no credit card required, and full WhatsApp & email support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleDemoRequest('general')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-200"
              >
                Start Free Trial
              </button>
              <a
                href="https://wa.me/918056553322"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
          {showDemoModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {demoType === 'clinic' ? 'Request Clinic Demo' :
                      demoType === 'patient' ? 'Request Patient Portal Demo' :
                        'Start Your Free Trial'}
                  </h3>
                  <button
                    onClick={() => setShowDemoModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    {demoType === 'clinic' ?
                      '🏥 Get a personalized demonstration of our clinic management features including appointment scheduling, patient records, staff management, and analytics.' :
                      demoType === 'patient' ?
                        '👤 Discover how patients can easily book appointments, access medical records, and manage their healthcare journey through our patient portal.' :
                        '🚀 Experience the complete InyClinic360° platform with a comprehensive demo tailored to your healthcare needs.'}
                  </p>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Dr. John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="john@clinic.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="+91-9876543210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {demoType === 'clinic' ? 'Clinic/Hospital Name' : 'Organization'}
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder={demoType === 'clinic' ? 'City Medical Center' : 'Your organization'}
                      />
                    </div>
                  </div>
                  {demoType === 'clinic' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Your Role
                        </label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">Select Role</option>
                          <option value="doctor">Doctor</option>
                          <option value="clinic-owner">Clinic Owner</option>
                          <option value="administrator">Administrator</option>
                          <option value="manager">Practice Manager</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Medical Specialty
                        </label>
                        <select
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">Select Specialty</option>
                          <option value="general">General Medicine</option>
                          <option value="cardiology">Cardiology</option>
                          <option value="orthopedics">Orthopedics</option>
                          <option value="pediatrics">Pediatrics</option>
                          <option value="dermatology">Dermatology</option>
                          <option value="dental">Dental</option>
                          <option value="eye-care">Eye Care</option>
                          <option value="ent">ENT</option>
                          <option value="multi-specialty">Multi-Specialty</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  )}
                  {demoType === 'clinic' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Clinic Size
                      </label>
                      <select
                        name="clinicSize"
                        value={formData.clinicSize}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Select Clinic Size</option>
                        <option value="solo">Solo Practice (1 doctor)</option>
                        <option value="small">Small Clinic (2-5 doctors)</option>
                        <option value="medium">Medium Clinic (6-15 doctors)</option>
                        <option value="large">Large Clinic (16+ doctors)</option>
                        <option value="hospital">Hospital/Medical Center</option>
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Preferred Demo Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Preferred Time</option>
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                      <option value="evening">Evening (4 PM - 7 PM)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Additional Requirements or Questions
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Tell us about your specific needs, current challenges, or any questions you have about InyClinic360°..."
                    />
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">What to Expect:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Live walkthrough of features relevant to your practice</li>
                      <li>• Custom pricing discussion based on your needs</li>
                      <li>• Free trial setup if you're interested</li>
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowDemoModal(false)}
                      className="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Schedule Demo</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    By submitting this form, you agree to be contacted by our team regarding InyClinic360°.
                    We respect your privacy and will never share your information with third parties.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img src={Logo} className='h-10' />
                <span className="ml-2 text-2xl font-bold">InyClinic360°</span>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionary healthcare technology solutions crafted with precision by Inymart Digi Solutions - your trusted partner in digital healthcare transformation
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="mailto:support@inyclinic360.com" className="text-gray-400 hover:text-white">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="tel:+918056553322" className="text-gray-400 hover:text-white">
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Appointment Booking</a></li>
                <li><a href="#" className="hover:text-white">Patient Records</a></li>
                <li><a href="#" className="hover:text-white">AI Analytics</a></li>
                <li><a href="#" className="hover:text-white">Teleconsultation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Training</a></li>
                <li><a href="#" className="hover:text-white">24/7 Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 InyClinic360° by <a href="https://www.inymart.in" target="_blank">Inymart Digi Solutions</a>. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Transforming healthcare through technology
            </p>
          </div>
        </div>
      </footer>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          @keyframes glow {
            0% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
            100% { opacity: 0.3; transform: scale(1); }
          }
          .animate-glow { animation: glow 4s ease-in-out infinite; }
          @keyframes slide {
            0% { transform: translateX(-20px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slide { animation: slide 1.5s ease-out forwards; }
        `}
      </style>
    </div>
  );
};

export default LandingPage;