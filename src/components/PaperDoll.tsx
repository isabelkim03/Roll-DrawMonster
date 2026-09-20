import React from 'react';

interface PaperDollProps {
  gender?: 'girl' | 'boy';
  size?: number;
  className?: string;
}

/**
 * Authentic Classroom Paper Doll Mascot
 * Matches the paper doll cutout characters from the "My Body" flashcard reference image:
 * - Bold black outlines (stroke #1A1513)
 * - Warm tan skin
 * - White tank top and shorts
 * - Cute smiling line mouth, button nose, rounded fingers and toes
 */
export const PaperDoll: React.FC<PaperDollProps> = ({
  gender = 'girl',
  size = 140,
  className = ''
}) => {
  const isGirl = gender === 'girl';
  const skinColor = isGirl ? '#C6916B' : '#E5B896';
  const hairColor = isGirl ? '#23140C' : '#F6C15B';

  return (
    <svg
      width={size}
      height={size * 1.7}
      viewBox="0 0 100 170"
      fill="none"
      className={`shrink-0 ${className}`}
    >
      {/* Pigtails / Hair Back (Girl) */}
      {isGirl && (
        <>
          <path
            d="M20 34c-8 6-12 18-9 28 3 8 10 9 13 4 3-6 1-22-4-32z"
            fill={hairColor}
            stroke="#1A1513"
            strokeWidth="3.2"
          />
          <path
            d="M80 34c8 6 12 18 9 28-3 8-10 9-13 4-3-6-1-22 4-32z"
            fill={hairColor}
            stroke="#1A1513"
            strokeWidth="3.2"
          />
        </>
      )}

      {/* Legs */}
      {/* Left Leg */}
      <path
        d="M36 100v38c0 4-2 7-5 9-2 2-3 4-3 6 0 2 2 3 5 3h12c3 0 4-1 4-3 0-2-1-4-2-6-2-4-2-6-2-9v-38z"
        fill={skinColor}
        stroke="#1A1513"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Left Foot Toes */}
      <circle cx="28" cy="154" r="2.8" fill={skinColor} stroke="#1A1513" strokeWidth="2" />
      <circle cx="24" cy="153" r="2.3" fill={skinColor} stroke="#1A1513" strokeWidth="2" />
      <circle cx="21" cy="151" r="2" fill={skinColor} stroke="#1A1513" strokeWidth="2" />

      {/* Right Leg */}
      <path
        d="M64 100v38c0 4 2 7 5 9 2 2 3 4 3 6 0 2-2 3-5 3H55c-3 0-4-1-4-3 0-2 1-4 2-6 2-4 2-6 2-9v-38z"
        fill={skinColor}
        stroke="#1A1513"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Right Foot Toes */}
      <circle cx="72" cy="154" r="2.8" fill={skinColor} stroke="#1A1513" strokeWidth="2" />
      <circle cx="76" cy="153" r="2.3" fill={skinColor} stroke="#1A1513" strokeWidth="2" />
      <circle cx="79" cy="151" r="2" fill={skinColor} stroke="#1A1513" strokeWidth="2" />

      {/* Torso Base */}
      <path
        d="M32 50h36v54H32z"
        fill={skinColor}
        stroke="#1A1513"
        strokeWidth="3.2"
      />

      {/* White Clothes (Tank Top + Shorts) */}
      {/* Shorts */}
      <path
        d="M30 84h40v18H30z"
        fill="#FFFFFF"
        stroke="#1A1513"
        strokeWidth="3"
      />
      <line x1="50" y1="92" x2="50" y2="102" stroke="#1A1513" strokeWidth="2.5" />

      {/* Tank Top */}
      <path
        d="M30 50h40v36H30z"
        fill="#FFFFFF"
        stroke="#1A1513"
        strokeWidth="3"
      />
      {/* Tank Top Neckline */}
      <path
        d="M40 50c3 4 17 4 20 0"
        fill={skinColor}
        stroke="#1A1513"
        strokeWidth="2.5"
      />

      {/* Left Arm & Hand */}
      <path
        d="M32 52c-6 4-14 16-16 28-1 5 1 9 4 11 3 2 7 0 9-3 1-3 0-6 2-8 3-4 6-12 8-20z"
        fill={skinColor}
        stroke="#1A1513"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Hand fingers left */}
      <circle cx="18" cy="90" r="3" fill={skinColor} stroke="#1A1513" strokeWidth="2" />
      <circle cx="15" cy="88" r="2.5" fill={skinColor} stroke="#1A1513" strokeWidth="2" />

      {/* Right Arm & Hand */}
      <path
        d="M68 52c6 4 14 16 16 28 1 5-1 9-4 11-3 2-7 0-9-3-1-3 0-6-2-8-3-4-6-12-8-20z"
        fill={skinColor}
        stroke="#1A1513"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Hand fingers right */}
      <circle cx="82" cy="90" r="3" fill={skinColor} stroke="#1A1513" strokeWidth="2" />
      <circle cx="85" cy="88" r="2.5" fill={skinColor} stroke="#1A1513" strokeWidth="2" />

      {/* Neck */}
      <path
        d="M44 42h12v12H44z"
        fill={skinColor}
        stroke="#1A1513"
        strokeWidth="3"
      />

      {/* Head */}
      {/* Ears */}
      <circle cx="28" cy="28" r="5" fill={skinColor} stroke="#1A1513" strokeWidth="3" />
      <circle cx="72" cy="28" r="5" fill={skinColor} stroke="#1A1513" strokeWidth="3" />

      {/* Head Oval */}
      <ellipse
        cx="50"
        cy="28"
        rx="22"
        ry="20"
        fill={skinColor}
        stroke="#1A1513"
        strokeWidth="3.5"
      />

      {/* Hair (Boy vs Girl) */}
      {isGirl ? (
        <path
          d="M28 24c3-16 12-22 22-22s19 6 22 22c-5-5-12-7-22-7s-17 2-22 7z"
          fill={hairColor}
          stroke="#1A1513"
          strokeWidth="3"
        />
      ) : (
        <path
          d="M28 26c1-15 10-24 22-24 10 0 20 6 22 20-4-3-9-4-14-3-6 2-10 8-17 5-5-2-9 1-13 2z"
          fill={hairColor}
          stroke="#1A1513"
          strokeWidth="3"
        />
      )}

      {/* Eyes */}
      <ellipse cx="41" cy="26" rx="2.5" ry="3.5" fill="#1A1513" />
      <ellipse cx="59" cy="26" rx="2.5" ry="3.5" fill="#1A1513" />

      {/* Nose */}
      <ellipse cx="50" cy="30" rx="2" ry="1.5" fill="#8C4E2D" />

      {/* Smiling Mouth with Dimples (Paper Doll Smile) */}
      <path
        d="M42 35c2 4 14 4 16 0"
        stroke="#1A1513"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M41 34l-1 2" stroke="#1A1513" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M59 34l1 2" stroke="#1A1513" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
};
