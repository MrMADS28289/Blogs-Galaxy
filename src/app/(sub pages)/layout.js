'use client';
import HomeBtn from "@/components/HomeBtn";
import { useSetAtom } from 'jotai';
import { isPlanetVisibleAtom } from '../jotaiAtoms';
import { useEffect } from 'react';

export default function SubPagesLayout({ children }) {
  const setIsPlanetVisible = useSetAtom(isPlanetVisibleAtom);

  useEffect(() => {
    setIsPlanetVisible(false);
    return () => {
      setIsPlanetVisible(true);
    };
  }, [setIsPlanetVisible]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8 xs:px-16 lg:px-32 py-20">
      <HomeBtn />
      {children}
    </main>
  );
}
