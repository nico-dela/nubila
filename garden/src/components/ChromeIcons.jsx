/** Shared chrome SVG icons — currentColor for theme ink. */

const svgProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": true,
  focusable: "false",
};

export function IconSun() {
  return (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"
      />
    </svg>
  );
}

export function IconMoon() {
  return (
    <svg {...svgProps}>
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 14.2A8.2 8.2 0 0 1 9.8 4 7.2 7.2 0 1 0 20 14.2Z"
      />
    </svg>
  );
}

export function IconSpeaker() {
  return (
    <svg {...svgProps}>
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        d="M4.5 9.5h3.2L12 5.8v12.4L7.7 14.5H4.5V9.5Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M15.2 9.2a3.2 3.2 0 0 1 0 5.6M17.8 7a5.8 5.8 0 0 1 0 10"
      />
    </svg>
  );
}

export function IconSpeakerMuted() {
  return (
    <svg {...svgProps}>
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        d="M4.5 9.5h3.2L12 5.8v12.4L7.7 14.5H4.5V9.5Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="m15 9.5 5 5M20 9.5l-5 5"
      />
    </svg>
  );
}

export function IconMotion() {
  return (
    <svg {...svgProps}>
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 5.2a6.8 6.8 0 1 1-4.8 2"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2.8v3.2H8.8"
      />
    </svg>
  );
}

export function IconMotionStill() {
  return (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="6.2" r="1.35" fill="currentColor" />
    </svg>
  );
}

export function IconChevronLeft() {
  return (
    <svg {...svgProps}>
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 5.5 8.5 12 15 18.5"
      />
    </svg>
  );
}

export function IconChevronRight() {
  return (
    <svg {...svgProps}>
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5.5 15.5 12 9 18.5"
      />
    </svg>
  );
}

/** Official Linktree mark (Simple Icons / brand path). */
export function IconLinktree() {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      fill="currentColor"
    >
      <path d="m13.73635 5.85251 4.00467-4.11665 2.3248 2.3808-4.20064 4.00466h5.9085v3.30473h-5.9365l4.22865 4.10766-2.3248 2.3338L12.0005 12.099l-5.74052 5.76852-2.3248-2.3248 4.22864-4.10766h-5.9375V8.12132h5.9085L3.93417 4.11666l2.3248-2.3808 4.00468 4.11665V0h3.4727zm-3.4727 10.30614h3.4727V24h-3.4727z" />
    </svg>
  );
}
