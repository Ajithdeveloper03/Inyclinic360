import React, { useState } from 'react';
import {
  FileText,
  Download,
  AlertTriangle,
  HelpCircle,
  Trash,
  Plus,
  ChevronLeft,
} from 'lucide-react';

const sampleInvoices = [
  {
    id: 1,
    date: '2024-10-05',
    amount: 10,
    status: 'Paid',
    downloadLink: '#',
  },
  {
    id: 2,
    date: '2024-09-05',
    amount: 10,
    status: 'Paid',
    downloadLink: '#',
  },
  {
    id: 3,
    date: '2024-08-05',
    amount: 20,
    status: 'Refunded',
    downloadLink: '#',
  },
];

const sampleRefundRequests = [
  {
    id: 1,
    invoiceId: 3,
    dateRequested: '2024-08-10',
    status: 'Completed',
  },
  {
    id: 2,
    invoiceId: 4,
    dateRequested: '2024-10-01',
    status: 'Failed',
  },
];

const Billing = () => {
  const [showQueryBox, setShowQueryBox] = useState(false);
  const [billingQuery, setBillingQuery] = useState('');
  const [submittedQueries, setSubmittedQueries] = useState([]);
  const [activeTab, setActiveTab] = useState('summary');

  // Handler for billing query submission
  const handleQuerySubmit = () => {
    if (billingQuery.trim() === '') {
      alert('Please enter your billing query');
      return;
    }
    setSubmittedQueries([
      ...submittedQueries,
      { id: submittedQueries.length + 1, text: billingQuery, date: new Date().toLocaleString() },
    ]);
    setBillingQuery('');
    setShowQueryBox(false);
    alert('Your billing query has been submitted');
  };

  // Calculate summary info from invoices
  const totalBilled = sampleInvoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2);
  const totalRefunded = sampleInvoices
    .filter(inv => inv.status === 'Refunded')
    .reduce((sum, inv) => sum + inv.amount, 0)
    .toFixed(2);
  const latestInvoiceDate = sampleInvoices.length > 0 ? sampleInvoices[0].date : 'N/A';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 font-sans flex flex-col items-center py-12 px-6">
      <main className="w-full max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="text-blue-600" size={40} />
            <h1 className="text-3xl font-extrabold text-gray-900">Billing Summary</h1>
          </div>
          <p className="text-gray-700 text-lg max-w-2xl">
            Manage your billing information, invoices, refund requests, and support queries.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-10 flex border-b border-gray-300 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50">
          {['summary', 'invoices', 'refunds', 'queries'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-8 whitespace-nowrap font-semibold text-base border-b-4 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-gray-600 hover:text-blue-600'
              }`}
              aria-current={activeTab === tab ? 'page' : undefined}
            >
              {tab === 'summary' && 'Summary'}
              {tab === 'invoices' && 'Invoices'}
              {tab === 'refunds' && 'Refunds / Payment Issues'}
              {tab === 'queries' && 'Billing Queries'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <section>
          {activeTab === 'summary' && (
            <div className="bg-white rounded-xl shadow-lg p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div className="bg-blue-50 rounded-xl p-8 shadow-inner">
                  <p className="text-sm text-gray-500 mb-2">Total Billed</p>
                  <p className="text-4xl font-bold text-blue-700">₹{totalBilled}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-8 shadow-inner">
                  <p className="text-sm text-gray-500 mb-2">Total Refunded</p>
                  <p className="text-4xl font-bold text-green-700">₹{totalRefunded}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-8 shadow-inner">
                  <p className="text-sm text-gray-500 mb-2">Latest Invoice</p>
                  <p className="text-4xl font-bold text-purple-700">{latestInvoiceDate}</p>
                </div>
              </div>

              <p className="text-center text-gray-600 text-lg italic mt-6 max-w-xl mx-auto">
                Keep your billing info up to date to avoid any service interruptions.
              </p>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="bg-white rounded-xl shadow-lg p-8 max-h-[600px] overflow-y-auto">
              {sampleInvoices.length === 0 ? (
                <p className="text-gray-600 text-center text-lg">No invoices available.</p>
              ) : (
                <div className="space-y-6">
                  {sampleInvoices.map(inv => (
                    <div
                      key={inv.id}
                      className="flex items-center justify-between border border-gray-300 rounded-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="space-y-1">
                        <p className="font-semibold text-lg text-gray-900">Invoice #{inv.id}</p>
                        <p className="text-sm text-gray-600">Date: {inv.date}</p>
                        <p className="text-sm text-gray-600">Amount: ₹{inv.amount.toFixed(2)}</p>
                        <p
                          className={`text-sm mt-1 font-semibold ${
                            inv.status === 'Paid'
                              ? 'text-green-600'
                              : inv.status === 'Refunded'
                              ? 'text-blue-600'
                              : 'text-red-600'
                          }`}
                        >
                          Status: {inv.status}
                        </p>
                      </div>
                      <a
                        href={inv.downloadLink}
                        download
                        className="flex items-center space-x-3 text-blue-600 hover:text-blue-800"
                        title={`Download Invoice #${inv.id}`}
                      >
                        <Download size={24} />
                        <span className="underline font-semibold text-lg">Download</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'refunds' && (
            <div className="bg-white rounded-xl shadow-lg p-8 max-h-[600px] overflow-y-auto space-y-6">
              {sampleRefundRequests.length === 0 ? (
                <p className="text-gray-600 text-center text-lg">No refund requests or failed payments.</p>
              ) : (
                sampleRefundRequests.map(req => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between border border-gray-300 rounded-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="space-y-1 max-w-[70%]">
                      <p className="font-semibold text-lg text-gray-900">Refund Request #{req.id}</p>
                      <p className="text-sm text-gray-600">Invoice #{req.invoiceId}</p>
                      <p className="text-sm text-gray-600">Requested on: {req.dateRequested}</p>
                      <p
                        className={`text-sm font-semibold mt-1 ${
                          req.status === 'Completed'
                            ? 'text-green-600'
                            : req.status === 'Failed'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        Status: {req.status}
                      </p>
                    </div>
                    {req.status === 'Failed' && (
                      <AlertTriangle
                        className="text-red-600"
                        size={28}
                        title="Failed refund"
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'queries' && (
            <div className="bg-white rounded-xl shadow-lg p-8 max-h-[600px] flex flex-col">
              <div className="mb-8 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Billing Queries</h2>
                {!showQueryBox && (
                  <button
                    onClick={() => setShowQueryBox(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-3 transition-transform hover:scale-105"
                  >
                    <Plus size={22} />
                    <span>Raise a Billing Query</span>
                  </button>
                )}
              </div>

              {showQueryBox && (
                <div className="w-full max-w-4xl mx-auto">
                  <textarea
                    rows={5}
                    placeholder="Describe your billing issue or question here..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-800 text-lg"
                    value={billingQuery}
                    onChange={e => setBillingQuery(e.target.value)}
                    autoFocus
                  />
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      onClick={() => {
                        setShowQueryBox(false);
                        setBillingQuery('');
                      }}
                      className="py-3 px-7 rounded-lg border border-gray-300 hover:border-gray-400 font-semibold text-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleQuerySubmit}
                      className="py-3 px-7 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Submit Query
                    </button>
                  </div>
                </div>
              )}

              {!showQueryBox && (
                <div className="flex-1 overflow-y-auto pt-4">
                  {submittedQueries.length === 0 ? (
                    <p className="text-gray-600 text-center text-lg mt-12">
                      No billing queries submitted yet. Need help? Raise one above.
                    </p>
                  ) : (
                    <ul className="space-y-5">
                      {submittedQueries.map(q => (
                        <li
                          key={q.id}
                          className="border border-gray-300 rounded-lg p-6 bg-blue-50 hover:bg-blue-100 transition-color"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <p className="text-gray-900 text-lg font-medium break-words">{q.text}</p>
                            <button
                              onClick={() =>
                                setSubmittedQueries(submittedQueries.filter(sq => sq.id !== q.id))
                              }
                              className="text-red-600 hover:text-red-800 transition-colors flex-shrink-0"
                              title="Delete query"
                            >
                              <Trash size={20} />
                            </button>
                          </div>
                          <p className="text-xs italic text-gray-600">Submitted on: {q.date}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Helpdesk box */}
              {!showQueryBox && (
                <div className="mt-8 bg-blue-50 rounded-lg p-6 flex items-center space-x-4 text-blue-800 text-lg font-semibold max-w-4xl mx-auto border border-blue-200 shadow">
                  <HelpCircle size={30} />
                  <p>
                    For immediate assistance, please contact our{' '}
                    <a
                      href="mailto:support@healthapp.com"
                      className="underline hover:text-blue-900"
                    >
                      billing support team
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Billing;
