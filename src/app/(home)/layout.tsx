'use client';
import { usePathname } from "next/navigation";
import { Navbar } from "./ui/components/navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
      <main className="flex flex-col min-h-screen relative">
        <Navbar/>
        <div className={`flex-1 flex flex-col ${isHomepage ? '' : 'px-4 pb-4'}`}>
          {children}
        </div>
      </main>
  );
};

export default Layout;

