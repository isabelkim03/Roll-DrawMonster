import React from 'react';
import { Sparkles, Zap, Feather } from 'lucide-react';

interface BodyPartIconProps {
  id: string;
  size?: number;
  className?: string;
}

/**
 * Authentic Classroom / ESL Flashcard Clipart Style
 * Matches the paper-doll educational worksheet aesthetic:
 * - Bold black cartoon lineart (stroke #1A1513 / #111)
 * - Warm tan/caramel paper-doll skin tones (#C6916B, #D8A27B, #EBB590)
 * - Clear, high-contrast anatomical elements (eyelashes, irises, red arrows, teeth, nails)
 */
export const BodyPartIcon: React.FC<BodyPartIconProps> = ({
  id,
  size = 64,
  className = ''
}) => {
  switch (id) {
    case 'eye':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Eyebrow */}
          <path
            d="M14 18c7-4 18-5 28-1"
            stroke="#20140E"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Upper Crease */}
          <path
            d="M16 23c7-3 18-3 25 0"
            stroke="#3D2015"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Upper Eyelashes (Radiating thick lashes like reference) */}
          <path d="M16 28l-4-5" stroke="#1A1513" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M21 26l-3-7" stroke="#1A1513" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M27 25l-1-7" stroke="#1A1513" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M33 25l1-7" stroke="#1A1513" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M39 26l3-7" stroke="#1A1513" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M45 28l5-5" stroke="#1A1513" strokeWidth="2.5" strokeLinecap="round" />

          {/* Eye White Sclera */}
          <path
            d="M10 33c6-9 16-13 22-13 8 0 17 5 22 13-5 8-14 13-22 13-6 0-16-4-22-13z"
            fill="#FFFFFF"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Blue Iris */}
          <circle cx="32" cy="33" r="10.5" fill="#2B6CB0" stroke="#1A1513" strokeWidth="2" />
          <circle cx="32" cy="33" r="8" fill="#3182CE" />
          {/* Iris inner streaks */}
          <circle cx="32" cy="33" r="6" fill="#1A365D" />

          {/* Pupil */}
          <circle cx="32" cy="33" r="4.5" fill="#0F172A" />

          {/* Bright White Catchlight / Glint */}
          <circle cx="35" cy="30" r="2.8" fill="#FFFFFF" />
          <circle cx="30" cy="35" r="1.3" fill="#FFFFFF" />

          {/* Lower Eyelashes */}
          <path d="M19 39l-2 5" stroke="#1A1513" strokeWidth="2" strokeLinecap="round" />
          <path d="M25 41l-1 5" stroke="#1A1513" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 42v5" stroke="#1A1513" strokeWidth="2" strokeLinecap="round" />
          <path d="M39 41l1 5" stroke="#1A1513" strokeWidth="2" strokeLinecap="round" />
          <path d="M45 39l2 5" stroke="#1A1513" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'ear':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Outer Ear Shell with warm paper-doll skin & thick black outline */}
          <path
            d="M22 10c14 0 24 8 24 23 0 12-6 20-13 23-5 2-9 2-12-1-3-4-3-10-2-14"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Soft skin shadow along inner edge */}
          <path
            d="M26 15c10 0 17 6 17 18 0 9-4 15-9 18"
            fill="none"
            stroke="#BB7B54"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Inner Ear Fold (Antihelix) with bold black outline */}
          <path
            d="M27 18c7 2 11 6 11 13 0 6-3 10-8 12"
            fill="none"
            stroke="#1A1513"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Dark inner canal / cavity */}
          <path
            d="M25 31c3 0 5 3 4 6-2 3-5 3-6 1"
            fill="#4A2518"
            stroke="#1A1513"
            strokeWidth="2"
          />
          {/* Tragus bump */}
          <path
            d="M22 28c3 1 4 4 2 7"
            fill="none"
            stroke="#1A1513"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'mouth':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Smiling Lips with Teeth and Tongue (combination of "lips", "teeth", "tongue" in photo) */}
          {/* Inner mouth cavity */}
          <path
            d="M12 30c3-3 12-5 20-5s17 2 20 5c-2 13-10 18-20 18S14 43 12 30z"
            fill="#7C1A2A"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Row of white teeth */}
          <path
            d="M15 30c4-2 10-3 17-3s13 1 17 3c0 4-4 7-17 7S15 34 15 30z"
            fill="#FFFFFF"
            stroke="#1A1513"
            strokeWidth="2"
          />
          {/* Teeth separation lines */}
          <line x1="26" y1="28" x2="26" y2="35" stroke="#1A1513" strokeWidth="1.6" />
          <line x1="32" y1="28" x2="32" y2="36" stroke="#1A1513" strokeWidth="1.6" />
          <line x1="38" y1="28" x2="38" y2="35" stroke="#1A1513" strokeWidth="1.6" />
          {/* Pink tongue poking up */}
          <path
            d="M23 37c2 5 16 5 18 0-3-3-15-3-18 0z"
            fill="#F47285"
            stroke="#1A1513"
            strokeWidth="2"
          />
          {/* Upper Lip with Cupid's Bow */}
          <path
            d="M11 30c5-6 13-6 21-3 8-3 16-3 21 3-5 3-13 3-21 2s-16 1-21-2z"
            fill="#E06A7C"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Lower Lip */}
          <path
            d="M16 41c5 6 17 6 22 0-3 4-13 5-22 0z"
            fill="#D9536B"
            stroke="#1A1513"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'nose':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Vertical nose bridge expanding to nostrils (exactly like "nose" in photo) */}
          <path
            d="M27 12h10v22c4 1 8 4 8 8 0 4-4 8-13 8s-13-4-13-8c0-4 4-7 8-8V12z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Nostril wing curved crease lines */}
          <path
            d="M19 42c0-3 3-5 6-4"
            stroke="#1A1513"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M45 42c0-3-3-5-6-4"
            stroke="#1A1513"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Dark oval nostrils */}
          <ellipse cx="26" cy="44" rx="3.5" ry="2.2" fill="#3D1D10" stroke="#1A1513" strokeWidth="1.5" />
          <ellipse cx="38" cy="44" rx="3.5" ry="2.2" fill="#3D1D10" stroke="#1A1513" strokeWidth="1.5" />
          {/* Nose tip highlight */}
          <ellipse cx="32" cy="40" rx="4.5" ry="2.8" fill="#FFF2EB" />
          {/* Nose bridge highlight */}
          <path d="M32 16v16" stroke="#FFF2EB" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'head':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Dark pigtails on sides (like paper doll girl in photo) */}
          <path
            d="M14 26c-5 4-8 12-6 19 2 6 7 7 9 3 2-4 1-14-3-22z"
            fill="#2B1810"
            stroke="#1A1513"
            strokeWidth="2.5"
          />
          <path
            d="M50 26c5 4 8 12 6 19-2 6-7 7-9 3-2-4-1-14 3-22z"
            fill="#2B1810"
            stroke="#1A1513"
            strokeWidth="2.5"
          />
          {/* Neck */}
          <path
            d="M26 44v10h12V44z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="2.5"
          />
          {/* Ears */}
          <circle cx="15" cy="35" r="4.5" fill="#D8A27B" stroke="#1A1513" strokeWidth="2.5" />
          <circle cx="49" cy="35" r="4.5" fill="#D8A27B" stroke="#1A1513" strokeWidth="2.5" />
          {/* Head Shape */}
          <ellipse
            cx="32"
            cy="34"
            rx="18"
            ry="16"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3.2"
          />
          {/* Dark hair on top */}
          <path
            d="M14 31c2-12 10-18 18-18s16 6 18 18c-4-4-9-6-18-6s-14 2-18 6z"
            fill="#2B1810"
            stroke="#1A1513"
            strokeWidth="2.5"
          />
          {/* Big smiling cartoon paper doll eyes */}
          <ellipse cx="25" cy="33" rx="2.5" ry="3" fill="#1A1513" />
          <ellipse cx="39" cy="33" rx="2.5" ry="3" fill="#1A1513" />
          {/* Cute button nose */}
          <ellipse cx="32" cy="36" rx="1.8" ry="1.2" fill="#A8623D" />
          {/* Smiling curved mouth line with cheek dimples (like reference character) */}
          <path
            d="M26 40c2 3 10 3 12 0"
            stroke="#1A1513"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M25 39l-1 2" stroke="#1A1513" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M39 39l1 2" stroke="#1A1513" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'chin':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Lower Face & Chin with Red Pointer Arrow */}
          {/* Cheeks & Chin contour */}
          <path
            d="M12 18c2 14 10 32 20 32s18-18 20-32"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Friendly smiling lips above chin */}
          <path
            d="M24 24c3 3 13 3 16 0"
            stroke="#1A1513"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M25 24c2-2 5-3 7-3s5 1 7 3"
            fill="#E06A7C"
            stroke="#1A1513"
            strokeWidth="1.8"
          />
          {/* Chin dimple / curve */}
          <path
            d="M29 38c1.5 1.5 4.5 1.5 6 0"
            stroke="#8C4E2D"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Bold Red Arrow pointing directly to the chin */}
          <polygon
            points="14,40 24,40 24,35 34,43 24,51 24,46 14,46"
            fill="#E53E3E"
            stroke="#1A1513"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'arm':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* White T-shirt Sleeve at Shoulder (Educational paper-doll style) */}
          <path
            d="M4 16c3-3 10-2 14 1l-3 14c-4 1-8 1-11-1z"
            fill="#FFFFFF"
            stroke="#1A1513"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Sleeve inner hem shadow */}
          <path d="M7 29c3 1 7 1 10-1" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />

          {/* Full Arm from Shoulder/Sleeve to Forearm and Hand */}
          <path
            d="M14 25
               C 18 26, 22 27, 26 28
               C 30 29, 34 31, 38 33
               C 40 34, 42 34, 44 35
               C 48 37, 52 38, 56 40
               C 58 41, 58 43, 57 45
               C 55 47, 51 47, 47 45
               C 44 44, 42 43, 40 43
               C 36 44, 30 44, 25 43
               C 20 42, 15 37, 10 30
               Z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Hand & Fingers details at the end of the arm */}
          {/* Thumb separating line */}
          <path
            d="M43 35c2 2 4 4 4 7"
            stroke="#1A1513"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Finger separation lines */}
          <path d="M49 39l6 1.5" stroke="#1A1513" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M48 42l5 1" stroke="#1A1513" strokeWidth="1.6" strokeLinecap="round" />
          {/* Cute fingernail highlights */}
          <path d="M55 40c1 0 1 1 0 1.5" stroke="#FFF2EC" strokeWidth="2" strokeLinecap="round" />
          <path d="M54 43c1 0 1 1 0 1.5" stroke="#FFF2EC" strokeWidth="2" strokeLinecap="round" />

          {/* Wrist crease */}
          <path
            d="M39 34c0 3 0 6-1 8"
            stroke="#A8623D"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Elbow crease inside arm */}
          <path
            d="M26 29c1 3 1 6-1 8"
            stroke="#A8623D"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* BOLD RED POINTER ARROW pointing right at the ARM (Upper Arm / Mid-Arm) */}
          <polygon
            points="21,3 29,3 29,14 36,14 25,26 14,14 21,14"
            fill="#E53E3E"
            stroke="#1A1513"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Arrow subtle 3D highlight */}
          <path d="M23 5h3v8" stroke="#FEB2B2" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'hand':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Fully Spread Open Hand (5 fingers fully extended, high-five style) */}
          {/* Wrist Base */}
          <path
            d="M26 60h12v-8c0-2-1-4-2-6H28c-1 2-2 4-2 6v8z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="2.5"
          />

          {/* Palm and 5 Fully Spread Fingers */}
          <path
            d="M26 48
               c-4-2-10-5-15-11-3-4-1-8 4-8 4 0 8 5 12 9
               V17
               c0-4 5-4 5 0
               v17
               V10
               c0-4 5-4 5 0
               v24
               V14
               c0-4 5-4 5 0
               v21
               V22
               c0-4 5-4 5 0
               c0 9-1 18-9 26
               z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Fingernails for all 5 fingers */}
          {/* Thumb nail */}
          <path d="M14 31c-1-1 0-3 2-2l2 2" stroke="#FFF2EC" strokeWidth="2" strokeLinecap="round" />
          {/* Index nail */}
          <path d="M29 13c1-2 3-2 4 0" stroke="#FFF2EC" strokeWidth="2" strokeLinecap="round" />
          {/* Middle nail */}
          <path d="M35 6c1-2 3-2 4 0" stroke="#FFF2EC" strokeWidth="2" strokeLinecap="round" />
          {/* Ring nail */}
          <path d="M41 10c1-2 3-2 4 0" stroke="#FFF2EC" strokeWidth="2" strokeLinecap="round" />
          {/* Pinky nail */}
          <path d="M47 18c1-2 3-2 4 0" stroke="#FFF2EC" strokeWidth="2" strokeLinecap="round" />

          {/* Palm creases */}
          <path
            d="M24 37c5 4 12 3 17-2"
            stroke="#A8623D"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M25 43c4 3 11 2 15-2"
            stroke="#A8623D"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'thumb':
    case 'finger':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Thumbs Up (matching the "thumb" card in the reference photo) */}
          {/* Wrist Base */}
          <path
            d="M16 48c0 4 2 8 4 10h12c2-2 3-6 3-10"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="2.5"
          />

          {/* Curled 4 fingers on the right (knuckles stacked like reference) */}
          {/* Index curled */}
          <path
            d="M34 26c4-1 12-1 14 3s0 6-4 6h-10"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Middle curled */}
          <path
            d="M34 35c5-1 13-1 15 3s-1 6-5 6h-10"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Ring curled */}
          <path
            d="M34 44c5-1 12-1 14 3s-1 5-5 5h-9"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Pinky curled */}
          <path
            d="M34 52c4-1 10-1 11 3s-2 5-6 5h-6"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Hand palm base */}
          <path
            d="M20 30c-2 6-2 16 0 24h15V28c-5-2-11 0-15 2z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Upright Thumb pointing straight up! (Thumbs-up) */}
          <path
            d="M22 34c0-7 2-14 3-21 1-5 5-7 9-5s5 5 4 10l-2 15"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Thumbnail on upright thumb */}
          <path
            d="M27 10c1-2 3-3 5-2s3 3 2 5l-1 4h-5l-1-7z"
            fill="#FFF2EC"
            stroke="#1A1513"
            strokeWidth="1.8"
          />

          {/* Thumb knuckle creases */}
          <line x1="26" y1="20" x2="33" y2="21" stroke="#1A1513" strokeWidth="2" strokeLinecap="round" />
          <line x1="25" y1="28" x2="33" y2="29" stroke="#1A1513" strokeWidth="2" strokeLinecap="round" />

          {/* Finger nail hints on curled fingers */}
          <path d="M44 28c1 1 2 2 1 3" stroke="#FFF2EC" strokeWidth="2" strokeLinecap="round" />
          <path d="M45 37c1 1 2 2 1 3" stroke="#FFF2EC" strokeWidth="2" strokeLinecap="round" />
          <path d="M44 46c1 1 2 2 1 3" stroke="#FFF2EC" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'tongue':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Tongue Card exactly matching the reference photo */}
          {/* Dark inner mouth cavity */}
          <path
            d="M14 26c4-3 12-4 18-4s14 1 18 4c0 10-6 16-18 16s-18-6-18-16z"
            fill="#54121F"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Upper teeth peek */}
          <path
            d="M20 26c3-1 8-2 12-2s9 1 12 2c0 2-2 3-12 3s-12-1-12-3z"
            fill="#FFFFFF"
            stroke="#1A1513"
            strokeWidth="1.8"
          />

          {/* Sticking out Tongue (pink, rounded tip, center midline) */}
          <path
            d="M22 28c0 0-1 12 1 18 2 6 6 10 9 10s7-4 9-10c2-6 1-18 1-18z"
            fill="#F47285"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Tongue center groove line */}
          <line
            x1="32"
            y1="30"
            x2="32"
            y2="48"
            stroke="#D94862"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Tongue highlight shine */}
          <ellipse cx="27" cy="42" rx="2" ry="4" fill="#FFA5B5" />

          {/* Upper Lip with Cupid's Bow */}
          <path
            d="M12 26c6-4 13-4 20-2 7-2 14-2 20 2-5 3-12 2-20 2s-15 1-20-2z"
            fill="#D9536B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Lower Lip sides */}
          <path
            d="M14 27c3 8 7 11 10 11M40 38c3 0 7-3 10-11"
            fill="none"
            stroke="#1A1513"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'hair':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Person Head with Red Arrow pointing directly to the Hair */}
          {/* Neck */}
          <path d="M28 50v8h8v-8z" fill="#D8A27B" stroke="#1A1513" strokeWidth="2.5" />

          {/* Ears */}
          <circle cx="18" cy="40" r="4" fill="#D8A27B" stroke="#1A1513" strokeWidth="2.5" />
          <circle cx="46" cy="40" r="4" fill="#D8A27B" stroke="#1A1513" strokeWidth="2.5" />

          {/* Face */}
          <ellipse cx="32" cy="39" rx="15" ry="14" fill="#D8A27B" stroke="#1A1513" strokeWidth="3" />

          {/* Cute face features */}
          <circle cx="26" cy="38" r="2" fill="#1A1513" />
          <circle cx="38" cy="38" r="2" fill="#1A1513" />
          <ellipse cx="32" cy="41" rx="1.5" ry="1" fill="#8C4E2D" />
          <path d="M28 44c2 2 6 2 8 0" stroke="#1A1513" strokeWidth="2.2" strokeLinecap="round" />

          {/* Voluminous Brown Hair (covering top and sides of head) */}
          <path
            d="M17 38c-2-8 0-18 8-22 5-2 12-2 16 2 6 5 8 12 6 20-3-4-8-7-15-7s-12 3-15 7z"
            fill="#4A2810"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Hair strands & highlight */}
          <path d="M24 22c4-3 10-3 14 0" stroke="#7A451E" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 28c3-2 6-3 9-2" stroke="#7A451E" strokeWidth="1.8" strokeLinecap="round" />

          {/* Bold Red Arrow pointing directly to the Hair */}
          <polygon
            points="6,12 16,12 16,6 25,16 16,26 16,20 6,20"
            fill="#E53E3E"
            stroke="#1A1513"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'knee':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Bent Leg at 90 degrees with RED ARROW pointing to the knee (like "elbow" card in reference!) */}
          <path
            d="M10 20h24c6 0 12 4 14 10 2 5 2 11 2 18h-11c0-6 0-10-1-13-1-3-3-5-6-5H10z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Knee joint crease */}
          <path
            d="M30 30c-2 2-2 4-2 6"
            stroke="#A8623D"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* BOLD RED ARROW pointing right at the knee joint! */}
          <polygon
            points="24,36 34,44 24,52 24,46 12,46 12,42 24,42"
            fill="#E53E3E"
            stroke="#1A1513"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Knee cap circle */}
          <circle cx="45" cy="28" r="5" fill="#FFEFE7" stroke="#1A1513" strokeWidth="2" />
        </svg>
      );

    case 'leg':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Human Legs: Paper-doll style with shorts and pair of legs */}
          {/* White shorts at top */}
          <path
            d="M16 6h32v14H16z"
            fill="#FFFFFF"
            stroke="#1A1513"
            strokeWidth="3"
          />
          {/* Shorts crotch slit */}
          <line x1="32" y1="13" x2="32" y2="20" stroke="#1A1513" strokeWidth="2.5" />

          {/* Left Human Leg */}
          <path
            d="M20 20v24c0 3-1 6-4 8-2 1-3 3-3 5 0 2 2 3 5 3h9c3 0 4-1 4-3 0-2-1-3-1-5-2-3-2-5-2-8V20z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Left Toes */}
          <circle cx="15" cy="56" r="2.2" fill="#D8A27B" stroke="#1A1513" strokeWidth="1.8" />
          <circle cx="12" cy="55" r="1.8" fill="#D8A27B" stroke="#1A1513" strokeWidth="1.8" />

          {/* Right Human Leg */}
          <path
            d="M44 20v24c0 3 1 6 4 8 2 1 3 3 3 5 0 2-2 3-5 3h-9c-3 0-4-1-4-3 0-2 1-3 1-5 2-3 2-5 2-8V20z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Right Toes */}
          <circle cx="49" cy="56" r="2.2" fill="#D8A27B" stroke="#1A1513" strokeWidth="1.8" />
          <circle cx="52" cy="55" r="1.8" fill="#D8A27B" stroke="#1A1513" strokeWidth="1.8" />

          {/* Knees contour lines */}
          <path d="M22 34c2 1 4 1 5 0" stroke="#A8623D" strokeWidth="2" strokeLinecap="round" />
          <path d="M37 34c2 1 4 1 5 0" stroke="#A8623D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'foot':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Cartoon paper doll feet with cute rounded toes (like character in photo) */}
          {/* Left Foot Sole */}
          <ellipse cx="22" cy="44" rx="6" ry="7" fill="#D8A27B" stroke="#1A1513" strokeWidth="2.5" />
          <path
            d="M16 26c0 8 2 13 6 18 4-5 5-10 5-18s-3-6-6-6-5 2-5 6z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="2.5"
          />
          {/* 5 Rounded Toes Left with outlines */}
          <circle cx="24" cy="14" r="3.5" fill="#D8A27B" stroke="#1A1513" strokeWidth="2" />
          <circle cx="19" cy="15" r="2.8" fill="#D8A27B" stroke="#1A1513" strokeWidth="2" />
          <circle cx="15" cy="17" r="2.4" fill="#D8A27B" stroke="#1A1513" strokeWidth="2" />
          <circle cx="12" cy="20" r="2" fill="#D8A27B" stroke="#1A1513" strokeWidth="2" />
          <circle cx="10" cy="23" r="1.8" fill="#D8A27B" stroke="#1A1513" strokeWidth="2" />

          {/* Right Foot Sole */}
          <ellipse cx="42" cy="44" rx="6" ry="7" fill="#D8A27B" stroke="#1A1513" strokeWidth="2.5" />
          <path
            d="M48 26c0 8-2 13-6 18-4-5-5-10-5-18s3-6 6-6 5 2 5 6z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="2.5"
          />
          {/* 5 Rounded Toes Right with outlines */}
          <circle cx="40" cy="14" r="3.5" fill="#D8A27B" stroke="#1A1513" strokeWidth="2" />
          <circle cx="45" cy="15" r="2.8" fill="#D8A27B" stroke="#1A1513" strokeWidth="2" />
          <circle cx="49" cy="17" r="2.4" fill="#D8A27B" stroke="#1A1513" strokeWidth="2" />
          <circle cx="52" cy="20" r="2" fill="#D8A27B" stroke="#1A1513" strokeWidth="2" />
          <circle cx="54" cy="23" r="1.8" fill="#D8A27B" stroke="#1A1513" strokeWidth="2" />
        </svg>
      );

    case 'toe':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Foot front with 5 clear distinct individual toes and cute toenails! */}
          {/* Ball of foot */}
          <path
            d="M10 38c3 12 12 16 24 16 10 0 17-4 20-11-4 2-11 3-20 1-8-2-18-4-24-6z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
          />
          {/* Big Toe */}
          <ellipse cx="18" cy="26" rx="6" ry="8" fill="#D8A27B" stroke="#1A1513" strokeWidth="2.8" />
          <path d="M15 22c0-2 2-3 3-3s3 1 3 3v2h-6v-2z" fill="#FFF2EB" stroke="#1A1513" strokeWidth="1.6" />
          {/* Second Toe */}
          <ellipse cx="28" cy="27" rx="5" ry="7" fill="#D8A27B" stroke="#1A1513" strokeWidth="2.8" />
          <path d="M26 23c0-2 2-3 2-3s2 1 2 3v2h-4v-2z" fill="#FFF2EB" stroke="#1A1513" strokeWidth="1.6" />
          {/* Third Toe */}
          <ellipse cx="37" cy="29" rx="4.5" ry="6.5" fill="#D8A27B" stroke="#1A1513" strokeWidth="2.8" />
          <path d="M35 25c0-1 2-2 2-2s2 1 2 2v2h-4v-2z" fill="#FFF2EB" stroke="#1A1513" strokeWidth="1.6" />
          {/* Fourth Toe */}
          <ellipse cx="45" cy="32" rx="4" ry="5.5" fill="#D8A27B" stroke="#1A1513" strokeWidth="2.8" />
          <path d="M43 29c0-1 2-2 2-2s2 1 2 2v1.5h-4v-1.5z" fill="#FFF2EB" stroke="#1A1513" strokeWidth="1.6" />
          {/* Pinky Toe */}
          <ellipse cx="51" cy="35" rx="3.5" ry="4.8" fill="#D8A27B" stroke="#1A1513" strokeWidth="2.8" />
          <path d="M49 33c0-1 1.5-1.5 2-1.5s2 .5 2 1.5v1.5h-4v-1.5z" fill="#FFF2EB" stroke="#1A1513" strokeWidth="1.6" />
        </svg>
      );

    case 'neck':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Chin contour */}
          <path
            d="M20 14c6 5 18 5 24 0"
            fill="none"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Neck with shoulders base */}
          <path
            d="M24 16v18c-4 3-8 6-12 10v8h40v-8c-4-4-8-7-12-10v-18z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Red arrow pointing to neck */}
          <polygon
            points="14,24 24,30 14,36 14,32 4,32 4,28 14,28"
            fill="#E53E3E"
            stroke="#1A1513"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Clavicle line */}
          <path
            d="M24 43c4-2 6-2 8 0 4-2 6-2 8 0"
            stroke="#1A1513"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'shoulder':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Upper torso & shoulders wearing the paper-doll tank top */}
          <path
            d="M26 12v10c-6 2-15 4-20 14v18h52v-18c-5-10-14-12-20-14v-10z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* White tank top vest (like the paper doll clothes in the photo!) */}
          <path
            d="M12 36c6-2 10 4 20 4s14-6 20-4v18H12v-18z"
            fill="#FFFFFF"
            stroke="#1A1513"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Tank top straps */}
          <path d="M18 22v14" stroke="#1A1513" strokeWidth="2.5" />
          <path d="M46 22v14" stroke="#1A1513" strokeWidth="2.5" />
          {/* Shoulder curve lines */}
          <path d="M12 28c4-3 10-3 14 0" stroke="#1A1513" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M52 28c-4-3-10-3-14 0" stroke="#1A1513" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'waist':
    case 'belly':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          {/* Torso with defined waistline and stylish belt/band */}
          <path
            d="M14 10
               c 5 10, 6 18, 4 24
               c 4 2, 7 3, 14 3
               s 10 -1, 14 -3
               c -2 -6, -1 -14, 4 -24
               Z"
            fill="#D8A27B"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Lower hips & cute shorts */}
          <path
            d="M18 34
               c 0 8, 2 16, 5 22
               h 18
               c 3 -6, 5 -14, 5 -22
               c -5 2, -10 3, -14 3
               s -9 -1, -14 -3
               Z"
            fill="#FFFFFF"
            stroke="#1A1513"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Waist belt / waistband */}
          <path
            d="M16 32 c 4 3, 10 4, 16 4 s 12 -1, 16 -4"
            stroke="#E11D48"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Navel / center marker */}
          <circle cx="32" cy="27" r="2" fill="#A8623D" />

          {/* Bold Red Arrows pointing directly to both sides of the WAIST */}
          <polygon
            points="6,32 14,28 14,31 16,31 16,33 14,33 14,36"
            fill="#E53E3E"
            stroke="#1A1513"
            strokeWidth="1.6"
          />
          <polygon
            points="58,32 50,28 50,31 48,31 48,33 50,33 50,36"
            fill="#E53E3E"
            stroke="#1A1513"
          />
        </svg>
      );

    case 'horn':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          <path
            d="M20 50c-2-16 6-32 24-38-6 10-5 24 2 38z"
            fill="#F6E05E"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <line x1="23" y1="40" x2="39" y2="44" stroke="#1A1513" strokeWidth="2.5" />
          <line x1="26" y1="30" x2="37" y2="34" stroke="#1A1513" strokeWidth="2.5" />
        </svg>
      );

    case 'tail':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          <path
            d="M12 46c10-2 16-16 32-14 8 1 10 10 10 10s-7 2-12-3c-5-5-10 1-15 5-3 3-8 4-15 2z"
            fill="#B794F4"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'wing':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          <path
            d="M14 44c4-18 20-30 38-30-2 10-8 18-18 22 10 0 14 6 12 10-6 2-14-1-18-4 4 6 2 12-2 13-6 1-10-5-12-11z"
            fill="#63B3ED"
            stroke="#1A1513"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return <Sparkles size={size} className={`text-amber-500 ${className}`} />;
  }
};
