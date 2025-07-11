"use client";
import { useState } from 'react';
import Link from 'next/link';

class UGSChecker {
  private regulations: Record<string, Record<string, number>>;
  
  constructor() {
    this.regulations = {
      "06:00-13:29": {"1-2": 13.0, "3": 12.5, "4": 12.0, "5": 11.5, "6": 11.0, "7": 10.5, "8": 10.0, "9": 9.5, "10": 9.0},
      "13:30-13:59": {"1-2": 12.75, "3": 12.25, "4": 11.75, "5": 11.25, "6": 10.75, "7": 10.25, "8": 9.75, "9": 9.25, "10": 9.0},
      "14:00-14:29": {"1-2": 12.5, "3": 12.0, "4": 11.5, "5": 11.0, "6": 10.5, "7": 10.0, "8": 9.5, "9": 9.0, "10": 9.0},
      "14:30-14:59": {"1-2": 12.25, "3": 11.75, "4": 11.25, "5": 10.75, "6": 10.25, "7": 9.75, "8": 9.25, "9": 9.0, "10": 9.0},
      "15:00-15:29": {"1-2": 12.0, "3": 11.5, "4": 11.0, "5": 10.5, "6": 10.0, "7": 9.5, "8": 9.0, "9": 9.0, "10": 9.0},
      "15:30-15:59": {"1-2": 11.75, "3": 11.25, "4": 10.75, "5": 10.25, "6": 9.75, "7": 9.25, "8": 9.0, "9": 9.0, "10": 9.0},
      "16:00-16:29": {"1-2": 11.5, "3": 11.0, "4": 10.5, "5": 10.0, "6": 9.5, "7": 9.0, "8": 9.0, "9": 9.0, "10": 9.0},
      "16:30-16:59": {"1-2": 11.25, "3": 10.75, "4": 10.25, "5": 9.75, "6": 9.25, "7": 9.0, "8": 9.0, "9": 9.0, "10": 9.0},
      "17:00-04:59": {"1-2": 11.0, "3": 10.5, "4": 10.0, "5": 9.5, "6": 9.0, "7": 9.0, "8": 9.0, "9": 9.0, "10": 9.0},
      "05:00-05:14": {"1-2": 12.0, "3": 11.5, "4": 11.0, "5": 10.5, "6": 10.0, "7": 9.5, "8": 9.0, "9": 9.0, "10": 9.0},
      "05:15-05:29": {"1-2": 12.25, "3": 11.75, "4": 11.25, "5": 10.75, "6": 10.25, "7": 9.75, "8": 9.25, "9": 9.0, "10": 9.0},
      "05:30-05:44": {"1-2": 12.5, "3": 12.0, "4": 11.5, "5": 11.0, "6": 10.5, "7": 10.0, "8": 9.5, "9": 9.0, "10": 9.0},
      "05:45-05:59": {"1-2": 12.75, "3": 12.25, "4": 11.75, "5": 11.25, "6": 10.75, "7": 10.25, "8": 9.25, "9": 9.25, "10": 9.0},
    };
  }
  
  parseTime(timeStr: string): Date | null {
    const match = /^(\d{1,2}):(\d{2})$/.exec(timeStr);
    if (!match) return null;
    
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return null;
    }
    
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
  
  getTimeRangeCategory(startTime: Date): string {
    const hour = startTime.getHours();
    const minute = startTime.getMinutes();
    const timeVal = hour * 60 + minute;
    
    if (360 <= timeVal && timeVal < 809) return "06:00-13:29";
    if (810 <= timeVal && timeVal < 839) return "13:30-13:59";
    if (840 <= timeVal && timeVal < 869) return "14:00-14:29";
    if (870 <= timeVal && timeVal < 899) return "14:30-14:59";
    if (900 <= timeVal && timeVal < 929) return "15:00-15:29";
    if (930 <= timeVal && timeVal < 959) return "15:30-15:59";
    if (960 <= timeVal && timeVal < 989) return "16:00-16:29";
    if (990 <= timeVal && timeVal < 1019) return "16:30-16:59";
    if ((1020 <= timeVal && timeVal < 1440) || (0 <= timeVal && timeVal < 300)) return "17:00-04:59";
    if (300 <= timeVal && timeVal < 314) return "05:00-05:14";
    if (315 <= timeVal && timeVal < 329) return "05:15-05:29";
    if (330 <= timeVal && timeVal < 344) return "05:30-05:44";
    if (345 <= timeVal && timeVal < 360) return "05:45-05:59";
    
    return "17:00-04:59";
  }
  
