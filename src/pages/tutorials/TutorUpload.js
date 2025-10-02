import React, { useState } from 'react';

function TutorUpload() {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [paperTitle, setPaperTitle] = useState('');
  const [paperUrl, setPaperUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleVideoUpload = (e) => {
    e.preventDefault();
    if (!videoTitle || !videoUrl) return setMessage('Please provide both title and video URL.');
    const videos = JSON.parse(localStorage.getItem('tutorial_videos') || '[]');
    videos.push({ title: videoTitle, url: videoUrl });
    localStorage.setItem('tutorial_videos', JSON.stringify(videos));
    setVideoTitle('');
    setVideoUrl('');
    setMessage('Video uploaded!');
  };

  const handlePaperUpload = (e) => {
    e.preventDefault();
    if (!paperTitle || !paperUrl) return setMessage('Please provide both title and paper URL.');
    const papers = JSON.parse(localStorage.getItem('exam_papers') || '[]');
    papers.push({ title: paperTitle, url: paperUrl });
    localStorage.setItem('exam_papers', JSON.stringify(papers));
    setPaperTitle('');
    setPaperUrl('');
    setMessage('Paper uploaded!');
  };

  // Get past videos for preview
  const pastVideos = JSON.parse(localStorage.getItem('tutorial_videos') || '[]');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Upload Tutorials & Exam Papers</h1>
        {message && <div className="mb-4 text-green-600 dark:text-green-400 font-semibold">{message}</div>}
        <form onSubmit={handleVideoUpload} className="mb-8" style={{display:'flex',flexDirection:'column',gap:12}}>
          <h2 className="text-xl font-semibold mb-2">Upload Tutorial Video</h2>
          <input type="text" placeholder="Video Title" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} className="input" style={{padding:12,fontSize:'1rem',borderRadius:8}} />
          <input type="url" placeholder="Video URL (mp4, webm, etc)" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="input" style={{padding:12,fontSize:'1rem',borderRadius:8}} />
          <input type="file" accept="video/*" className="input" style={{padding:12,fontSize:'1rem',borderRadius:8}} onChange={e => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setVideoUrl(url);
            }
          }} />
          {/* Video preview for current upload */}
          {videoUrl && (
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Video Preview:</label>
              <video controls width="100%" src={videoUrl} style={{borderRadius:8,background:'#000'}} />
            </div>
          )}
          <button type="submit" className="button" style={{padding:12,fontSize:'1rem',borderRadius:8}}>Upload Video</button>
        </form>
        {/* Past video previews */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Past Video Previews</h2>
          {pastVideos.length === 0 ? <p>No past videos uploaded.</p> : (
            <div className="video-list grid grid-cols-1 gap-4">
              {pastVideos.map((vid, idx) => (
                <div key={idx} className="mb-2 bg-gray-100 dark:bg-gray-900 rounded-lg p-2 shadow">
                  <div className="font-bold mb-1 text-blue-600 dark:text-blue-300">{vid.title}</div>
                  <video controls width="100%" src={vid.url} style={{borderRadius:8,background:'#000'}} />
                </div>
              ))}
            </div>
          )}
        </div>
        <form onSubmit={handlePaperUpload} style={{display:'flex',flexDirection:'column',gap:12}}>
          <h2 className="text-xl font-semibold mb-2">Upload Exam Paper</h2>
          <input type="text" placeholder="Paper Title" value={paperTitle} onChange={e => setPaperTitle(e.target.value)} className="input" style={{padding:12,fontSize:'1rem',borderRadius:8}} />
          <input type="url" placeholder="Paper URL (PDF, DOCX, etc)" value={paperUrl} onChange={e => setPaperUrl(e.target.value)} className="input" style={{padding:12,fontSize:'1rem',borderRadius:8}} />
          <input type="file" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="input" style={{padding:12,fontSize:'1rem',borderRadius:8}} onChange={e => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setPaperUrl(url);
            }
          }} />
          <button type="submit" className="button" style={{padding:12,fontSize:'1rem',borderRadius:8}}>Upload Paper</button>
        </form>
      </div>
    </div>
  );
}

export default TutorUpload;
