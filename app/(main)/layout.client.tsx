import { NextAppLayoutProps } from "@app/types/next";

export default function MainLayoutClient({ children }: NextAppLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center font-geist-sans bg-white text-black">
      <main className="flex h-full w-full max-w-[1240px] flex-col items-center justify-between px-16">
        {children}
      </main>
    </div>
  );
}