  getMaxDutyTime(startTime: Date, numSectors: number, skpkEnabled: boolean): number {
    const timeCategory = this.getTimeRangeCategory(startTime);
    let maxDutyTime = 9.0;
    
    if (numSectors <= 2) {
      maxDutyTime = this.regulations[timeCategory]["1-2"];
    } else if (numSectors <= 10) {
      maxDutyTime = this.regulations[timeCategory][numSectors.toString()];
    } else {
      maxDutyTime = this.regulations[timeCategory]["10"];
    }
    
    if (skpkEnabled) {
      maxDutyTime += 2.0;
    }
    
    return maxDutyTime;
  }
  
  parseTimeWithTimezone(timeStr: string, utcOffset: number): Date | null {
    const match = /^(\d{1,2}):(\d{2})$/.exec(timeStr);
    if (!match) return null;
    
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return null;
    }
    
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    
    return date;
  }

  addAircraftDutyTime(startTime: Date, aircraftDutyTime: string): Date {
    const dutyTimeMatch = /^(\d{1,2}):(\d{2})$/.exec(aircraftDutyTime);
    if (!dutyTimeMatch) return startTime;
    
    const dutyHours = parseInt(dutyTimeMatch[1], 10);
    const dutyMinutes = parseInt(dutyTimeMatch[2], 10);
    
    const adjustedStartTime = new Date(startTime);
    adjustedStartTime.setHours(adjustedStartTime.getHours() - dutyHours, adjustedStartTime.getMinutes() - dutyMinutes);
    
    return adjustedStartTime;
  }

  checkDutyTimeCompliance(
    dutyStart: string, 
    dutyEnd: string, 
    numSectors: number, 
    skpkEnabled: boolean,
    utcOffset: number = 0,
    aircraftDutyTime: string = "00:00"
  ): { 
    isValid: boolean; 
    message: string;
    timeCategory: string;
    actualDutyHours: number;
    maxDutyHours: number;
    excess?: number;
    adjustedStartTime?: string;
    adjustedEndTime?: string;
  } {
    const startTime = this.parseTimeWithTimezone(dutyStart, utcOffset);
    const endTime = this.parseTimeWithTimezone(dutyEnd, utcOffset);
    
    if (!startTime || !endTime) {
      return { 
        isValid: false, 
        message: "Geçersiz zaman formatı. SS:DD şeklinde giriniz.",
        timeCategory: "",
        actualDutyHours: 0,
        maxDutyHours: 0
      };
    }
    
    const adjustedStartTime = this.addAircraftDutyTime(startTime, aircraftDutyTime);
    let adjustedEndTime = new Date(endTime);
    
    if (adjustedEndTime < adjustedStartTime) {
      adjustedEndTime.setDate(adjustedEndTime.getDate() + 1);
    }
    
    const actualDutyHours = (adjustedEndTime.getTime() - adjustedStartTime.getTime()) / (1000 * 60 * 60);
    
    const timeCategory = this.getTimeRangeCategory(adjustedStartTime);
    const maxDutyHours = this.getMaxDutyTime(adjustedStartTime, numSectors, skpkEnabled);
    
    const adjustedStartTimeStr = `${adjustedStartTime.getHours().toString().padStart(2, '0')}:${adjustedStartTime.getMinutes().toString().padStart(2, '0')}`;
    const adjustedEndTimeStr = `${adjustedEndTime.getHours().toString().padStart(2, '0')}:${adjustedEndTime.getMinutes().toString().padStart(2, '0')}`;
    
    if (actualDutyHours <= maxDutyHours) {
      return {
        isValid: true,
        message: `✅ PLANLAMADA HATA YOK.\nGörev Zamanı: ${this.decimalToHHMM(actualDutyHours)}\nMaksimum izin verilen: ${this.decimalToHHMM(maxDutyHours)}`,
        timeCategory,
        actualDutyHours,
        maxDutyHours,
        adjustedStartTime: adjustedStartTimeStr,
        adjustedEndTime: adjustedEndTimeStr
      };
    } else {
      const excess = actualDutyHours - maxDutyHours;
      return {
        isValid: false,
        message: `❌ PLANLAMADA HATA VAR.\nGörev Zamanı: ${this.decimalToHHMM(actualDutyHours)}\nMaksimum izin verilen: ${this.decimalToHHMM(maxDutyHours)}\nFazlalık: ${this.decimalToHHMM(excess)}`,
        timeCategory,
        actualDutyHours,
        maxDutyHours,
        excess,
        adjustedStartTime: adjustedStartTimeStr,
        adjustedEndTime: adjustedEndTimeStr
      };
    }
  }
  
  decimalToHHMM(decimalHours: number): string {
    const hours = Math.floor(decimalHours);
    const minutes = Math.floor((decimalHours - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}

export default function UGSCalculatorPage() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sectors, setSectors] = useState('2');
  const [skpkEnabled, setSKPKEnabled] = useState(false);
  const [utcOffset, setUtcOffset] = useState(3); // Default to UTC+3
  const [aircraftDutyTime, setAircraftDutyTime] = useState('00:00');
  const [result, setResult] = useState<ReturnType<UGSChecker['checkDutyTimeCompliance']> | null>(null);
  const [error, setError] = useState('');

  const validateTimeFormat = (time: string) => {
    return /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/.test(time);
  };

  const validateSectors = (sectorStr: string) => {
    const sectorNum = parseInt(sectorStr, 10);
    return !isNaN(sectorNum) && sectorNum > 0;
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);
    
    if (!validateTimeFormat(startTime)) {
      setError("Başlangıç saati formatı yanlış. Örnek: 06:30");
      return;
    }
    
    if (!validateTimeFormat(endTime)) {
      setError("Bitiş saati formatı yanlış. Örnek: 19:30");
      return;
    }
    
    if (!validateTimeFormat(aircraftDutyTime)) {
      setError("Uçak tipine göre görev süresi formatı yanlış. Örnek: 01:00");
      return;
    }
    
    if (!validateSectors(sectors)) {
      setError("Sektör sayısı geçerli değil. Pozitif bir sayı giriniz.");
      return;
    }
    
    const checker = new UGSChecker();
    const calculationResult = checker.checkDutyTimeCompliance(
      startTime, 
      endTime, 
      parseInt(sectors, 10),
      skpkEnabled,
      utcOffset,
      aircraftDutyTime
    );
    
    setResult(calculationResult);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <header className="mb-12 space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">UGS Hesaplayıcı</h1>
          <p className="text-foreground/60">Uçuş Görev Süresi hesaplama ve kontrol aracı</p>
          <div className="flex mt-4 space-x-3">
            <Link 
              href="/tools"
              className="inline-flex items-center text-xs px-3 py-1.5 rounded-full bg-background/80 border border-white/10 text-foreground/80 hover:text-foreground hover:border-white/20 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 mr-1.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Back to Tools</span>
            </Link>
            
            <a 
              href="https://github.com/jiprettycool/ugs-checker" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-xs px-3 py-1.5 rounded-full bg-background/80 border border-white/10 text-foreground/80 hover:text-foreground hover:border-white/20 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 mr-1.5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>GitHub Page</span>
            </a>
          </div>
        </header>
        <div className="bg-secondary/30 backdrop-blur-md rounded-2xl border border-white/10 p-7 shadow-lg">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Yerel Saat Dilimi</label>
              <select
                value={utcOffset}
                onChange={(e) => setUtcOffset(parseInt(e.target.value))}
                className="w-full p-3 bg-slate-800 text-white rounded-xl border border-white/10 focus:border-primary/30 focus:outline-none"
              >
                <option value={-12}>UTC-12</option>
                <option value={-11}>UTC-11</option>
                <option value={-10}>UTC-10</option>
                <option value={-9}>UTC-9</option>
                <option value={-8}>UTC-8</option>
                <option value={-7}>UTC-7</option>
                <option value={-6}>UTC-6</option>
                <option value={-5}>UTC-5</option>
                <option value={-4}>UTC-4</option>
                <option value={-3}>UTC-3</option>
                <option value={-2}>UTC-2</option>
                <option value={-1}>UTC-1</option>
                <option value={0}>UTC+0</option>
                <option value={1}>UTC+1</option>
                <option value={2}>UTC+2</option>
                <option value={3}>UTC+3</option>
                <option value={4}>UTC+4</option>
                <option value={5}>UTC+5</option>
                <option value={6}>UTC+6</option>
                <option value={7}>UTC+7</option>
                <option value={8}>UTC+8</option>
                <option value={9}>UTC+9</option>
                <option value={10}>UTC+10</option>
                <option value={11}>UTC+11</option>
                <option value={12}>UTC+12</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Uçak Tipine Göre Görev Süresi</label>
              <input
                type="text"
                placeholder="01:00"
                value={aircraftDutyTime}
                onChange={(e) => setAircraftDutyTime(e.target.value)}
                className="w-full p-3 bg-slate-800 text-white rounded-xl border border-white/10 focus:border-primary/30 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Görev Başlangıç Saati</label>
              <input
                type="text"
                placeholder="06:30"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 bg-slate-800 text-white rounded-xl border border-white/10 focus:border-primary/30 focus:outline-none"              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Görev Bitiş Saati</label>
              <input
                type="text"
                placeholder="19:30"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 bg-slate-800 text-white rounded-xl border border-white/10 focus:border-primary/30 focus:outline-none"              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Sektör Sayısı</label>
              <input
                type="number"
                placeholder="2"
                value={sectors}
                onChange={(e) => setSectors(e.target.value)}
                className="w-full p-3 bg-slate-800 text-white rounded-xl border border-white/10 focus:border-primary/30 focus:outline-none"                min="1"
              />
            </div>
            
            <div className="flex items-center py-1">
              <input
                type="checkbox"
                id="skpk"
                checked={skpkEnabled}
                onChange={(e) => setSKPKEnabled(e.target.checked)}
                className="w-4 h-4 rounded bg-background/60 border-white/20"
              />
              <label htmlFor="skpk" className="ml-2 text-sm">SKPK ile +2 saat izin</label>
            </div>
            
            <button
              onClick={handleCalculate}
              className="w-full py-3.5 mt-3 bg-slate-800 text-primary-foreground rounded-xl font-medium hover:bg-slate-600 transition-colors shadow-sm"
            >
              UGS Hesapla
            </button>
          </div>
          
          {error && (
            <div className="mt-6 p-4 bg-red-950/20 border border-red-500/20 rounded-xl">
              <p className="text-red-400">{error}</p>
            </div>
          )}
          
          {result && (
            <div className="mt-6 p-6 bg-background/60 border border-white/10 rounded-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div>
                  <h3 className="font-medium">Sonuç</h3>
                  <p className="text-sm text-foreground/60 mt-1">Saat Kategorisi: {result.timeCategory}</p>
                </div>
                <div className={`py-1.5 px-3.5 rounded-full text-xs font-medium ${
                  result.isValid 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {result.isValid ? 'Geçerli' : 'Geçersiz'}
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                {result.adjustedStartTime && (
                  <div className="flex justify-between">
                    <span>Hesaplanan başlangıç saati:</span>
                    <span className="font-mono font-medium">{result.adjustedStartTime}</span>
                  </div>
                )}
                
                {result.adjustedEndTime && (
                  <div className="flex justify-between">
                    <span>Hesaplanan bitiş saati:</span>
                    <span className="font-mono font-medium">{result.adjustedEndTime}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Görev zamanı:</span>
                  <span className="font-mono font-medium">{new UGSChecker().decimalToHHMM(result.actualDutyHours)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>İzin verilen maksimum:</span>
                  <span className="font-mono font-medium">{new UGSChecker().decimalToHHMM(result.maxDutyHours)}</span>
                </div>
                
                {result.excess && (
                  <div className="flex justify-between text-red-400">
                    <span>Fazlalık:</span>
                    <span className="font-mono font-medium">{new UGSChecker().decimalToHHMM(result.excess)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-10 bg-secondary/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-medium mb-3">Nasıl Kullanılır?</h3>
          <div className="space-y-2.5 text-sm text-foreground/70">
            <p className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Yerel Saat Dilimi:</strong> Görev saatlerinin hangi saat diliminde olduğunu seçin (örn. UTC+3)</span>
            </p>
            <p className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Uçak Tipine Göre Görev Süresi:</strong> Uçak tipine göre ek görev süresi (örn. 01:00)</span>
            </p>
            <p className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Görev Başlangıç/Bitiş Saati:</strong> Saati SS:DD formatında girin (örn. 06:30)</span>
            </p>
            <p className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Sektör Sayısı:</strong> Uçuş sektörlerinin sayısı</span>
            </p>
            <p className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>SKPK:</strong> Sorumlu Kaptan Pilotun Kararı ile +2 saat ek görev süresi</span>
            </p>
          </div>
          
          <div className="mt-5 p-4 bg-background/40 rounded-lg text-xs">
            <p className="font-medium mb-2">Örnek Hesaplamalar:</p>
            <div className="space-y-2">
              <p>• UTC+3, Uçak Tipi: 01:00, Başlangıç: 04:00, Bitiş: 16:00, Sektör: 2</p>
              <p>  → Hesaplanan: 06:00-16:00 (10 saat, limit dahilinde)</p>
              <p>• UTC+2, Uçak Tipi: 01:15, Başlangıç: 14:15, Bitiş: 01:45, Sektör: 4</p>
              <p>• UTC+0, Uçak Tipi: 00:30, Başlangıç: 22:00, Bitiş: 06:00, Sektör: 6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}