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

  // Social share URLs
  const encodedLink = encodeURIComponent(referralLink);
  const whatsappUrl = `https://wa.me/?text=${encodedLink}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
  const instagramUrl = `https://www.instagram.com/?url=${encodedLink}`; // Instagram does not support direct sharing, but this opens Instagram

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">{t('referral', lang)}</h1>
        <p className="mb-4">{t('referralDescription', lang)}</p>
        <div className="mb-4">
          <input type="text" value={referralLink} readOnly className="input w-full mb-2" />
          <button className="button" onClick={handleCopy} style={{marginRight:8}}>{copied ? 'Copied!' : t('inviteFriends', lang)}</button>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button" style={{background:'#25D366',color:'#fff',marginRight:8}}>Share on WhatsApp</a>
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="button" style={{background:'#4267B2',color:'#fff',marginRight:8}}>Share on Facebook</a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="button" style={{background:'#E1306C',color:'#fff'}}>Share on Instagram</a>
        </div>
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg text-blue-800 dark:text-blue-200 font-semibold text-center">
          <span>After sharing, you and your friend will each receive a free session credit when your friend registers using your link!</span>
        </div>
      </div>
    </div>
  );
}

export default ReferralProgram;
