import React, { useState } from "react";
import {
  User, Mail, Phone, Globe, Sun, Moon, Shield, CreditCard, Bell, Lock, LogOut, Trash,
  ChevronDown, ChevronUp, Languages, Info, MessageCircle, Calendar, MapPin, Briefcase, Home, Heart, Edit, CheckCircle
} from "lucide-react";

// Mock language and user data
const LANGS = [{ code: "en", label: "English" }, { code: "ta", label: "தமிழ் (Tamil)" }];
const mockUser = {
  name: "Ajith Kumar",
  avatar: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
  dob: "1995-06-15",
  gender: "Male",
  marital: "Single",
  profession: "Software Engineer",
  email: "ajith.kumar@email.com",
  phone: "+91 9876543210",
  address: "14, 2nd Cross, Anna Nagar, Chennai, India",
  city: "Chennai",
  state: "Tamil Nadu",
  pincode: "600102",
  country: "India",
  whatsapp: "+91 9876543210",
  emergencyContact: "+91 9988776655",
  allergies: "Peanuts, Penicillin",
  bloodGroup: "O+",
  chronic: "Hypertension",
  medicalNotes: "Has mild asthma; last checkup July 2023.",
  organDonor: true,
  card: "**** 4321",
  upi: "arun@ybl",
  wallet: "Paytm",
};

