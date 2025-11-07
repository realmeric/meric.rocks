"use client";
import React from 'react';
import Image from 'next/image';
import { useLanyard } from '../hooks/useLanyard';

export default function DiscordStatus() {
  const { data, loading } = useLanyard();
  const codingActivity = data?.activities?.find(activity => 
    activity.name.includes("Code")
  );
  const gamingActivity = !codingActivity && data?.activities?.find(activity => 
    activity.type === 0 && !activity.name.includes("Code")
  );
  const currentActivity = codingActivity || gamingActivity || null;
  
  const getActivityElapsedTime = () => {
    if (!currentActivity?.timestamps?.start) return "";
    const elapsedMin = Math.floor((Date.now() - currentActivity.timestamps.start) / 60000);
    return elapsedMin < 60 ? `${elapsedMin}m` : `${Math.floor(elapsedMin / 60)}h`;
  };
  
  const forLongText = (text: string | undefined, maxLength = 22) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  if (loading) {
    return (
      <div className="mt-6 flex justify-center">
        <div className="h-14 w-52 bg-secondary/30 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-4">
      {(codingActivity || gamingActivity) && (
        <div className={`flex items-center gap-3 py-3 pl-3 pr-5 rounded-2xl border ${
          codingActivity 
            ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
            : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
        } shadow-sm hover:shadow-md transition-shadow`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            codingActivity 
              ? 'bg-blue-500/20' 
              : 'bg-purple-500/20'
          }`}>
            {codingActivity ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 6H17C18.1 6 19 6.9 19 8V16C19 17.1 18.1 18 17 18H7C5.9 18 5 17.1 5 16V8C5 6.9 5.9 6 7 6M7 8V16H17V8H7M10 9H11V11H13V9H14V11H16V12H14V14H13V12H11V14H10V12H8V11H10V9Z" />
              </svg>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium opacity-80">
                {codingActivity ? 'Coding' : 'Gaming'}
              </span>
              {getActivityElapsedTime() && (
                <span className="text-xs opacity-60">• {getActivityElapsedTime()}</span>
              )}
            </div>
            <p className="text-base font-medium truncate max-w-[160px]">
              {forLongText(currentActivity?.name, 22)}
            </p>
          </div>
        </div>
      )}

      {data?.spotify?.song ? (
        <div className="flex items-center gap-3 py-3 pl-3 pr-5 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            {data.spotify?.album_art_url ? (
              <Image 
                src={data.spotify.album_art_url} 
                alt="Album cover" 
                width={40}
                height={40}
                className="w-full h-full object-cover"
                sizes="40px"
              />
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,3C16.97,3 21,7.03 21,12C21,16.97 16.97,21 12,21C7.03,21 3,16.97 3,12C3,7.03 7.03,3 12,3M16.5,12C16.5,14.49 14.49,16.5 12,16.5C9.51,16.5 7.5,14.49 7.5,12C7.5,9.51 9.51,7.5 12,7.5C14.49,7.5 16.5,9.51 16.5,12M12,9C10.34,9 9,10.34 9,12C9,13.66 10.34,15 12,15C13.66,15 15,13.66 15,12C15,10.34 13.66,9 12,9Z" />
                </svg>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium opacity-80">Spotify</span>
            </div>
            <p className="text-base font-medium truncate max-w-[160px]">
              {forLongText(data.spotify.song, 22)}
            </p>
            {data.spotify.artist && (
              <p className="text-xs opacity-70 truncate max-w-[160px] mt-0.5">
                by {forLongText(data.spotify.artist, 18)}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 py-3 pl-3 pr-5 rounded-2xl bg-gray-500/10 border border-gray-500/20 text-gray-400 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M9,9H15V15H9" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium opacity-80">Spotify</span>
            </div>
            <p className="text-base font-medium truncate max-w-[160px]">
              Not playing
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
