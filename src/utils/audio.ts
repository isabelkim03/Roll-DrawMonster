// Web Audio API Sound Effects + Speech Synthesis (TTS)

let isMuted = false;
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function toggleMute(): boolean {
  isMuted = !isMuted;
  if (isMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  return isMuted;
}

export function getIsMuted(): boolean {
  return isMuted;
}

export function playClick(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // ignore
  }
}

export function playDiceRollSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const time = now + i * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220 + Math.random() * 260, time);

      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.06);
    }
  } catch {
    // ignore
  }
}

export function playDiceStopSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, idx) => {
      const time = now + idx * 0.06;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.18);
    });
  } catch {
    // ignore
  }
}

export function playSuccessChime(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, High C
    chord.forEach((freq, idx) => {
      const time = now + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.4);
    });
  } catch {
    // ignore
  }
}

export function playStarEarned(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const arpeggio = [659.25, 830.61, 987.77, 1318.51];
    arpeggio.forEach((freq, idx) => {
      const time = now + idx * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.35);
    });
  } catch {
    // ignore
  }
}

export function playTryAgainSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [392.0, 329.63]; // G4 -> E4
    notes.forEach((freq, idx) => {
      const time = now + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.2);
    });
  } catch {
    // ignore
  }
}

// Banned voices that sound aged, stern, monotone or robotic
const BANNED_VOICE_NAMES = [
  'victoria',
  'karen',
  'daniel',
  'oliver',
  'george',
  'david',
  'mark',
  'richard',
  'fiona',
  'grandma',
  'elder',
  'whisper',
  'zarvox',
  'trinoids',
  'deranged',
  'bad news',
  'cellos',
  'good news',
  'bells',
  'pipe organ',
  'hysterical',
  'fred',
  'alex',
  'ralph',
  'tom',
  'bruce',
  'albert',
  'junior'
];

let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

/**
 * Selects the best available lively, natural, high-intonation voice for children.
 * Prioritizes high quality neural/natural expressive voices (Google, Natural, Siri, Samantha, Jenny, Ava, etc.)
 */
function getChildVoice(voices: SpeechSynthesisVoice[]): { voice: SpeechSynthesisVoice | null; voiceType: 'natural' | 'playful' | 'standard' } {
  if (!voices || voices.length === 0) {
    return { voice: null, voiceType: 'standard' };
  }

  // Filter for English voices first, excluding any elderly/robotic banned voices
  const enVoices = voices.filter((v) => {
    if (!v.lang || !v.lang.toLowerCase().startsWith('en')) return false;
    const name = v.name.toLowerCase();
    return !BANNED_VOICE_NAMES.some((banned) => name.includes(banned));
  });

  const candidatePool = enVoices.length > 0 ? enVoices : voices;

  // 1. First priority: High-quality Natural / Neural / Expressive kid-friendly voices
  // Microsoft/Google/Apple high-end voices with natural human intonation
  const premiumNaturalVoice = candidatePool.find((v) => {
    const name = v.name.toLowerCase();
    return (
      (name.includes('natural') && (name.includes('jenny') || name.includes('aria') || name.includes('ana') || name.includes('guy') || name.includes('ava'))) ||
      name.includes('google us english') ||
      name.includes('samantha') ||
      name.includes('siri') ||
      name.includes('kendra') ||
      name.includes('zoe') ||
      name.includes('ivy')
    );
  });
  if (premiumNaturalVoice) {
    return { voice: premiumNaturalVoice, voiceType: 'natural' };
  }

  // 2. Second priority: Playful, friendly character voices
  const playfulVoice = candidatePool.find((v) => {
    const name = v.name.toLowerCase();
    return (
      name.includes('sandy') ||
      name.includes('flo') ||
      name.includes('shelley') ||
      name.includes('eddy') ||
      name.includes('reed')
    );
  });
  if (playfulVoice) {
    return { voice: playfulVoice, voiceType: 'playful' };
  }

  // 3. Third priority: Cheerful US/UK female voices
  const friendlyFemaleVoice = candidatePool.find((v) => {
    const name = v.name.toLowerCase();
    return (
      name.includes('ava') ||
      name.includes('jenny') ||
      name.includes('aria') ||
      name.includes('salli') ||
      name.includes('allison') ||
      name.includes('tessa') ||
      name.includes('kathy') ||
      name.includes('victoria') === false
    );
  });
  if (friendlyFemaleVoice) {
    return { voice: friendlyFemaleVoice, voiceType: 'standard' };
  }

  // 4. Default fallback: first available clean English voice
  const defaultEn = candidatePool.find((v) => v.lang.startsWith('en-US')) || candidatePool[0];
  return { voice: defaultEn || null, voiceType: 'standard' };
}

let activeSpeechTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Speaks English text using a cheerful, lively, and warm tone with kid-friendly intonation (높낮이가 살아있는 목소리)
 */
export function speakEnglish(text: string, onEnd?: () => void): void {
  if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  try {
    if (activeSpeechTimer) {
      clearTimeout(activeSpeechTimer);
      activeSpeechTimer = null;
    }
    window.speechSynthesis.cancel(); // cancel any active utterance

    // Clean up text:
    // 1. Handle foot(feet) pattern: e.g. "Draw 1 foot(feet)!" -> "Draw 1 foot!", "Draw 4 foot(feet)!" -> "Draw 4 feet!"
    let cleanText = text.replace(/(\b\d+\s+)foot\(feet\)/gi, (_match, countPrefix) => {
      const num = parseInt(countPrefix.trim(), 10);
      return num === 1 ? `${countPrefix}foot` : `${countPrefix}feet`;
    });

    // 2. If text contains e.g. "Draw 4 eye(s)!" or "1 nose(s)", convert to grammatically accurate speech:
    //    count === 1 -> singular ("1 nose")
    //    count > 1  -> plural ("4 eyes", "2 feet")
    cleanText = cleanText.replace(/(\b\d+\s+)([a-zA-Z]+)\(s\)/gi, (_match, countPrefix, baseWord) => {
      const num = parseInt(countPrefix.trim(), 10);
      const lower = baseWord.toLowerCase();
      if (num === 1) {
        return `${countPrefix}${baseWord}`;
      }
      if (lower === 'foot') {
        return `${countPrefix}feet`;
      }
      if (lower.endsWith('ch') || lower.endsWith('sh') || lower.endsWith('s') || lower.endsWith('x') || lower.endsWith('z')) {
        return `${countPrefix}${baseWord}es`;
      }
      return `${countPrefix}${baseWord}s`;
    });

    // 3. Remove any remaining dangling "(s)" or "(feet)"
    cleanText = cleanText.replace(/\(s\)/gi, '').replace(/\(feet\)/gi, '').replace(/\s+/g, ' ').trim();

    // Add lively punctuation cues if missing, giving natural rise and fall to the sentence
    if (!/[.!?]$/.test(cleanText)) {
      cleanText += '!';
    }

    activeSpeechTimer = setTimeout(() => {
      activeSpeechTimer = null;
      try {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'en-US';

        const rawVoices = window.speechSynthesis.getVoices();
        const voices = rawVoices.length > 0 ? rawVoices : cachedVoices;
        const { voice, voiceType } = getChildVoice(voices);

        if (voice) {
          utterance.voice = voice;
        }

        // Child-friendly dynamic pitch & rate:
        // - Rate: 0.88-0.92 gives bright energy without dragging or sounding like a sluggish robot
        // - Pitch: 1.28-1.35 creates a cheerful, animated "storybook teacher" intonation that children love
        if (voiceType === 'natural') {
          utterance.pitch = 1.26;
          utterance.rate = 0.90;
        } else if (voiceType === 'playful') {
          utterance.pitch = 1.18;
          utterance.rate = 0.92;
        } else {
          utterance.pitch = 1.32;
          utterance.rate = 0.89;
        }

        utterance.volume = 1.0;

        if (onEnd) {
          utterance.onend = () => onEnd();
          utterance.onerror = () => onEnd();
        }

        window.speechSynthesis.speak(utterance);
      } catch {
        if (onEnd) onEnd();
      }
    }, 40);
  } catch {
    if (onEnd) onEnd();
  }
}
