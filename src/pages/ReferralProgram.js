import React, { useState } from 'react';
import { t } from '../i18n/i18n';

function ReferralProgram({ lang = 'en' }) {
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}/register?ref=${localStorage.getItem('user_id') || 'demo'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">{t('referral', lang)}</h1>
        <p className="mb-4">{t('referralDescription', lang)}</p>
        <div className="mb-4">
          <input type="text" value={referralLink} readOnly className="input w-full mb-2" />
          <button className="button" onClick={handleCopy}>{copied ? 'Copied!' : t('inviteFriends', lang)}</button>
        </div>
      </div>
    </div>
  );
}

export default ReferralProgram;
