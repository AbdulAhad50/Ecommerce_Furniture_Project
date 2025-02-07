import { ReactNode } from "react";

export const metadata = {
  title: "Admin Panel"
};

interface RootLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: RootLayoutProps) {
  return (

    <>
      {children}
    </>
  );
}
