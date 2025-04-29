import { Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'

export function TopBar() {
  return (
    <div className="bg-[#F8F3D9] text-[000080] py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="tel:+9779851213365" className="flex items-center gap-2 text-sm hover:text-black">
            <Phone className="h-4 w-4" />
            <span>+977 9851213365</span>
          </Link>
          <Link href="mailto:contact@handicraftsinnepal.com" className="flex items-center gap-2 text-sm hover:text-black">
            <Mail className="h-4 w-4" />
            <span>contact@everestsouvenirhouse.com</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 