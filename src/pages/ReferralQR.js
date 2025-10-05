/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { t } from '../i18n/i18n'; // fixed path to translations.js at src/translations.js
//import '../TutorUpload.css'; // fixed path to TutorUpload.css at src/TutorUpload.css

// Helper: build fallback link from current user
const getCurrentUser = () => ({
  id: localStorage.getItem('user_id') || null,
  name: localStorage.getItem('user_name') || null,
  email: localStorage.getItem('user_email') || null
});

function buildFallbackLink() {
  const u = getCurrentUser();
  const id = u.id || (u.email ? u.email : 'demo_user');
  return `${window.location.origin}/register?ref=${encodeURIComponent(id)}`;
}

// Public QR generator endpoint (simple, reliable). Replace if needed.
function qrApiUrl(data, size = 360) {
  const encoded = encodeURIComponent(data);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&format=png`;
}

export default function ReferralQR({ signedLink = null, size = 300 }) {
  const fallbackLink = useMemo(() => buildFallbackLink(), []);
  const referralLink = signedLink || fallbackLink;

  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [qrSrc, setQrSrc] = useState(() => qrApiUrl(referralLink, size));
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [error, setError] = useState(null);

  // refresh QR src when link or size changes
  useEffect(() => {
    setQrSrc(qrApiUrl(referralLink, size));
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referralLink, size]);

  // copy link
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(t('copiedToClipboard') || 'Copied to clipboard');
    }
  };

  // fetch QR image and convert to object URL for download
  const prepareDownload = async (targetSize = 1024) => {
    setError(null);
    setLoadingDownload(true);
    try {
      const api = qrApiUrl(referralLink, targetSize);
      const res = await fetch(api, { mode: 'cors' });
      if (!res.ok) throw new Error('Failed to fetch QR image');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      const a = document.createElement('a');
      a.href = url;
      a.download = `referral-qr-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      setError('Could not prepare download. Try again.');
    } finally {
      setLoadingDownload(false);
    }
  };

  const handlePrint = () => {
    const w = window.open('', '_blank', 'noopener');
    if (!w) { setError('Unable to open print window.'); return; }
    const html = `
      <html>
        <head>
          <title>Print QR</title>
          <style>
            body { display:flex; align-items:center; justify-content:center; height:100vh; margin:0; }
            img { max-width:90vw; max-height:90vh; }
            .meta { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial; margin-top: 12px; text-align:center; color:#374151; }
          </style>
        </head>
        <body>
          <div>
            <img src="${qrApiUrl(referralLink, 1024)}" alt="QR code" />
            <div class="meta">${t('scanToRegister') || 'Scan to register'}<div style="font-size:13px;color:#6b7280;margin-top:6px;">${referralLink}</div></div>
          </div>
        </body>
      </html>
    `;
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 400);
  };

  return (
    <div className="upload-page" style={{ padding: 12 }}>
      <div className="upload-container" style={{ maxWidth: 520 }}>
        <h2 className="section-title">{t('scanToRegister') || 'Scan to register'}</h2>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 10 }}>
          <div style={{ width: size, height: size, flex: '0 0 auto' }}>
            <img
              src={qrSrc}
              alt="Referral QR"
              width={size}
              height={size}
              style={{ borderRadius: 8, background: '#fff', boxShadow: '0 4px 14px rgba(16,24,40,0.06)', cursor: 'pointer' }}
              onClick={() => setPreviewOpen(true)}
              onError={() => setError('QR generation failed')}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 700 }}>{t('yourReferralLink') || 'Your referral link'}</label>
            <input readOnly value={referralLink} className="input-field" style={{ marginTop: 8, width: '100%' }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <button className="upload-button" onClick={handleCopy} style={{ background: '#6366f1', color: '#fff' }}>
                {copied ? (t('copied') || 'Copied!') : (t('copy') || 'Copy')}
              </button>
              <button className="link-button" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(referralLink)}`, '_blank')}>WhatsApp</button>
              <button className="link-button" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank')}>Facebook</button>
              <button className="link-button" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent((t('shareTweet') || 'Join me!') + ' ' + referralLink)}`, '_blank')}>Twitter</button>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button className="upload-button" onClick={() => prepareDownload(1024)} disabled={loadingDownload}>
                {loadingDownload ? 'Preparing...' : 'Download PNG'}
              </button>
              <button className="link-button" onClick={handlePrint}>Print</button>
              <button className="link-button" onClick={() => setPreviewOpen(true)}>Preview</button>
            </div>

            {error && <div style={{ marginTop: 10, color: '#b91c1c' }}>{error}</div>}
            <div style={{ marginTop: 12, padding: 10, background: '#eef2ff', borderRadius: 8, color: '#1e3a8a' }}>
              {t('promoText') || 'Share the link and get 2 free tutor sessions when a friend registers using your link!'}
            </div>
          </div>
        </div>

        {/* Preview modal */}
        {previewOpen && (
          <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={() => setPreviewOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 760 }}>
              <h3 className="modal-title">{t('scanToRegister') || 'Scan to register'}</h3>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12, flexWrap: 'wrap' }}>
                <div>
                  <img src={qrApiUrl(referralLink, 1024)} alt="Large QR" style={{ width: 420, height: 420, borderRadius: 8 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#374151' }}>{t('howItWorksTitle') || 'How it works'}</p>
                  <ol style={{ paddingLeft: 18 }}>
                    <li>{t('howItWorks1')}</li>
                    <li>{t('howItWorks2')}</li>
                    <li>{t('howItWorks3')}</li>
                  </ol>

                  <div style={{ marginTop: 12 }}>
                    <label style={{ fontWeight: 700 }}>Link</label>
                    <input readOnly value={referralLink} className="input-field" style={{ marginTop: 8, width: '100%' }} />
                    <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                      <button className="upload-button" onClick={() => prepareDownload(2048)} disabled={loadingDownload}>Download hi-res</button>
                      <button className="modal-cancel" onClick={() => setPreviewOpen(false)}>{t('cancel') || 'Cancel'}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-actions" style={{ marginTop: 16 }}>
                <button className="modal-delete" onClick={() => { setPreviewOpen(false); }}>{t('close') || 'Close'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
