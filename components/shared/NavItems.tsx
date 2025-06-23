'use client';

import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 w-full">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        
        return (
          <li key={link.route} className="w-full md:w-auto">
            <Link 
              href={link.route}
              className={`
                block px-4 py-3 md:px-3 md:py-2 
                text-sm font-medium
                rounded-lg md:rounded-none
                transition-all duration-200
                hover:bg-gray-50 md:hover:bg-transparent
                hover:text-primary
                ${isActive 
                  ? 'text-primary bg-primary/5 md:bg-transparent md:text-primary font-semibold' 
                  : 'text-gray-700 md:text-gray-600'
                }
                relative
                ${isActive ? 'md:after:absolute md:after:bottom-0 md:after:left-0 md:after:w-full md:after:h-0.5 md:after:bg-primary' : ''}
              `}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems