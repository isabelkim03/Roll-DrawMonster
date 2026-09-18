// Audio helper for TTS and Web Audio synth effects

let isMuted = false;
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
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

// Cache voices when available
let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

/**
 * Selects the best available child or youthful voice for speech synthesis
 */
function getChildVoice(voices: SpeechSynthesisVoice[]): { voice: SpeechSynthesisVoice | null; isNativeChild: boolean } {
  if (!voices || voices.length === 0) {
    return { voice: null, isNativeChild: false };
  }

  const enVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
  const candidatePool = enVoices.length > 0 ? enVoices : voices;

  // 1. Look for native child / kid / junior / young voices
  const nativeChildVoice = candidatePool.find((v) => {
    const name = v.name.toLowerCase();
    return (
      name.includes('child') ||
      name.includes('kid') ||
      name.includes('junior') ||
      name.includes('ana') ||
      name.includes('maisie') ||
      name.includes('young')
    );
  });
  if (nativeChildVoice) {
    return { voice: nativeChildVoice, isNativeChild: true };
  }

  // 2. Look for bright, youthful female voices (Flo, Sandy, Jenny, Samantha, Natural)
  const youthfulVoice = candidatePool.find((v) => {
    const name = v.name.toLowerCase();
    return (
      name.includes('flo') ||
      name.includes('sandy') ||
      name.includes('jenny') ||
      name.includes('samantha') ||
      name.includes('natural') ||
      name.includes('victoria') ||
      name.includes('karen')
    );
  });
  if (youthfulVoice) {
    return { voice: youthfulVoice, isNativeChild: false };
  }

  // 3. Fallback to Google US English or default
  const defaultEnVoice = candidatePool.find(
    (v) => v.name.toLowerCase().includes('google') || v.default
  );
  return { voice: defaultEnVoice || candidatePool[0] || null, isNativeChild: false };
}

/**
 * Speaks English text using a cheerful, bright child voice (어린이 목소리)
 */
export function speakEnglish(text: string, onEnd?: () => void): void {
  if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel(); // cancel any active utterance

    // Small delay ensures Chrome/Safari speech queue clears without dropping the next utterance
    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';

        const voices =
          cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
        const { voice, isNativeChild } = getChildVoice(voices);

        if (voice) {
          utterance.voice = voice;
        }

        // Child voice tuning:
        // Native child voices (like Apple 'Junior' or Azure 'Ana') already have higher pitch
        // Standard voices (Samantha, Jenny, Google) need pitch=1.45 to sound like an enthusiastic, cute child
        utterance.pitch = isNativeChild ? 1.25 : 1.46;
        utterance.rate = 0.95; // Lively, clear child tempo
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

/**
 * Synthesizes a playful sound effect using Web Audio API
 */
export function playClick(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // ignore
  }
}

export function playDiceRoll(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const timeOffset = i * 0.08 + Math.random() * 0.03;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200 + Math.random() * 400, now + timeOffset);

      gain.gain.setValueAtTime(0.15, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + 0.06);
    }
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
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 xylophone / bell
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.09;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.36);
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
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(240, now + 0.2);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.21);
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
    const freqs = [784, 988, 1175, 1568]; // G5, B5, D6, G6
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const st = now + i * 0.07;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, st);

      gain.gain.setValueAtTime(0.18, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(st);
      osc.stop(st + 0.3);
    });
  } catch {
    // ignore
  }
}
