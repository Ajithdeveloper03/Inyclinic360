import React, { useState } from 'react';
import { Phone, Mail, Heart, CheckCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample data, update avatarUrl with real doctor photos if available!
const doctorsData = [
  {
    id: 1,
    name: 'Dr. Naresh',
    specialty: 'Cardiology',
    department: 'Heart Care',
    email: 'naresh.kumar@example.com',
    phone: '+91 9876543210',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'current', // current, consulted, or null
    bio: 'Expert in interventional cardiology with 20+ years of patient care.',
  },
  {
    id: 2,
    name: 'Dr. Priya',
    specialty: 'Neurology',
    department: 'Neuro Sciences',
    email: 'priya.sharma@example.com',
    phone: '+91 9123456780',
    avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
    status: 'consulted',
    bio: 'Specializes in movement disorders and neuromuscular diseases.',
  },
  {
    id: 3,
    name: 'Dr. Ashok',
    specialty: 'Orthopedics',
    department: 'Bone & Joint',
    email: 'ashok.seth@example.com',
    phone: '+91 9988776655',
    avatarUrl: 'https://randomuser.me/api/portraits/men/44.jpg',
    status: null,
    bio: 'Trusted orthopedic surgeon for fracture, knee, and trauma cases.',
  },
  {
    id: 4,
    name: 'Dr. Sandeep',
    specialty: 'Neurosurgery',
    department: 'Neuro Sciences',
    email: 's.vaishya@example.com',
    phone: '+91 9998887777',
    avatarUrl: 'https://randomuser.me/api/portraits/men/35.jpg',
    status: null,
    bio: 'Leading neurosurgeon known for brain tumor and spine surgeries.',
  },
  {
    id: 5,
    name: 'Dr. Neha',
    specialty: 'Dermatology',
    department: 'Skin',
    email: 'neha.banerjee@example.com',
    phone: '+91 9811111981',
    avatarUrl: 'https://randomuser.me/api/portraits/women/47.jpg',
    status: 'consulted',
    bio: 'Acne, laser, and cosmetic skin specialist with 10+ years experience.',
  },
  {
    id: 6,
    name: 'Dr. Sameer ',
    specialty: 'Pediatrics',
    department: 'Children’s Health',
    email: 'sameer.patel@example.com',
    phone: '+91 9000223344',
    avatarUrl: 'https://randomuser.me/api/portraits/men/53.jpg',
    status: null,
    bio: 'Compassionate pediatrician focusing on child and adolescent wellness.',
  },
  {
    id: 7,
    name: 'Dr. Lokesh',
    specialty: 'Oncology',
    department: 'Cancer Care',
    email: 'lokesh@example.com',
    phone: '+91 9023456789',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    status: 'current',
    bio: 'Oncologist renowned for patient advocacy and cutting-edge therapies.',
  },
  {
    id: 8,
    name: 'Dr. Arjun',
    specialty: 'Gastroenterology',
    department: 'Digestive Health',
    email: 'arjun.rao@example.com',
    phone: '+91 8001234567',
    avatarUrl: 'https://randomuser.me/api/portraits/men/61.jpg',
    status: null,
    bio: 'Leading expert in endoscopy, liver, and gut health.',
  },
];

const statusBadgeColor = (status) => {
  switch (status) {
    case 'current':
      return 'bg-green-100 text-green-800';
    case 'consulted':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const MyDoctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, mydoctors
  const navigate = useNavigate();

  // Tab/filter logic
  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      filter === 'all' ||
      doc.status === 'current' ||
      doc.status === 'consulted';
    return matchesSearch && matchesTab;
  });

  const handleViewProfile = (doctorId) => {
    // Placeholder: Add navigation logic to doctor profile page
    navigate(`/doctor/${doctorId}`);
  };

  const handleBookAppointment = (doctorId) => {
    navigate('/book-appointment', { state: { doctorId } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 p-6 md:p-10">
      <h1 className="text-3xl font-extrabold text-blue-800 mb-6 tracking-tight">My Doctors</h1>

      {/* Filter Tabs */}
      <div className="flex space-x-3 mb-7">
        <button
          onClick={() => setFilter('mydoctors')}
          className={`px-4 py-2 rounded-lg font-semibold ${filter === 'mydoctors'
            ? 'bg-blue-700 text-white shadow'
            : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
          }`}
        >
          My Doctors
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold ${filter === 'all'
            ? 'bg-blue-700 text-white shadow'
            : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
          }`}
        >
          All Doctors
        </button>
        
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-md">
        <input
          type="text"
          placeholder="Search by name, specialty, department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-blue-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search doctors"
        />
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <p className="text-gray-500 text-center">No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`relative group bg-white p-6 rounded-2xl shadow-md border-2 transition
                ${doctor.status === 'current'
                  ? 'border-green-400 bg-green-50'
                  : doctor.status === 'consulted'
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200'} hover:shadow-xl`}
            >
              {/* Avatar */}
              <div className="flex items-center gap-3 mb-3">
                {doctor.avatarUrl ? (
                  <img
                    src={doctor.avatarUrl}
                    alt={doctor.name}
                    className="w-16 h-16 object-cover rounded-full border-2 border-blue-300 shadow"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xl">
                    <User className="h-10 w-10" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-blue-900">{doctor.name}</h3>
                    {doctor.status === 'current' && (
                      <span className="inline-flex items-center font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs ml-1">
                        <CheckCircle className="mr-1 h-4 w-4" /> Current
                      </span>
                    )}
                    {doctor.status === 'consulted' && (
                      <span className="inline-flex items-center font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs ml-1">
                        <Heart className="mr-1 h-4 w-4" /> Consulted
                      </span>
                    )}
                  </div>
                  <span className="block text-sm font-medium text-gray-500">{doctor.specialty}</span>
                  <span className="block text-xs text-gray-400">{doctor.department}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">{doctor.bio}</p>
              <div className="flex items-center mt-1 space-x-4">
                <a href={`tel:${doctor.phone}`} className="text-gray-500 flex items-center hover:text-blue-800 transition">
                  <Phone className="h-4 w-4 mr-1" /> {doctor.phone}
                </a>
                <a href={`mailto:${doctor.email}`} className="text-gray-500 flex items-center hover:text-blue-800 transition">
                  <Mail className="h-4 w-4 mr-1" /> Email
                </a>
              </div>
              <div className="mt-5 flex gap-2 justify-end">
                {/* <button
                  onClick={() => handleViewProfile(doctor.id)}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  View Profile
                </button> */}
                <button
                  onClick={() => handleBookAppointment(doctor.id)}
                  className="w-full px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDoctors;
