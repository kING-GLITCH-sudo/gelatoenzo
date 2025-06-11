"use client"

import { useEffect, useRef, useState } from "react"

export function useSound(soundUrl: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Only run on client side and check if Audio API is available
    if (typeof window !== "undefined" && typeof Audio !== "undefined") {
      try {
        // Create audio element safely
        const audio = new Audio()
        audio.src = soundUrl
        audio.preload = "auto"

        // Store in ref without modifying global objects
        audioRef.current = audio

        // Mark as ready
        setIsReady(true)
      } catch (error) {
        console.error("Error initializing audio:", error)
      }
    }

    return () => {
      // Cleanup
      if (audioRef.current) {
        try {
          audioRef.current.pause()
          audioRef.current.src = ""
          audioRef.current = null
        } catch (error) {
          console.error("Error cleaning up audio:", error)
        }
      }
    }
  }, [soundUrl])

  const play = () => {
    if (!isReady || !audioRef.current) return

    try {
      // Create a safe copy of the audio for each play to avoid conflicts
      const sound = audioRef.current.cloneNode() as HTMLAudioElement

      // Play the sound with proper error handling
      const playPromise = sound.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio playback failed:", error)
        })
      }
    } catch (error) {
      console.error("Error playing sound:", error)
    }
  }

  return { play }
}
