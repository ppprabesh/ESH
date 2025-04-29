import React from 'react'
import Link from 'next/link'
import { Mail, MapPin, Phone, Store } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#F8F3D9] py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Store className="h-6 w-6 text-primary" />
              <h3 className="font-bold text-lg">Everest Souvenir House</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Quality Nepali souvenirs and crafts for tourists and locals alike, 
              capturing the essence of Nepal&apos;s rich culture and heritage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=notebooks" className="text-sm text-muted-foreground hover:text-primary">
                  Notebooks
                </Link>
              </li>
              <li>
                <Link href="/products?category=statues" className="text-sm text-muted-foreground hover:text-primary">
                  Statues
                </Link>
              </li>
              <li>
                <Link href="/products?category=candles" className="text-sm text-muted-foreground hover:text-primary">
                  Candles
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">
                  View All
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Thamel, Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  +977-1-4123456
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  info@everestsouvenir.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Everest Souvenir House. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}