export default function EliteProfileSettings() {
  const [open, setOpen] = useState({ personal: false, contact: false, preferences: false, medical: false, payment: false, notify: false, password: false, policy: false,});
  const [profile, setProfile] = useState(mockUser);
  const [lang, setLang] = useState("en");
  const [mode, setMode] = useState("light");
  const [waNotif, setWaNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [appNotif, setAppNotif] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Simulate completeness
  const completeness = 85;

  // Section toggler
  const toggle = (k) => setOpen(prev => ({ ...prev, [k]: !prev[k] }));

  // Quick actions for elite look
  const quickActions = [
    { icon: <CreditCard className="text-cyan-600" />, label: "Add Payment", onClick: () => alert("Add Payment") },
    { icon: <Lock className="text-yellow-600" />, label: "Change Password", onClick: () => alert("Change Password") },
    { icon: <Bell className="text-pink-500" />, label: "Notification Settings", onClick: () => setOpen(o => ({ ...o, notify: true })) },
    { icon: <User className="text-violet-600" />, label: "Edit Profile", onClick: () => setOpen(o => ({ ...o, personal: true })) },
  ];

  return (
    <div className="min-h-screen py-0 pb-12 px-0 bg-gradient-to-bl from-[#eaf0ff] via-[#f8fafc] to-[#f4f4fa] font-sans flex flex-col items-center">
      {/* Hero profile panel */}
      <div className="w-full bg-white shadow-lg rounded-b-[2.5rem] px-6 md:px-12 pt-10 pb-8 mb-10 relative">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <img src={profile.avatar} alt="User" className="w-28 h-28 rounded-full shadow-lg border-4 border-white object-cover" />
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{profile.name}</h2>
            <p className="text-lg text-gray-600 mt-1">Welcome back! Securely manage your profile and health information below.</p>
            <div className="flex items-center gap-4 mt-2">
              <CheckCircle className="text-green-600" />
              <span className="text-green-700 font-medium text-base">Verified Account</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => setShowLogout(true)} className="bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-lg font-semibold flex items-center text-gray-700 gap-2 shadow-sm">
              <LogOut size={20} /> Logout
            </button>
            <button onClick={() => setShowDelete(true)} className="bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-lg font-semibold flex items-center text-white gap-2 shadow-sm">
              <Trash size={20} /> Delete
            </button>
          </div>
        </div>
        {/* Profile completeness */}
        <div className="w-full max-w-xl mx-auto mt-6">
          <p className="text-gray-800 font-semibold mb-1 text-center md:text-left">Profile completeness <span className="text-gray-500 font-normal">({completeness}%)</span></p>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400" style={{width: `${completeness}%`}} />
          </div>
          {completeness < 100 && (
            <p className="text-sm text-blue-600 mt-1 font-medium text-center md:text-left">Add missing details for enhanced security and personalized care!</p>
          )}
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="w-full max-w-3xl mb-8 px-2">
        <div className="flex items-center rounded-xl shadow-sm bg-white py-5 px-4 flex-wrap justify-between gap-2 md:gap-8 select-none">
          {quickActions.map(a => (
            <button
              key={a.label}
              onClick={a.onClick}
              className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium bg-gray-50 hover:bg-blue-50 transition shadow-sm text-gray-600 hover:text-blue-700"
            >
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section Cards */}
      <main className="w-full max-w-3xl mx-auto space-y-7 px-2">
        {/* PERSONAL INFO */}
        <EliteSectionCard open={open.personal} onToggle={() => toggle("personal")} icon={<User className="text-blue-600" />} label="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <EliteItem label="Name" value={profile.name} />
            <EliteItem label="Date of Birth" value={profile.dob} icon={<Calendar className="text-blue-400" size={16} />} />
            <EliteItem label="Gender" value={profile.gender} />
            <EliteItem label="Marital Status" value={profile.marital} />
            <EliteItem label="Profession" value={profile.profession} icon={<Briefcase className="text-purple-400" size={16} />} />
          </div>
        </EliteSectionCard>

        {/* CONTACT DETAILS */}
        <EliteSectionCard open={open.contact} onToggle={() => toggle("contact")} icon={<Mail className="text-blue-600" />} label="Contact Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <EliteItem label="Email" value={profile.email} />
            <EliteItem label="Phone" value={profile.phone} icon={<Phone className="text-green-400" size={16} />} />
            <EliteItem label="WhatsApp" value={profile.whatsapp} icon={<MessageCircle className="text-green-400" size={16} />} />
            <EliteItem label="Emergency Contact" value={profile.emergencyContact} />
            <EliteItem label="Address" value={profile.address} icon={<Home className="text-yellow-400" size={16} />} />
            <EliteItem label="City" value={profile.city} />
            <EliteItem label="State" value={profile.state} />
            <EliteItem label="Pincode" value={profile.pincode} />
            <EliteItem label="Country" value={profile.country} />
          </div>
        </EliteSectionCard>

        {/* PREFERENCES */}
        <EliteSectionCard open={open.preferences} onToggle={() => toggle("preferences")} icon={<Globe className="text-blue-600" />} label="Preferences">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <EliteLabelWithIcon icon={<Languages />} label="Language">
              {LANGS.map(l => (
                <button key={l.code} className={`mr-2 px-4 py-2 rounded-lg border ${lang === l.code ? "bg-blue-600 text-white border-blue-600 font-semibold" : "bg-white hover:bg-blue-50 text-gray-900 border-gray-300"}`} onClick={() => setLang(l.code)}>
                  {l.label}
                </button>
              ))}
            </EliteLabelWithIcon>
            <EliteLabelWithIcon icon={mode === "light" ? <Sun /> : <Moon />} label="App Theme">
              <button
                onClick={() => setMode(m => (m === "light" ? "dark" : "light"))}
                className={`px-4 py-2 rounded-lg font-semibold border transition ${mode === "light" ? "bg-gray-100 text-blue-700 border-gray-200" : "bg-gray-900 text-yellow-300 border-gray-800"}`}>
                {mode === "light" ? "Light Mode" : "Dark Mode"}
              </button>
            </EliteLabelWithIcon>
          </div>
        </EliteSectionCard>

        {/* MEDICAL INFORMATION */}
        <EliteSectionCard open={open.medical} onToggle={() => toggle("medical")} icon={<Shield className="text-blue-600" />} label="Medical Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <EliteItem label="Blood Group" value={profile.bloodGroup} />
            <EliteItem label="Allergies" value={profile.allergies} />
            <EliteItem label="Chronic Conditions" value={profile.chronic} />
            <EliteItem label="Medical Notes" value={profile.medicalNotes} />
            <EliteItem label="Organ Donor" value={profile.organDonor ? "Yes (Registered)" : "No"} icon={<Heart className="text-red-500" size={16} />} />
          </div>
        </EliteSectionCard>

        {/* PAYMENT METHODS */}
        <EliteSectionCard open={open.payment} onToggle={() => toggle("payment")} icon={<CreditCard className="text-blue-600" />} label="Payment Methods">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <EliteItem label="Primary Card" value={profile.card} />
            <EliteItem label="UPI ID" value={profile.upi} />
            <EliteItem label="Wallet" value={profile.wallet} />
            <div>
              <button className="mt-2 px-4 py-2 rounded-lg bg-cyan-600 text-white font-medium hover:bg-cyan-700 shadow">Manage Payments</button>
            </div>
          </div>
        </EliteSectionCard>

        {/* NOTIFICATION PREFERENCES */}
        <EliteSectionCard open={open.notify} onToggle={() => toggle("notify")} icon={<Bell className="text-blue-600" />} label="Notification Preferences">
          <div className="space-y-3 max-w-md mx-auto">
            <EliteToggle label="Email Notifications" value={emailNotif} onToggle={() => setEmailNotif(v => !v)} />
            <EliteToggle label="App Notifications" value={appNotif} onToggle={() => setAppNotif(v => !v)} />
            <EliteToggle
              label={<span>WhatsApp Notifications <span className="text-xs text-green-700">(to {profile.whatsapp})</span></span>}
              value={waNotif} onToggle={() => setWaNotif(v => !v)}
              icon={<MessageCircle size={18} />}
              highlight={waNotif}
            />
          </div>
        </EliteSectionCard>

        {/* PASSWORD MANAGING */}
        <EliteSectionCard open={open.password} onToggle={() => toggle("password")} icon={<Lock className="text-blue-600" />} label="Password & Security">
          <div className="space-y-4 md:w-2/3">
            <button className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 w-full shadow">Change Password</button>
            <button className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold border border-gray-400 hover:bg-gray-400 w-full shadow">Setup 2-factor Authentication</button>
            <p className="text-gray-500 text-sm mt-1">Strong passwords and 2FA help secure your account.</p>
          </div>
        </EliteSectionCard>

        {/* POLICIES */}
        <EliteSectionCard open={open.policy} onToggle={() => toggle("policy")} icon={<Info className="text-blue-600" />} label="Policies">
          <div className="flex flex-col gap-2 text-lg font-medium">
            <a href="#" className="hover:underline text-blue-700">Privacy Policy</a>
            <a href="#" className="hover:underline text-blue-700">Terms of Service</a>
            <a href="#" className="hover:underline text-blue-700">Data Usage</a>
          </div>
        </EliteSectionCard>

        {/* LOGOUT & DELETE ACCOUNT - MOBILE/Bottom bar for all screens */}
        <div className="flex flex-col md:flex-row gap-8 mt-14 w-full">
          <EliteActionCard icon={<LogOut className="text-gray-700" size={30}/>} label="Logout" color="bg-gray-100" onClick={() => setShowLogout(true)} />
          <EliteActionCard icon={<Trash className="text-white" size={30}/>} label="Delete Account" color="bg-gradient-to-br from-red-500 to-red-700" textColor="text-white" onClick={() => setShowDelete(true)} />
        </div>

        {showLogout && (
          <EliteModal
            title="Log Out"
            message="Are you sure you want to log out?"
            onClose={() => setShowLogout(false)}
            onConfirm={() => alert('Logged out!')}
            confirmText="Log Out"
          />
        )}
        {showDelete && (
          <EliteModal
            title="Delete Account"
            message="This action is irreversible. Your data will be permanently deleted. Are you sure?"
            onClose={() => setShowDelete(false)}
            onConfirm={() => alert('Account deleted!')}
            confirmText="Delete"
            danger
          />
        )}
      </main>
    </div>
  );
}


// SECTION CARD
function EliteSectionCard({ open, onToggle, icon, label, children }) {
  return (
    <div className="rounded-2xl shadow-xl bg-white ring-2 ring-blue-50 mb-1 overflow-hidden">
      <button
        className="flex w-full items-center px-7 py-6 text-xl font-bold text-gray-800 hover:bg-blue-50 rounded-t-2xl group transition select-none"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="mr-4">{icon}</span>
        <span>{label}</span>
        <span className="ml-auto text-gray-400 group-hover:text-blue-400">
          {open ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>
      {open && (
        <div className="px-8 pb-8 pt-3 text-lg">{children}</div>
      )}
    </div>
  );
}

// ITEM ROW with possible icon
function EliteItem({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-100 py-3 min-h-[48px]">
      <span className="w-44 text-gray-600 flex items-center gap-1 font-medium">
        {icon}
        {label}
      </span>
      <span className="text-gray-900 font-semibold flex-1">{value}</span>
      <button
        className="ml-auto text-blue-600 hover:bg-blue-100 transition p-1 rounded-md"
        onClick={() => alert(`Edit: ${label}`)}
        title={`Edit ${label}`}
      >
        <Edit size={18} />
      </button>
    </div>
  );
}

// LABEL WITH ICON for settings sections
function EliteLabelWithIcon({ icon, label, children }) {
  return (
    <div className="flex items-center gap-4 min-h-[44px]">
      <span className="text-blue-600">{icon}</span>
      <span className="w-40 text-gray-600 font-semibold">{label}</span>
      <span className="ml-2 flex-1">{children}</span>
    </div>
  );
}

// Toggle switch
function EliteToggle({ label, value, onToggle, icon, highlight }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="flex-1 font-medium text-gray-800">{label}</span>
      <button
        onClick={onToggle}
        className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors shadow ${value ? (highlight ? "bg-green-500" : "bg-blue-500") : "bg-gray-300"}`}
        tabIndex={0}
        aria-checked={!!value}
        role="switch"
      >
        <span
          className={`inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform ${value ? "translate-x-6" : ""}`}
        />
      </button>
    </div>
  );
}

// Elite Action card for logout/delete
function EliteActionCard({ icon, label, color, textColor = "text-gray-800", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 min-w-[200px] flex flex-col items-center justify-center text-xl font-bold py-7 rounded-2xl shadow-lg transition hover:scale-105 ${color} ${textColor}`}
    >
      {icon}
      <span className="mt-3">{label}</span>
    </button>
  );
}

// Modal for confirmations
function EliteModal({ title, message, onClose, onConfirm, confirmText, danger }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h3 className="text-3xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-lg"
          >Cancel</button>
          <button
            onClick={() => { onClose(); onConfirm && onConfirm(); }}
            className={`flex-1 py-3 rounded font-bold text-lg ${
              danger
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
