import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity duration-200">
                <Image 
                  src="/assets/images/logo.svg"
                  alt="Eventify logo"
                  width={128}
                  height={38}
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                Plan your events with Eventify. Create memorable experiences and bring people together.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                    Browse Events
                  </Link>
                </li>
                <li>
                  <Link href="/events/create" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                    Create Event
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                    My Profile
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="col-span-1">
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/help" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-1">
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2025 Eventify. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <Link 
                href="https://twitter.com" 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              
              <Link 
                href="https://facebook.com" 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              
              <Link 
                href="https://instagram.com" 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 20.312c-2.139 0-3.875-1.736-3.875-3.875V7.563c0-2.139 1.736-3.875 3.875-3.875h7.102c2.139 0 3.875 1.736 3.875 3.875v8.874c0 2.139-1.736 3.875-3.875 3.875H8.449z"/>
                  <path d="M12.017 5.838a6.148 6.148 0 100 12.296 6.148 6.148 0 000-12.296zm0 10.13a3.982 3.982 0 110-7.964 3.982 3.982 0 010 7.964zM18.172 6.872a1.542 1.542 0 11-3.084 0 1.542 1.542 0 013.084 0z"/>
                </svg>
              </Link>
              
              <Link 
                href="https://linkedin.com" 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer