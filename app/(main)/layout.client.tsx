import { NextAppLayoutProps } from "@app/types/next";

export default function MainLayoutClient({ children }: NextAppLayoutProps) {
  return (
    <div className="flex min-h-screen font-geist-sans bg-white text-black justify-center">
      <main className="flex h-full w-full max-w-[1240px] p-4">
        {children}
      </main>
    </div>
  );
}
