import React from 'react';

function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300">Help Center</h1>
        <p className="mb-4">Welcome to the Help Center! Here you can find answers to common questions and get support.</p>
        <ul className="list-disc pl-6 mb-6">
          <li>How do I book a session?</li>
          <li>How do I reset my password?</li>
          <li>How do I contact my tutor?</li>
          <li>How do I update my profile?</li>
          <li>How do I pay for a session?</li>
        </ul>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Need more help?</h2>
          <p>Email us at <a href="mailto:support@myteacherapp.com" className="text-blue-600 dark:text-blue-400 underline">support@myteacherapp.com</a></p>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
