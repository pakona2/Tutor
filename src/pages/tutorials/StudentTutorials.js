import React, { useState, useEffect } from 'react';

function StudentTutorials() {
  const [videos, setVideos] = useState([]);
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    setVideos(JSON.parse(localStorage.getItem('tutorial_videos') || '[]'));
    setPapers(JSON.parse(localStorage.getItem('exam_papers') || '[]'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300 text-center">Tutorials & Exam Papers</h1>
        <h2 className="text-xl font-semibold mb-4">Tutorial Videos</h2>
        {videos.length === 0 ? <p className="text-center">No tutorials uploaded yet.</p> : (
          <div className="video-list mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((vid, idx) => (
              <div key={idx} className="mb-4 bg-gray-100 dark:bg-gray-900 rounded-lg p-4 shadow">
                <h3 className="font-bold mb-2 text-blue-600 dark:text-blue-300">{vid.title}</h3>
                <video controls width="100%" src={vid.url} style={{borderRadius:8,background:'#000'}} />
              </div>
            ))}
          </div>
        )}
        <h2 className="text-xl font-semibold mb-4">Exam Papers</h2>
        {papers.length === 0 ? <p className="text-center">No exam papers uploaded yet.</p> : (
          <ul className="list-disc pl-6">
            {papers.map((paper, idx) => (
              <li key={idx} className="mb-2">
                <a href={paper.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-semibold">{paper.title}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StudentTutorials;
