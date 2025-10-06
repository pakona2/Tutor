import React, { useEffect, useState } from 'react';
import { t } from '../i18n/i18n';
import ReferralQR from './ReferralQR';
//import { t } from './translations'; // adjust path to your i18n module

function useLocalUserId() {
  // Reasonable assumption for demo: read from localStorage or create demo id
  const [id] = useState(() => localStorage.getItem('user_id') || (() => {
    const demoId = 'demo-' + Math.random().toString(36).slice(2, 9);
    localStorage.setItem('user_id', demoId);
    return demoId;
  })());
  return id;
}

function ReferralProgram({ lang = 'en' }) {
  const userId = useLocalUserId();
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [referrals, setReferrals] = useState(() => {
    // Example stored referral history structure: [{id, name, email, date, rewarded}]
    try {
      const raw = localStorage.getItem('referral_history');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const referralLink = `${window.location.origin}/register?ref=${encodeURIComponent(userId)}`;
  const encodedLink = encodeURIComponent(referralLink);

  // Social share URLs
  const whatsappUrl = `https://wa.me/?text=${encodedLink}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(t('shareTweet', lang) + ' ' + referralLink)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;

  useEffect(() => {
    localStorage.setItem('referral_history', JSON.stringify(referrals));
  }, [referrals]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select the input text and alert
      const input = document.getElementById('referral-input');
      if (input) {
        input.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const openShareWindow = (url, width = 600, height = 600) => {
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    window.open(url, '_blank', `toolbar=0,status=0,resizable=1,width=${width},height=${height},top=${top},left=${left}`);
  };

  const handleAddReferralDemo = () => {
    const newRef = {
      id: Math.random().toString(36).slice(2, 9),
      name: 'New Friend',
      email: `friend+${referrals.length + 1}@example.com`,
      date: new Date().toISOString(),
      rewarded: false
    };
    setReferrals([newRef, ...referrals]);
  };

  const markRewarded = (id) => {
    setReferrals(referrals.map(r => r.id === id ? { ...r, rewarded: true } : r));
  };

  const qrSvgUrl = `https://chart.googleapis.com/chart?cht=qr&chs=220x220&chl=${encodedLink}&choe=UTF-8`;

  const handleSendViaEmail = () => {
    const subject = encodeURIComponent(t('emailSubject', lang));
    const body = encodeURIComponent(`${customMessage || t('emailBody', lang)}\n\n${referralLink}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">{t('referral', lang)}</h1>

        <p className="mb-6 text-sm text-gray-700 dark:text-gray-300">{t('referralDescription', lang)}</p>

        <div className="mb-4">
          <label className="block text-xs font-semibold mb-2">{t('yourReferralLink', lang)}</label>
          <div className="flex gap-2 items-center">
            <input
              id="referral-input"
              type="text"
              value={referralLink}
              readOnly
              className="w-full p-3 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded text-sm font-semibold"
              style={{ background: '#6366f1', color: '#fff' }}
            >
              {copied ? t('copied', lang) : t('copy', lang)}
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <a className="inline-flex items-center gap-2 px-4 py-2 rounded text-white text-sm" href={whatsappUrl} target="_blank" rel="noreferrer" style={{ background: '#25D366' }}>
            WhatsApp
          </a>
          <button className="px-4 py-2 rounded text-sm text-white" onClick={() => openShareWindow(facebookUrl)} style={{ background: '#4267B2' }}>
            Facebook
          </button>
          {/*<button className="px-4 py-2 rounded text-sm text-white" onClick={() => openShareWindow(twitterUrl)} style={{ background: '#1DA1F2' }}>
            Twitter
          </button>
          <button className="px-4 py-2 rounded text-sm text-white" onClick={() => openShareWindow(linkedInUrl)} style={{ background: '#0A66C2' }}>
            LinkedIn
          </button>*/}
          <button className="px-4 py-2 rounded text-sm bg-gray-200 dark:bg-gray-700" onClick={() => setShowModal(true)}>
            {t('sendEmail', lang)}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="mb-3 font-semibold">{t('howItWorksTitle', lang)}</div>
            <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <li>• {t('howItWorks1', lang)}</li>
              <li>• {t('howItWorks2', lang)}</li>
              <li>• {t('howItWorks3', lang)}</li>
            </ul>
          </div>

          <div className="w-full md:w-56 text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
            <img src={qrSvgUrl} alt="QR code" className="mx-auto mb-3" />
            <div className="text-xs text-gray-600 dark:text-gray-400">{t('scanToRegister', lang)}</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg text-blue-800 dark:text-blue-200 font-semibold text-center">
          <span>{t('promoText', lang)}</span>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">{t('yourReferrals', lang)}</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-green-500 text-white text-sm" onClick={handleAddReferralDemo}>
                {t('addDemoReferral', lang)}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">{t('name', lang)}</th>
                  <th className="p-3">{t('email', lang)}</th>
                  <th className="p-3">{t('date', lang)}</th>
                  <th className="p-3">{t('rewarded', lang)}</th>
                  <th className="p-3">{t('actions', lang)}</th>
                </tr>
              </thead>
              <tbody>
                {referrals.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-600 dark:text-gray-300">{t('noReferrals', lang)}</td>
                  </tr>
                )}
                {referrals.map(r => (
                  <tr key={r.id} className="border-t border-gray-100 dark:border-gray-700">
                    <td className="p-3">{r.id}</td>
                    <td className="p-3">{r.name}</td>
                    <td className="p-3">{r.email}</td>
                    <td className="p-3">{new Date(r.date).toLocaleString()}</td>
                    <td className="p-3">{r.rewarded ? t('yes', lang) : t('no', lang)}</td>
                    <td className="p-3">
                      {!r.rewarded && (
                        <button className="px-2 py-1 text-xs rounded bg-indigo-600 text-white" onClick={() => markRewarded(r.id)}>
                          {t('markRewarded', lang)}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Email modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowModal(false)} />
            <div className="relative z-10 w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2">{t('sendInvite', lang)}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t('sendInviteDescription', lang)}</p>

              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder={t('messagePlaceholder', lang)}
                className="w-full p-3 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm mb-4"
                rows="4"
              />

              <div className="flex justify-end gap-3">
                <button className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700" onClick={() => setShowModal(false)}>
                  {t('cancel', lang)}
                </button>
                <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={handleSendViaEmail}>
                  {t('sendEmailNow', lang)}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReferralProgram;
