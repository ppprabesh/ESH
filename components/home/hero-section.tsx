"use client"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from "react"

export function HeroSection() {
  const timer = useRef<NodeJS.Timeout>()
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
  })

  useEffect(() => {
    timer.current = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next()
      }
    }, 3000) // 3 seconds
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [instanceRef])

  const slides = [
    {
      image: "https://images.pexels.com/photos/2563594/pexels-photo-2563594.jpeg",
      title: "Authentic Nepali Souvenirs",
      description: "Discover handcrafted treasures celebrating Nepal's rich cultural heritage. From traditional crafts to contemporary designs, find the perfect keepsake.",
    },
    {
      image: "https://images.unsplash.com/photo-1656043290493-16ba89bb93f0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Handwoven Fabrics",
      description: "Explore traditional Nepali textiles crafted by skilled artisans using age-old techniques passed down through generations.",
    },
    {
      image: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
      title: "Timeless Wood Carvings",
      description: "Bring home a piece of Nepal's architectural artistry with intricate woodwork inspired by historic temples and monuments.",
    },
  ]

  return (
    <section className="relative  pt-20 pb-12 md:pt-24 md:pb-20 lg:pt-0 lg:pb-0 overflow-hidden">
      <div ref={sliderRef} className="keen-slider h-[80vh]">
        {slides.map((slide, index) => (
          <div key={index} className="keen-slider__slide relative">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#F8F3D9]/70" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-foreground/85 max-w-2xl">
                  {slide.description}
                </p>
                <div className="flex text-black flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link href="/products">
                      Explore Collection
                    </Link>
                  </Button>
                  <Button>
                    <Link href="/about" >
                      Our Story
                    </Link>
                  </Button> 
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
