import React from 'react';

interface BodyPartIconProps {
  id: string;
  className?: string;
  size?: number;
}

export const BodyPartIcon: React.FC<BodyPartIconProps> = ({ id, className = '', size = 64 }) => {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: `inline-block ${className}`
  };

  switch (id) {
    case 'head':
      return (
        <svg {...commonProps}>
          {/* Friendly human head with face outline and smile */}
          <circle cx="50" cy="50" r="38" fill="#FDE68A" stroke="#1E293B" strokeWidth="5" />
          {/* Hair top */}
          <path d="M22 38 C28 20 72 20 78 38 C68 32 55 35 48 30 C40 35 30 32 22 38 Z" fill="#78350F" stroke="#1E293B" strokeWidth="3" />
          {/* Eyes */}
          <circle cx="38" cy="48" r="4.5" fill="#1E293B" />
          <circle cx="62" cy="48" r="4.5" fill="#1E293B" />
          {/* Smile */}
          <path d="M40 64 Q50 72 60 64" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          {/* Rosy cheeks */}
          <circle cx="32" cy="56" r="4" fill="#F472B6" opacity="0.6" />
          <circle cx="68" cy="56" r="4" fill="#F472B6" opacity="0.6" />
        </svg>
      );

    case 'hair':
      return (
        <svg {...commonProps}>
          {/* Funky lively hair style */}
          <path d="M16 65 C12 35 30 15 50 15 C70 15 88 35 84 65 C76 55 70 60 62 48 C55 58 45 52 38 48 C30 60 24 55 16 65 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="5" strokeLinejoin="round" />
          <path d="M40 22 C48 18 52 28 60 22" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
          {/* Head silhouette underneath */}
          <path d="M28 60 Q50 82 72 60" stroke="#CBD5E1" strokeWidth="4" strokeDasharray="3 3" />
        </svg>
      );

    case 'eyes':
      return (
        <svg {...commonProps}>
          {/* Two bright round human eyes with sparkles */}
          <ellipse cx="32" cy="50" rx="18" ry="22" fill="#FFFFFF" stroke="#1E293B" strokeWidth="5" />
          <ellipse cx="68" cy="50" rx="18" ry="22" fill="#FFFFFF" stroke="#1E293B" strokeWidth="5" />
          <circle cx="33" cy="50" r="9" fill="#2563EB" />
          <circle cx="69" cy="50" r="9" fill="#2563EB" />
          <circle cx="35" cy="47" r="3.5" fill="#FFFFFF" />
          <circle cx="71" cy="47" r="3.5" fill="#FFFFFF" />
          {/* Eyebrows */}
          <path d="M18 32 Q32 25 44 32" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          <path d="M56 32 Q68 25 82 32" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'ears':
      return (
        <svg {...commonProps}>
          {/* Pair of human ears */}
          <path d="M22 35 C12 42 12 62 24 70 C28 68 28 58 26 50 C26 42 28 38 22 35 Z" fill="#FDE68A" stroke="#1E293B" strokeWidth="5" strokeLinejoin="round" />
          <path d="M20 48 Q24 55 20 62" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          
          <path d="M78 35 C88 42 88 62 76 70 C72 68 72 58 74 50 C74 42 72 38 78 35 Z" fill="#FDE68A" stroke="#1E293B" strokeWidth="5" strokeLinejoin="round" />
          <path d="M80 48 Q76 55 80 62" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />

          {/* Dotted face guide */}
          <ellipse cx="50" cy="52" rx="24" ry="28" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="3 3" />
        </svg>
      );

    case 'nose':
      return (
        <svg {...commonProps}>
          {/* Face silhouette context */}
          <circle cx="50" cy="50" r="38" fill="#FFFBEB" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="4 3" />

          {/* Light eyes for context */}
          <circle cx="34" cy="38" r="4.5" fill="#94A3B8" />
          <circle cx="66" cy="38" r="4.5" fill="#94A3B8" />
          {/* Light smile for context */}
          <path d="M40 76 Q50 82 60 76" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

          {/* Yellow glow behind the nose */}
          <ellipse cx="50" cy="54" rx="18" ry="16" fill="#FDE68A" opacity="0.45" />

          {/* Bold, prominent cute Human Nose */}
          <path
            d="M50 26 C48 38 43 46 39 54 C38 58 41 62 46 62 C48 62 49 61 50 61 C51 61 52 62 54 62 C59 62 62 58 61 54 C57 46 52 38 50 26 Z"
            fill="#FDE68A"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Nose Tip Round Ball */}
          <circle cx="50" cy="53" r="8.5" fill="#FBBF24" stroke="#1E293B" strokeWidth="3" />
          {/* Cute Nostrils */}
          <ellipse cx="43" cy="56" rx="2.5" ry="3.5" fill="#92400E" />
          <ellipse cx="57" cy="56" rx="2.5" ry="3.5" fill="#92400E" />
          {/* Nose highlight sparkle */}
          <circle cx="48" cy="50" r="2" fill="#FFFFFF" />

          {/* Red Pointer Arrows pointing directly to NOSE */}
          <g>
            <path d="M16 53 L31 53" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            <polygon points="35,53 27,47 27,59" fill="#EF4444" />
          </g>
          <g>
            <path d="M84 53 L69 53" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            <polygon points="65,53 73,47 73,59" fill="#EF4444" />
          </g>
        </svg>
      );

    case 'mouth':
      return (
        <svg {...commonProps}>
          {/* Big cheerful smiling mouth */}
          <path d="M18 45 Q50 90 82 45 Q50 55 18 45 Z" fill="#EF4444" stroke="#1E293B" strokeWidth="5" strokeLinejoin="round" />
          <path d="M36 68 Q50 60 64 68 Q50 82 36 68 Z" fill="#F87171" />
          <path d="M14 43 C18 40 24 45 24 47" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          <path d="M86 43 C82 40 76 45 76 47" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'teeth':
      return (
        <svg {...commonProps}>
          {/* Big cheerful smiling mouth outline with vibrant pink lips */}
          <path
            d="M14 48 C20 28 80 28 86 48 C86 78 14 78 14 48 Z"
            fill="#BE123C"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Upper Pink Gum */}
          <path d="M20 42 Q50 35 80 42 Q50 45 20 42 Z" fill="#FDA4AF" />
          {/* Lower Pink Gum */}
          <path d="M22 66 Q50 72 78 66 Q50 63 22 66 Z" fill="#FDA4AF" />

          {/* Upper Row of Pristine White Teeth */}
          <g stroke="#1E293B" strokeWidth="2.5" fill="#FFFFFF">
            <rect x="23" y="40" width="8" height="12" rx="2.5" />
            <rect x="32" y="38" width="9" height="14" rx="2.5" />
            <rect x="42" y="37" width="8" height="15" rx="2.5" />
            <rect x="50" y="37" width="8" height="15" rx="2.5" />
            <rect x="59" y="38" width="9" height="14" rx="2.5" />
            <rect x="69" y="40" width="8" height="12" rx="2.5" />
          </g>

          {/* Lower Row of White Teeth */}
          <g stroke="#1E293B" strokeWidth="2.5" fill="#FFFFFF">
            <rect x="25" y="55" width="8" height="11" rx="2.5" />
            <rect x="34" y="54" width="8" height="12" rx="2.5" />
            <rect x="43" y="53" width="7" height="13" rx="2.5" />
            <rect x="50" y="53" width="7" height="13" rx="2.5" />
            <rect x="58" y="54" width="8" height="12" rx="2.5" />
            <rect x="67" y="55" width="8" height="11" rx="2.5" />
          </g>

          {/* Super Bright Sparkle on Teeth ✨ */}
          <g transform="translate(42, 30)">
            <path d="M10 0 L12 6 L18 8 L12 10 L10 16 L8 10 L2 8 L8 6 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
          </g>
          <g transform="translate(62, 48)">
            <path d="M6 0 L7 4 L11 5 L7 6 L6 10 L5 6 L1 5 L5 4 Z" fill="#67E8F9" stroke="#0891B2" strokeWidth="0.8" />
          </g>
        </svg>
      );

    case 'neck':
      return (
        <svg {...commonProps}>
          {/* Head at top */}
          <circle cx="50" cy="22" r="16" fill="#FDE68A" stroke="#1E293B" strokeWidth="4" />
          {/* Hair */}
          <path d="M36 18 C38 8 62 8 64 18 C58 14 52 16 50 14 C46 16 42 14 36 18 Z" fill="#78350F" />
          {/* Face elements */}
          <circle cx="45" cy="20" r="2" fill="#1E293B" />
          <circle cx="55" cy="20" r="2" fill="#1E293B" />
          <path d="M47 26 Q50 29 53 26" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

          {/* Shoulders & Shirt at bottom */}
          <path d="M16 88 C20 68 34 64 42 62 L58 62 C66 64 80 68 84 88 Z" fill="#6366F1" stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
          <path d="M42 62 Q50 70 58 62" stroke="#1E293B" strokeWidth="3" fill="#FDE68A" />

          {/* THE NECK (Prominently shown in the middle with warm skin tone) */}
          <rect x="42" y="36" width="16" height="26" rx="4" fill="#FDE68A" stroke="#1E293B" strokeWidth="4" />
          {/* Neck crease/shadow */}
          <path d="M44 48 Q50 52 56 48" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />

          {/* Bright RED attention-grabbing pointer arrows pointing right to the neck */}
          {/* Left Arrow pointing right at neck */}
          <g>
            <path d="M14 49 L34 49" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            <polygon points="38,49 30,43 30,55" fill="#EF4444" />
          </g>
          {/* Right Arrow pointing left at neck */}
          <g>
            <path d="M86 49 L66 49" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            <polygon points="62,49 70,43 70,55" fill="#EF4444" />
          </g>

          {/* Yellow glow badge behind neck */}
          <ellipse cx="50" cy="49" rx="14" ry="10" fill="#FEF08A" opacity="0.4" />
        </svg>
      );

    case 'shoulders':
      return (
        <svg {...commonProps}>
          {/* Head & Neck for context */}
          <circle cx="50" cy="22" r="14" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="44" y="32" width="12" height="14" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />

          {/* Shoulders & Torso */}
          <path d="M12 78 C15 54 32 46 44 46 L56 46 C68 46 85 54 88 78 L12 78 Z" fill="#6366F1" stroke="#1E293B" strokeWidth="4.5" strokeLinejoin="round" />

          {/* Both Shoulders Highlighted with Glowing Circles */}
          <circle cx="26" cy="56" r="12" fill="#FBBF24" opacity="0.3" />
          <circle cx="74" cy="56" r="12" fill="#FBBF24" opacity="0.3" />

          {/* Left Arrow pointing to left shoulder */}
          <g>
            <path d="M12 36 L24 48" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
            <polygon points="26,50 18,48 24,42" fill="#EF4444" />
          </g>
          {/* Right Arrow pointing to right shoulder */}
          <g>
            <path d="M88 36 L76 48" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
            <polygon points="74,50 76,42 82,48" fill="#EF4444" />
          </g>
        </svg>
      );

    case 'arms':
      return (
        <svg {...commonProps}>
          {/* Head & Neck hint for human context */}
          <circle cx="50" cy="18" r="10" fill="#FDE68A" stroke="#1E293B" strokeWidth="3" />
          {/* Cute T-shirt Body */}
          <path d="M38 28 L62 28 L65 70 L35 70 Z" fill="#3B82F6" stroke="#1E293B" strokeWidth="3.5" strokeLinejoin="round" />

          {/* Left Arm: Stretched wide & flexing with sleeve */}
          <path d="M38 28 L24 33 L26 44 L37 40 Z" fill="#2563EB" stroke="#1E293B" strokeWidth="3" />
          <path d="M24 35 L12 40 C6 44 6 54 13 58 L24 45" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="10" cy="48" r="6" fill="#FDE68A" stroke="#1E293B" strokeWidth="3" />

          {/* Right Arm: Stretched wide & waving with sleeve */}
          <path d="M62 28 L76 33 L74 44 L63 40 Z" fill="#2563EB" stroke="#1E293B" strokeWidth="3" />
          <path d="M76 35 L88 40 C94 44 94 54 87 58 L76 45" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="90" cy="48" r="6" fill="#FDE68A" stroke="#1E293B" strokeWidth="3" />

          {/* Red indicator arrows spanning BOTH arms */}
          <g>
            <path d="M6 68 L32 68" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
            <polygon points="6,68 14,63 14,73" fill="#EF4444" />
            <polygon points="32,68 24,63 24,73" fill="#EF4444" />
          </g>
          <g>
            <path d="M68 68 L94 68" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
            <polygon points="68,68 76,63 76,73" fill="#EF4444" />
            <polygon points="94,68 86,63 86,73" fill="#EF4444" />
          </g>
        </svg>
      );

    case 'hands':
      return (
        <svg {...commonProps}>
          {/* Open friendly waving human hand */}
          <path d="M42 82 L42 62 C42 54 32 52 32 42 C32 36 38 36 42 42 L42 26 C42 20 48 20 48 26 L48 22 C48 16 56 16 56 22 L56 25 C56 18 64 18 64 25 L64 32 C64 26 72 28 72 35 L72 58 C72 75 62 82 42 82 Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="5" strokeLinejoin="round" />
          {/* Palm line */}
          <path d="M46 58 Q54 66 64 58" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'fingers':
      return (
        <svg {...commonProps}>
          {/* Soft Palm base at bottom */}
          <path
            d="M26 84 C24 70 26 60 34 56 C40 54 60 54 66 56 C74 60 76 70 74 84 Z"
            fill="#FEF3C7"
            stroke="#CBD5E1"
            strokeWidth="3"
            strokeDasharray="3 3"
          />

          {/* 5 Distinct Fingers Standing with Numbers 1, 2, 3, 4, 5 */}
          {/* 1. Thumb (엄지) */}
          <g>
            <rect x="14" y="46" width="10" height="26" rx="5" transform="rotate(-30 19 59)" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
            <circle cx="12" cy="46" r="6.5" fill="#EF4444" />
            <text x="12" y="49.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900">1</text>
          </g>

          {/* 2. Index (검지) */}
          <g>
            <rect x="29" y="24" width="9.5" height="38" rx="4.75" transform="rotate(-8 33 43)" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
            <circle cx="31" cy="22" r="6.5" fill="#F59E0B" />
            <text x="31" y="25.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900">2</text>
          </g>

          {/* 3. Middle (중지) */}
          <g>
            <rect x="45" y="16" width="10" height="44" rx="5" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
            <circle cx="50" cy="14" r="6.5" fill="#10B981" />
            <text x="50" y="17.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900">3</text>
          </g>

          {/* 4. Ring (약지) */}
          <g>
            <rect x="61" y="24" width="9.5" height="38" rx="4.75" transform="rotate(8 66 43)" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
            <circle cx="69" cy="22" r="6.5" fill="#3B82F6" />
            <text x="69" y="25.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900">4</text>
          </g>

          {/* 5. Pinky (소지) */}
          <g>
            <rect x="76" y="46" width="10" height="26" rx="5" transform="rotate(30 81 59)" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
            <circle cx="88" cy="46" r="6.5" fill="#8B5CF6" />
            <text x="88" y="49.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900">5</text>
          </g>

          {/* Finger Knuckle Creases */}
          <path d="M30 36 L36 37 M46 32 L54 32 M64 37 L70 36" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'belly':
      return (
        <svg {...commonProps}>
          {/* Lifted Toddler Shirt at top with striped folds */}
          <path d="M18 16 L18 36 Q50 28 82 36 L82 16 Z" fill="#3B82F6" stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
          <path d="M24 24 Q50 18 76 24" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />

          {/* Big, Soft, Plump Round Tummy */}
          <ellipse cx="50" cy="58" rx="34" ry="26" fill="#FDE68A" stroke="#1E293B" strokeWidth="4.5" />
          {/* Soft tummy blush / warm center */}
          <circle cx="50" cy="58" r="16" fill="#FEF08A" />

          {/* Pants waistband at bottom */}
          <path d="M22 76 Q50 82 78 76 L80 88 Q50 94 20 88 Z" fill="#EF4444" stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
          <rect x="46" y="77" width="8" height="6" rx="2" fill="#FDE047" stroke="#1E293B" strokeWidth="2" />

          {/* Cute Belly Button (Navel) with Swirl & Shading */}
          <ellipse cx="50" cy="62" rx="4.5" ry="3.5" fill="#B45309" stroke="#1E293B" strokeWidth="2" />
          <path d="M47 58 Q50 55 53 58" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />

          {/* Large Bright Red Pointer Arrow pointing straight at the Belly */}
          <g>
            <path d="M50 28 L50 48" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            <polygon points="50,54 44,46 56,46" fill="#EF4444" />
          </g>
        </svg>
      );

    case 'legs':
      return (
        <svg {...commonProps}>
          {/* Toddler Shorts at top */}
          <path d="M22 14 L78 14 L76 36 L52 40 L50 36 L48 40 L24 36 Z" fill="#EF4444" stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
          <path d="M50 14 L50 36" stroke="#991B1B" strokeWidth="2.5" />

          {/* Left Leg (Thigh -> Knee -> Calf) */}
          <path d="M27 36 L25 56 C25 66 26 74 26 78 L41 78 C41 74 41 66 41 56 L43 38" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" strokeLinejoin="round" />
          {/* Left Knee Cap */}
          <ellipse cx="33" cy="54" rx="6" ry="4.5" fill="#FCD34D" stroke="#1E293B" strokeWidth="2" />

          {/* Right Leg (Thigh -> Knee -> Calf) */}
          <path d="M57 38 L59 56 C59 66 59 74 59 78 L74 78 C74 74 75 66 75 56 L73 36" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" strokeLinejoin="round" />
          {/* Right Knee Cap */}
          <ellipse cx="67" cy="54" rx="6" ry="4.5" fill="#FCD34D" stroke="#1E293B" strokeWidth="2" />

          {/* Toddler Shoes at bottom for clear ground context */}
          {/* Left Shoe */}
          <path d="M22 78 L43 78 L45 88 Q30 90 20 86 Z" fill="#3B82F6" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="38" cy="83" r="2" fill="#FFFFFF" />

          {/* Right Shoe */}
          <path d="M57 78 L78 78 L80 86 Q70 90 55 88 Z" fill="#3B82F6" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="62" cy="83" r="2" fill="#FFFFFF" />

          {/* Red Dimension Arrows indicating LEGS length */}
          <g>
            <path d="M14 38 L14 74" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
            <polygon points="14,34 10,40 18,40" fill="#EF4444" />
            <polygon points="14,78 10,72 18,72" fill="#EF4444" />
          </g>
          <g>
            <path d="M86 38 L86 74" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
            <polygon points="86,34 82,40 90,40" fill="#EF4444" />
            <polygon points="86,78 82,72 90,72" fill="#EF4444" />
          </g>
        </svg>
      );

    case 'feet':
      return (
        <svg {...commonProps}>
          {/* Ankle cuffs / socks at top */}
          <rect x="22" y="16" width="18" height="14" rx="4" fill="#60A5FA" stroke="#1E293B" strokeWidth="3" />
          <rect x="60" y="16" width="18" height="14" rx="4" fill="#60A5FA" stroke="#1E293B" strokeWidth="3" />

          {/* Left Foot */}
          <g>
            {/* Foot body & heel */}
            <path
              d="M24 28 C22 36 18 52 18 64 C18 76 26 82 38 82 C46 82 48 76 46 64 C44 52 40 36 38 28 Z"
              fill="#FDE68A"
              stroke="#1E293B"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* 5 Toes on Left Foot */}
            <circle cx="43" cy="80" r="5" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
            <ellipse cx="43" cy="80" rx="2.5" ry="2" fill="#FFFFFF" />

            <circle cx="34" cy="83" r="4.2" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="26" cy="82" r="3.8" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="19" cy="79" r="3.2" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="14" cy="74" r="2.8" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
          </g>

          {/* Right Foot */}
          <g>
            {/* Foot body & heel */}
            <path
              d="M62 28 C60 36 56 52 54 64 C52 76 54 82 62 82 C74 82 82 76 82 64 C82 52 78 36 76 28 Z"
              fill="#FDE68A"
              stroke="#1E293B"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* 5 Toes on Right Foot */}
            <circle cx="57" cy="80" r="5" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
            <ellipse cx="57" cy="80" rx="2.5" ry="2" fill="#FFFFFF" />

            <circle cx="66" cy="83" r="4.2" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="74" cy="82" r="3.8" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="81" cy="79" r="3.2" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="86" cy="74" r="2.8" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
          </g>

          {/* Red Attention Pointers to the Feet */}
          <g>
            <path d="M50 40 L50 60" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
            <polygon points="50,66 44,58 56,58" fill="#EF4444" />
          </g>
        </svg>
      );

    default:
      return (
        <svg {...commonProps}>
          <circle cx="50" cy="50" r="36" fill="#CBD5E1" stroke="#1E293B" strokeWidth="5" />
        </svg>
      );
  }
};
