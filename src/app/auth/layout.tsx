export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // Auth pages shouldn't show the global header. This layout overrides the root layout
  // for the /auth subtree and renders children directly.
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
