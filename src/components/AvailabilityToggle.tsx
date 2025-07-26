import React from 'react';

interface AvailabilityToggleProps {
  value: boolean;
  onChange: (next: boolean) => void;
  pending?: boolean;
  size?: 'sm' | 'md';
}

/**
 * A reusable Tailwind-styled switch component (UI-only).
 * It renders a rounded track with a sliding knob and colour transition.
 * No external dependencies; accessible via role="switch".
 */
const AvailabilityToggle: React.FC<AvailabilityToggleProps> = ({ value, onChange, pending = false, size = 'md' }) => {
  const dimensions = size === 'sm' ? {
    track: 'w-10 h-5',
    knob: 'w-4 h-4',
  } : {
    track: 'w-14 h-7',
    knob: 'w-6 h-6',
  };

  return (
    <button
      type="button"
      title={value ? 'Click to go offline' : 'Click to go online'}
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={`relative inline-flex ${dimensions.track} flex-shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        value ? 'bg-green-500 focus:ring-green-500' : 'bg-orange-400 focus:ring-orange-400'
      } ${pending ? 'opacity-70 cursor-wait' : ''}`}
    >
      {/* Knob */}
      <span
  className={`pointer-events-none inline-block transform rounded-full bg-white shadow ${dimensions.knob}
              ring-0 transition-transform duration-200 flex items-center justify-center
              ${value ? 'translate-x-full -mr-1' : 'translate-x-0 ml-1'}`}
>
        {pending && (
          <svg className="animate-spin h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default AvailabilityToggle;
