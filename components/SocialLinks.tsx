"use client";
import React from 'react';

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      <a
        href="https://github.com/realmeric"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground/80 hover:text-primary transition-all active:scale-95"
        aria-label="GitHub Profile"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </a>
      
      <a
        href="https://twitter.com/iamrealji"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground/80 hover:text-primary transition-all active:scale-95"
        aria-label="Twitter Profile"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      </a>
    </div>
  );
}
