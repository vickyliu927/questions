import React from 'react';

const SubjectRequestBanner = () => {
  return (
    <div className="w-full pt-4 pb-16 flex flex-col items-center justify-center space-y-6">
      <p className="font-sans leading-relaxed text-center max-w-3xl" style={{color:'#486581', fontWeight: 400, fontSize: '15px'}}>
        We're constantly adding new subjects and updating our content. If you don't see your subject listed, let us know and we'll prioritize it.
      </p>
      <a 
        href="https://tally.so/r/31bgDW"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-[#e67e50] text-white rounded-lg hover:bg-opacity-90 transition-all cursor-pointer"
      >
        Request a Subject
      </a>
    </div>
  );
};

export default SubjectRequestBanner; 