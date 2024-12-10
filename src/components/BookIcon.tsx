export function BookIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 2v2" />
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M18 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
      <path d="M4 8h14v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
    </svg>
  )
}
