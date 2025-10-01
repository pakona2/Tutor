import React from 'react';

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300">Terms and Conditions</h1>
        <p className="mb-4">By registering and using MyTeacher App, you agree to the following terms and conditions:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>You will provide accurate information during registration.</li>
          <li>You are responsible for maintaining the confidentiality of your account.</li>
          <li>Sessions must be conducted respectfully and professionally.</li>
          <li>Payments and refunds are subject to platform policies.</li>
          <li>Misuse of the platform may result in account suspension.</li>
          <li>All communication should comply with applicable laws and regulations.</li>
        </ul>
        <p className="mt-8">For questions, contact <a href="mailto:support@myteacherapp.com" className="text-blue-600 dark:text-blue-400 underline">support@myteacherapp.com</a></p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
