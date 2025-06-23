import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { Separator } from "../ui/separator"
import NavItems from "./NavItems"
import { Menu } from "lucide-react"

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          {/* Using Menu icon from Lucide as fallback, or you can keep the image */}
          <Menu size={24} className="text-gray-600" />
          {/* Alternative: use your custom icon
          <Image 
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          */}
        </SheetTrigger>
        
        <SheetContent 
          side="right" 
          className="flex flex-col w-[280px] sm:w-[320px] bg-white border-l p-0"
        >
          {/* Required for accessibility */}
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          
          {/* Header */}
          <div className="flex items-center justify-center py-6 px-4 border-b border-gray-100">
            <Image 
              src="/assets/images/logo.svg"
              alt="Evently logo"
              width={120}
              height={36}
              className="h-8 w-auto"
            />
          </div>
          
          {/* Navigation Items */}
          <div className="flex-1 py-4 px-2">
            <NavItems />
          </div>
          
          {/* Footer */}
          {/* <div className="mt-auto p-4 border-t border-gray-100">
            <p className="text-center text-xs text-gray-500">
              © 2025 Eventify
            </p>
          </div> */}
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileNav