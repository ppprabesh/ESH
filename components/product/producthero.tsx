"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProductHeroSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-[#F8F3D9]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#000080]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Authentic Nepali Craftsmanship
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-[#000080]/80 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Discover our handcrafted souvenirs made with traditional techniques passed down through generations.
                Each piece tells a story of Nepal&apos;s rich cultural heritage.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Link
                href="/collection"
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#000080] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#000080]/90 focus-visible:outline-none focus-visible:ring-[#000080]"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="flex items-center space-x-1 text-sm text-[#000080]">
                <span className="font-medium">✓</span>
                <span>Handmade with love</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-[#000080]">
                <span className="font-medium">✓</span>
                <span>Ethically sourced materials</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-[#000080]">
                <span className="font-medium">✓</span>
                <span>Supporting local artisans</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=800&width=800"
                alt="Nepali handmade souvenirs collection"
                fill
                className="object-cover"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[#000080]/20 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.div
                className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-lg backdrop-blur-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-sm font-medium text-[#000080]">Featured: Handcrafted Lokta Paper Notebooks</p>
                <p className="text-xs text-[#000080]/70">Made from sustainable Himalayan Lokta bark</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
