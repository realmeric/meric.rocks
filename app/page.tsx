import Image from 'next/image'
import DiscordStatus from '../components/DiscordStatus'
import DiscordStatusIndicator from '../components/DiscordStatusIndicator'
import AboutMe from '../components/AboutMe'
import { getPinnedRepos } from '../lib/github'
import SocialLinks from '../components/SocialLinks'
import MobileNav from '../components/MobileNav'

export const revalidate = 900;
export default async function Home() {
  const repos = await getPinnedRepos('realmeric');

  const getPlaceholderColor = (index: number) => {
    const colors = ['#3178c6', '#f1e05a', '#e34c26', '#563d7c', '#2b7489', '#89e051'];
    return colors[index % colors.length];
  };
  
  const getEmojiFromDescription = (description: string | null) => {
    if (!description) return ' ';
    
    const emojiRegex = /[\p{Emoji}\u200d]+/u;
    const match = description.match(emojiRegex);
    
    return match ? match[0] : ' ';
  };

  return (
    <main className="flex min-h-screen flex-col antialiased selection:bg-primary selection:text-background">
      <MobileNav />
      <section id="home" className="min-h-screen flex items-center justify-center bg-background pt-8 pb-12 px-4 sm:pt-12 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="space-y-6 md:space-y-8 animate-fade-in text-center md:text-left w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Hi, I&apos;m <span className="text-primary">Meriç</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 max-w-md mx-auto md:mx-0 leading-relaxed">
              Software Development student based in Istanbul, Turkey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 items-center justify-center md:justify-start">
              <a href="#projects" 
                className="w-full sm:w-auto btn px-6 py-3.5 bg-primary text-gray-900 rounded-full font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all active:scale-95">
                View Projects
              </a>
              <a href="https://blog.meric.rocks" 
                className="w-full sm:w-auto btn-outline px-6 py-3 rounded-full border-2 border-foreground/20 font-medium hover:bg-foreground/5 transition-all backdrop-blur-sm active:scale-95">
                Blog
              </a>
            </div>
            <div className="flex justify-center md:justify-start">
              <SocialLinks />
            </div>
            <div className="flex justify-center md:justify-start">
              <DiscordStatus />
            </div>
          </div>
          <div className="relative flex justify-center mb-8 md:mb-0">
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10 animate-[float_6s_ease-in-out_infinite]">
              <div className="rounded-[2rem] overflow-hidden h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 border-2 border-white/10 shadow-2xl">
                <Image 
                  src="https://github.com/realmeric.png" 
                  alt="Meriç" 
                  width={400} 
                  height={400}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-4 flex justify-center">
                <DiscordStatusIndicator />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="projects" className="py-20 md:py-28 bg-background relative px-4">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16 flex flex-col items-center">
            <span className="text-xs font-mono tracking-wider text-primary/80 uppercase mb-2">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold text-center">Featured Projects</h2>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {repos.map((repo, index) => {
              const emoji = getEmojiFromDescription(repo.description);
              const isFeaturedRepo = repo.name === "mkm-editor";
              
              return (
                <div 
                  key={repo.id} 
                  className={`card ${isFeaturedRepo ? 'rainbow-border p-4 sm:p-5' : 'p-5 sm:p-6'} group rounded-2xl flex flex-col h-full transition-all hover:transform hover:translate-y-[-2px] active:scale-98 touch-manipulation`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl shadow-sm"
                      style={{ 
                        backgroundColor: repo.languageColor ? `${repo.languageColor}20` : `#6e6e6e20`,
                        border: `1px solid ${repo.languageColor || '#6e6e6e'}40`
                      }}
                    >
                      {emoji}
                    </div>     
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold line-clamp-1">{repo.name}</h3>
                      {isFeaturedRepo && (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-foreground mt-1 backdrop-blur-sm">
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" 
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Active Development
                        </span>
                      )}
                    </div>
                  </div>  
                  <div className="flex-grow">
                    <p className="text-foreground/70 mb-4 text-sm line-clamp-3">
                      {repo.description ? repo.description.replace(emoji, '').trim() : 'No description available'}
                    </p>         
                    <div className="flex gap-2 flex-wrap mb-4">
                      {repo.language && (
                        <span className="px-3 py-1.5 bg-secondary/80 rounded-full text-xs font-medium backdrop-blur-sm shadow-sm">
                          <span 
                            className="inline-block w-2 h-2 rounded-full mr-1.5" 
                            style={{ backgroundColor: repo.languageColor || getPlaceholderColor(index) }}
                          ></span>
                          {repo.language}
                        </span>
                      )}
                      {repo.topics && repo.topics.slice(0, 2).map(topic => (
                        <span key={topic} className="px-3 py-1.5 bg-secondary/80 backdrop-blur-sm shadow-sm rounded-full text-xs font-medium truncate max-w-[150px]">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-auto pt-3">
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" 
                         className="flex-1 text-center text-sm font-medium flex items-center justify-center gap-1.5 hover:text-primary transition-colors group/link px-3 py-2 rounded-full hover:bg-foreground/5 border border-foreground/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        <span>Live Demo</span>
                      </a>
                    )}
                    
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" 
                       className="flex-1 text-center text-sm font-medium flex items-center justify-center gap-1.5 hover:text-primary transition-colors group/link px-3 py-2 rounded-full hover:bg-foreground/5 border border-foreground/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="bg-background py-16 md:py-24 relative backdrop-blur-lg px-4">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16 flex flex-col items-center">
            <span className="text-xs font-mono tracking-wider text-primary/80 uppercase mb-2.5">About</span>
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          </div>
          <div className="max-w-2xl mx-auto animate-slide-up p-5 sm:p-6">
            <AboutMe />
          </div>
        </div>
      </section>
    </main>
  )
}
