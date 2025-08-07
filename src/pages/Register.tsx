import React, { useState } from "react";
import {
  User,
  Calendar,
  Phone,
  Mail,
  Heart,
  Home,
  Hospital,
  UserPlus,
  Briefcase,
  MapPin,
  Lock,
  Shield,
  CheckCircle,
} from "lucide-react";

export default function RegistrationForm() {
  const [role, setRole] = useState("patient");

  const [form, setForm] = useState({
    // Shared
    email: "",
    password: "",
    confirmPassword: "",

    // Patient
    name: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    bloodGroup: "",
    allergies: "",
    emergencyContact: "",

    // Clinic
    clinicName: "",
    registrationId: "",
    contactPerson: "",
    clinicPhone: "",
    clinicAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInput = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    // Integrate backend registration API here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-4 py-10 transition-colors duration-200">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 px-8 py-9 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 justify-center">
          <UserPlus className="text-blue-600" size={28} />
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Register {role === "patient" ? "Patient" : "Clinic"}
          </h2>
        </div>

        {/* Role Switcher */}
        <div className="flex mb-7 gap-4 items-center justify-center font-semibold text-base">
          <button
            type="button"
            className={`px-6 py-2 rounded-xl transition ${
              role === "patient"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 text-blue-700 hover:bg-blue-50"
            }`}
            onClick={() => setRole("patient")}
          >
            Patient
          </button>
          <button
            type="button"
            className={`px-6 py-2 rounded-xl transition ${
              role === "clinic"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 text-purple-700 hover:bg-purple-50"
            }`}
            onClick={() => setRole("clinic")}
          >
            Clinic
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Fields */}
            {role === "patient" && (
              <>
                <LuxeInput
                  icon={<User />}
                  name="name"
                  label="Full Name"
                  value={form.name}
                  onChange={handleInput}
                  required
                />
                <LuxeInput
                  icon={<Calendar />}
                  name="dob"
                  label="Date of Birth"
                  value={form.dob}
                  onChange={handleInput}
                  required
                  type="date"
                />
                <LuxeSelect
                  icon={<User />}
                  name="gender"
                  label="Gender"
                  value={form.gender}
                  onChange={handleInput}
                  options={[
                    { value: "", label: "Select gender" },
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                  ]}
                  required
                />
                <LuxeInput
                  icon={<Phone />}
                  name="phone"
                  label="Mobile Number"
                  value={form.phone}
                  onChange={handleInput}
                  required
                  type="tel"
                />
                <LuxeInput
                  icon={<Heart />}
                  name="bloodGroup"
                  label="Blood Group"
                  value={form.bloodGroup}
                  onChange={handleInput}
                />
                <LuxeInput
                  icon={<Mail />}
                  name="email"
                  label="Email address"
                  value={form.email}
                  onChange={handleInput}
                  required
                  type="email"
                />
                <LuxeInput
                  icon={<Home />}
                  name="address"
                  label="Address"
                  value={form.address}
                  onChange={handleInput}
                  required
                />
                {/* Uncomment if allergies needed:
                <LuxeInput
                  icon={<Shield />}
                  name="allergies"
                  label="Known Allergies"
                  value={form.allergies}
                  onChange={handleInput}
                /> */}
                <LuxeInput
                  icon={<Phone />}
                  name="emergencyContact"
                  label="Emergency Contact"
                  value={form.emergencyContact}
                  onChange={handleInput}
                />
              </>
            )}

            {/* Clinic Fields */}
            {role === "clinic" && (
              <>
                <LuxeInput
                  icon={<Hospital />}
                  name="clinicName"
                  label="Clinic/Hospital Name"
                  value={form.clinicName}
                  onChange={handleInput}
                  required
                />
                <LuxeInput
                  icon={<Shield />}
                  name="registrationId"
                  label="Registration/License ID"
                  value={form.registrationId}
                  onChange={handleInput}
                  required
                />
                <LuxeInput
                  icon={<User />}
                  name="contactPerson"
                  label="Contact Person"
                  value={form.contactPerson}
                  onChange={handleInput}
                  required
                />
                <LuxeInput
                  icon={<Phone />}
                  name="clinicPhone"
                  label="Clinic Phone"
                  value={form.clinicPhone}
                  onChange={handleInput}
                  required
                  type="tel"
                />
                <LuxeInput
                  icon={<Mail />}
                  name="email"
                  label="Email address"
                  value={form.email}
                  onChange={handleInput}
                  required
                  type="email"
                />
                <LuxeInput
                  icon={<Home />}
                  name="clinicAddress"
                  label="Clinic Address"
                  value={form.clinicAddress}
                  onChange={handleInput}
                  required
                />
                <LuxeInput
                  icon={<MapPin />}
                  name="city"
                  label="City"
                  value={form.city}
                  onChange={handleInput}
                  required
                />
                <LuxeInput
                  icon={<Briefcase />}
                  name="state"
                  label="State"
                  value={form.state}
                  onChange={handleInput}
                  required
                />
                <LuxeInput
                  icon={<Home />}
                  name="pincode"
                  label="Pincode"
                  value={form.pincode}
                  onChange={handleInput}
                  required
                />
              </>
            )}

            {/* Common Fields */}
            <LuxeInput
              icon={<Lock />}
              name="password"
              label="Password"
              value={form.password}
              onChange={handleInput}
              required
              type="password"
              minLength={6}
            />
            <LuxeInput
              icon={<Lock />}
              name="confirmPassword"
              label="Confirm Password"
              value={form.confirmPassword}
              onChange={handleInput}
              required
              type="password"
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className={`w-full py-3 mt-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition ${
              submitted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
          >
            {submitted ? (
              <>
                <CheckCircle size={20} />
                Submitting...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                {role === "patient" ? "Register Patient" : "Register Clinic"}
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-7 text-gray-600 dark:text-gray-300 text-sm">
          Already registered?{" "}
          <a
            href="/login"
            className="text-blue-700 dark:text-blue-400 font-semibold hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

function LuxeInput({ icon, label, ...props }) {
  return (
    <label className="flex items-center relative gap-2 my-1 w-full">
      <span className="absolute left-3 text-blue-400">{icon}</span>
      <input
        className="w-full rounded-lg pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition outline-none"
        placeholder={label}
        {...props}
      />
    </label>
  );
}

function LuxeSelect({ icon, label, options, ...props }) {
  return (
    <label className="flex items-center relative gap-2 my-1 w-full">
      <span className="absolute left-3 text-blue-400">{icon}</span>
      <select
        className="w-full rounded-lg pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition outline-none"
        {...props}
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            disabled={opt.value === ""}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
