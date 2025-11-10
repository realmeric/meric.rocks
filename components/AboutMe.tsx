"use client";
import React, { useEffect, useState } from 'react';

export default function AboutMeSection() {
  const calculateAge = () => {
    const today = new Date();
    const birthYear = 2005;
    let age = today.getFullYear() - birthYear;
    
    const birthMonth = 0;
    const birthDay = 1;
    
    const birthDateThisYear = new Date(today.getFullYear(), birthMonth, birthDay);
    if (today < birthDateThisYear) {
      age--;
    }
    
    return age;
  };
  
  const [age, setAge] = useState(0);
  useEffect(() => {
    setAge(calculateAge());
  }, []);
  
  return (
    <div className="bg-surface/95 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-lg hover:border-primary/30 hover:bg-surfaceAlt/95 transition-all">
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-surfaceAlt/60 flex items-center justify-center border border-primary/30 shadow-sm">
            <span className="text-2xl font-bold text-primary">{age}</span>
          </div>
          <div>
            <h3 className="font-bold text-xl tracking-tight">Meriç</h3>
            <p className="text-sm text-foreground/70 mt-1">
              Istanbul, Turkey
            </p>
          </div>
        </div>
        <div className="bg-surfaceAlt/80 text-primary px-4 py-2 rounded-xl border border-white/10 shadow-sm">
          <span className="font-medium">Student</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">About Me</h4>
            <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
              Software Developer
            </span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Software Development student with a passion for self-hosting and infrastructure. I enjoy building and maintaining my own services, from web applications to home servers.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Expertise</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-surfaceAlt/50 rounded-xl p-4 border border-white/10 shadow-sm backdrop-blur-sm">
              <h5 className="font-medium text-sm mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
                Frontend
              </h5>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md text-xs">React</span>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md text-xs">Next.js</span>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md text-xs">TailwindCSS</span>
              </div>
            </div>
            <div className="bg-surfaceAlt/50 rounded-xl p-4 border border-white/10 shadow-sm backdrop-blur-sm">
              <h5 className="font-medium text-sm mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path></svg>
                Backend
              </h5>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-md text-xs">Go</span>
                <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded-md text-xs">Python</span>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md text-xs">TypeScript</span>
                <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded-md text-xs">Java</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Tools & Environment</h4>
          <div className="bg-surfaceAlt/50 rounded-xl p-4 border border-white/10 shadow-sm backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-surface/60 flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                </div>
                <div>
                  <p className="text-sm font-medium">HP Victus 16</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-surface/60 flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                </div>
                <div>
                  <p className="text-xs text-foreground/60">NAS & Self-hosting</p>
                  <p className="text-sm font-medium">Beelink MINI S12 Pro</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-surface/60 flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <div>
                  <p className="text-xs text-foreground/60">Primary Editor</p>
                  <p className="text-sm font-medium">VS Code</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}