import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F3D9] p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="relative w-64 h-64 mx-auto">
          <Image
            src="/images/logo/eshlogo.png"
            alt="Everest Souvenir House Logo"
            fill
            className="object-contain"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-[#000080]">404</h1>
          <h2 className="text-3xl font-semibold text-[#000080]/80">
            Page Not Found
          </h2>
          <p className="text-lg text-[#000080]/70 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-[#000080] text-white px-8 py-3 rounded-md font-medium hover:bg-[#000080]/90 transition-colors"
          >
            Return Home
          </Link>
          <p className="text-sm text-[#000080]/60">
            Or try searching for what you're looking for
          </p>
        </div>
      </div>
    </div>
  )
}