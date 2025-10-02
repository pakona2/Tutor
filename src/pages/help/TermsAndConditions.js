import React from 'react';

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-10">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-700 dark:text-blue-300 text-center">Terms and Conditions</h1>
        <p className="mb-6 text-lg text-center">
          By registering and using <strong>MyTeacher App</strong>, you agree to the following terms and conditions. These terms govern your use of the platform as a tutor or student and ensure a safe, respectful, and professional learning environment.
        </p>

        <div className="space-y-6 text-base leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">1. Accurate Information</h2>
            <p>You agree to provide truthful, complete, and up-to-date information during registration and while using the platform.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">2. Account Security</h2>
            <p>You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">3. Professional Conduct</h2>
            <p>All sessions must be conducted respectfully, ethically, and professionally. Harassment, discrimination, or inappropriate behavior will not be tolerated.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">4. Payment & Refunds</h2>
            <p>Payments for sessions must be made through approved methods. Refunds are subject to platform policies and may require review by the support team.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">5. Platform Misuse</h2>
            <p>Any misuse of the app—including spamming, impersonation, or fraudulent activity—may result in suspension or termination of your account.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">6. Legal Compliance</h2>
            <p>All communication and content shared on the platform must comply with applicable laws, including data protection, copyright, and anti-harassment regulations.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">7. Session Cancellations</h2>
            <p>Tutors and students must adhere to the cancellation policy. Late cancellations or no-shows may incur penalties or affect your reputation score.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">8. Intellectual Property</h2>
            <p>Content uploaded or shared by tutors (e.g., tutorials, notes) remains their intellectual property unless otherwise agreed. Unauthorized use is prohibited.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">9. Platform Updates</h2>
            <p>MyTeacher App reserves the right to update features, policies, or terms at any time. Continued use of the app implies acceptance of these changes.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">10. Support & Disputes</h2>
            <p>For any issues, users should contact support. Disputes will be handled in accordance with platform procedures and may involve mediation or review.</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-lg font-medium mb-2">Need assistance?</h2>
          <p>
            Email us at{' '}
            <a
              href="mailto:support@myteacherapp.com"
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
            >
              support@myteacherapp.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
