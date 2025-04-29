"use client"

import { useState } from "react"
import { Icon } from "@iconify/react"
import Image from "next/image"

export default function YoutubeHomepage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = "IpOgORpREwU" // Your YouTube video ID

  return (
    <section className="mx-auto px-4 py-16 max-w-6xl">
      {/* Title Section */}
      <div className="text-center flex flex-col mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
        Behind the Scenes
        </h2>
        <p className="font-italic text-lg">Take a closer look at how our products come to life. <br/>Join us on a journey through our factory and see the craftsmanship, innovation, and care that go into every step of the process.</p>
      </div>

      {/* Video Player Section - Centered */}
      <div className="flex justify-center">
        <div className="relative rounded-xl shadow-xl overflow-hidden bg-gray-100 w-full max-w-4xl aspect-video">
          {isPlaying ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          ) : (
            <>
              {/* Using YouTube thumbnail */}
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                fill
                alt="Video thumbnail"
                className="object-cover"
                onError={(e) => {
                  // Fallback if maxresdefault doesn't exist
                  e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                }}
              />
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center"
                aria-label="Play video"
              >
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <Icon 
                    icon={"akar-icons:play"} 
                    className="w-8 h-8 text-white fill-current ml-1" 
                  />
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}