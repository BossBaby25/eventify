import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="wrapper flex items-center justify-between py-2 px-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image 
            src="/assets/images/logo.svg" 
            width={128} 
            height={38}
            alt="Evently logo" 
            className="h-6 w-auto sm:h-8"
            priority
          />
        </Link>

        {/* Desktop Navigation - Show on md screens and up when signed in */}
        <SignedIn>
          <nav className="hidden md:flex flex-1 justify-center max-w-md mx-8">
            <NavItems />
          </nav>
        </SignedIn>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <SignedIn>
            {/* User Button with custom class for styling */}
            <div className="user-button-container">
              <UserButton afterSignOutUrl="/" />
            </div>
            {/* Mobile Navigation - Show on smaller screens */}
            <MobileNav />
          </SignedIn>

          <SignedOut>
            <Button asChild className="rounded-full bg-primary hover:bg-primary/90" size="lg">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header