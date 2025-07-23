import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Shield, FileText, DollarSign, Clock, CheckCircle, AlertCircle, Upload, Download } from 'lucide-react';

const InsurancePage = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const insuranceInfo = {
    provider: 'Blue Cross Blue Shield',
    policyNumber: 'BCBS-123456789',
    groupNumber: 'GRP-987654',
    memberID: 'MEM-456789123',
    effectiveDate: '2024-01-01',
    expirationDate: '2024-12-31',
    copay: '$25',
    deductible: '$1,500',
    deductibleMet: '$750',
    outOfPocketMax: '$5,000',
    outOfPocketMet: '$1,200'
  };

  const claims = [
    { id: 1, date: '2024-11-28', provider: 'Dr. Sarah Johnson', service: 'Cardiology Consultation', amount: '$350.00', covered: '$280.00', status: 'approved', claimNumber: 'CLM-001' },
    { id: 2, date: '2024-11-15', provider: 'City Lab', service: 'Blood Work', amount: '$125.00', covered: '$100.00', status: 'approved', claimNumber: 'CLM-002' },
    { id: 3, date: '2024-10-30', provider: 'Dr. Michael Brown', service: 'Orthopedic Consultation', amount: '$275.00', covered: '$220.00', status: 'pending', claimNumber: 'CLM-003' },
    { id: 4, date: '2024-10-15', provider: 'Pharmacy Plus', service: 'Prescription Medication', amount: '$85.00', covered: '$68.00', status: 'approved', claimNumber: 'CLM-004' }
  ];

  const benefits = [
    { category: 'Primary Care', coverage: '100%', copay: '$25', notes: 'After copay' },
    { category: 'Specialist Care', coverage: '80%', copay: '$50', notes: 'After deductible' },
    { category: 'Emergency Room', coverage: '80%', copay: '$200', notes: 'After deductible' },
    { category: 'Prescription Drugs', coverage: '80%', copay: 'Varies', notes: 'Generic preferred' },
    { category: 'Lab Tests', coverage: '100%', copay: '$0', notes: 'In-network only' },
    { category: 'Imaging (X-ray, MRI)', coverage: '80%', copay: '$100', notes: 'Pre-authorization required' }
  ];

  const preAuthorizations = [
    { id: 1, service: 'MRI Scan', provider: 'Imaging Center', requestDate: '2024-12-10', status: 'approved', validUntil: '2024-12-31' },
    { id: 2, service: 'Physical Therapy', provider: 'Rehab Clinic', requestDate: '2024-12-05', status: 'pending', validUntil: 'N/A' },
    { id: 3, service: 'Specialist Referral', provider: 'Dr. Wilson', requestDate: '2024-11-28', status: 'approved', validUntil: '2025-01-28' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'denied': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'denied': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Insurance & Benefits
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your insurance coverage and claims
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Documents</span>
            </button>
          </div>
        </div>

        {/* Insurance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8" />
              <div>
                <h2 className="text-xl font-bold">{insuranceInfo.provider}</h2>
                <p className="text-blue-100">Health Insurance</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Member ID</p>
              <p className="font-mono text-lg">{insuranceInfo.memberID}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-blue-100">Policy Number</p>
              <p className="font-mono">{insuranceInfo.policyNumber}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Group Number</p>
              <p className="font-mono">{insuranceInfo.groupNumber}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Effective Date</p>
              <p>{insuranceInfo.effectiveDate}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Copay</p>
              <p className="text-lg font-bold">{insuranceInfo.copay}</p>
            </div>
          </div>
        </div>

        {/* Coverage Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Deductible</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${insuranceInfo.deductibleMet}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">of {insuranceInfo.deductible}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Out-of-Pocket</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${insuranceInfo.outOfPocketMet}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">of {insuranceInfo.outOfPocketMax}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Claims This Year</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">11 approved</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Coverage Level</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">Gold</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">Premium plan</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              selectedTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Benefits Overview
          </button>
          <button
            onClick={() => setSelectedTab('claims')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              selectedTab === 'claims'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Claims History
          </button>
          <button
            onClick={() => setSelectedTab('preauth')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              selectedTab === 'preauth'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Pre-Authorizations
          </button>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Benefits Coverage
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Service Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Coverage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Copay
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {benefits.map((benefit, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {benefit.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {benefit.coverage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {benefit.copay}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {benefit.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'claims' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Claims History
                </h2>
                <button className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium flex items-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Covered
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {claims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {claim.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {claim.provider}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {claim.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {claim.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                        {claim.covered}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(claim.status)}`}>
                            {getStatusIcon(claim.status)}
                            <span className="ml-1">{claim.status}</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'preauth' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Pre-Authorizations
                </h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                  Request Authorization
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {preAuthorizations.map((auth) => (
                  <div
                    key={auth.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {auth.service}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {auth.provider} • Requested: {auth.requestDate}
                      </p>
                      {auth.validUntil !== 'N/A' && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Valid until: {auth.validUntil}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(auth.status)}`}>
                        {getStatusIcon(auth.status)}
                        <span className="ml-1">{auth.status}</span>
                      </span>
                      <button className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InsurancePage;