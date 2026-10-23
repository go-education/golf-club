export function Logo({ className = "logo" }) {
  return (
    <span className={className}>
      <span>G</span>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path fill="currentColor" d="M4.2 1.4h1.6V18.4H4.2z" />
        <path fill="currentColor" d="M5.8 2.2 16.4 6.6 5.8 11z" />
      </svg>
      <span>C</span>
    </span>
  );
}

export function Spark({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .4c.35 5.7 1.7 7.7 7.6 8.7-5.9.9-7.25 2.7-7.6 8.5-.35-5.8-1.7-7.6-7.6-8.5C10.3 8.1 11.65 6.1 12 .4z"
      />
    </svg>
  );
}

export function Arrow({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 10h12M11 5l5 5-5 5"
      />
    </svg>
  );
}

export function Star({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <path fill="currentColor" d="M8 1.15 9.85 5.7l4.9.42-3.72 3.2 1.12 4.78L8 11.7l-4.15 2.4 1.12-4.78L1.25 6.12l4.9-.42z" />
    </svg>
  );
}

export function Play({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8.1" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path fill="currentColor" d="M8.15 6.55v6.9l5.55-3.45z" />
    </svg>
  );
}
