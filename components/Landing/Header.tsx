import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/whitelogo.png";
import ShopIco from "@/assets/icons/shop";
import ProIco from "@/assets/icons/profile";
import Logo from "@/components/ui/logo";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const fill = pathname === "/" ? "white" : "black";
  const bgColor = pathname === "/" ? "black" : "white";
  return (
    <header className={className}>
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* DESKTOP */}
        <ul className="hidden md:flex space-x-8 ">
          <li className="hover:text-gray-400 font-thin">
            <Link href={"/login"}>Bhutanese</Link>
          </li>
          <li className="hover:text-gray-400 font-thin
          ">
            <Link href={"/login"}>International</Link>
          </li>
        </ul>
        {/* logo */}
        <div className="text-xl font-bold">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>

        {/* ICONS */}
        <ul className="hidden md:flex space-x-8">
          <Link href={"/login"} className="hover:text-gray-400">
            <ShopIco />
          </Link>
          <Link href={"/login"} className="hover:text-gray-400">
            <ProIco />
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
