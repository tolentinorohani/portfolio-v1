export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-snug mb-4">
      {children}
    </h2>
  );
}
