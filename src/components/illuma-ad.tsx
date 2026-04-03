"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  src: string
  poster?: string
}

export default function IllumaAd({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [showUnmuteOverlay, setShowUnmuteOverlay] = useState(false)

  // Attempt to play with sound; fall back to muted autoplay + overlay
  const tryUnmutedPlay = async () => {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    try {
      await video.play()
      setMuted(false)
      setIsPlaying(true)
      setShowUnmuteOverlay(false)
    } catch {
      // Browser blocked unmuted play — fall back to muted + show overlay
      video.muted = true
      try {
        await video.play()
        setMuted(true)
        setIsPlaying(true)
        setShowUnmuteOverlay(true) // ask user to tap for sound
      } catch {
        setIsPlaying(false)
      }
    }
  }

  // On any user interaction with the page, try to unmute
  useEffect(() => {
    const handleInteraction = () => {
      const video = videoRef.current
      if (!video || !video.muted) return
      video.muted = false
      setMuted(false)
      setShowUnmuteOverlay(false)
      if (video.paused) video.play().catch(() => {})
    }

    const events = ["click", "keydown", "touchstart", "pointerdown"]
    events.forEach((e) =>
      document.addEventListener(e, handleInteraction, { once: true })
    )
    return () =>
      events.forEach((e) => document.removeEventListener(e, handleInteraction))
  }, [])

  // IntersectionObserver — play when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryUnmutedPlay()
          } else {
            videoRef.current?.pause()
            setIsPlaying(false)
          }
        })
      },
      { threshold: 0.4 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted((m) => !m)
  }

  const handleOverlayClick = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    setMuted(false)
    setShowUnmuteOverlay(false)
    if (video.paused) video.play().catch(() => {})
  }

  return (
    <div ref={sectionRef} className="relative w-full aspect-video group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        // No `muted` attribute here — we manage it via JS ref
        className="w-full h-full object-cover scale-110"
      />

      {/* Tap-to-unmute overlay (shown only when browser forced muted autoplay) */}
      {showUnmuteOverlay && (
        <div
          onClick={handleOverlayClick}
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30 z-10"
        >
          <div className="flex flex-col items-center gap-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
            <span className="text-sm font-medium tracking-wide">
              Tap for sound
            </span>
          </div>
        </div>
      )}

      {/* Top-right controls */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition z-20">
        <button
          onClick={toggleMute}
          className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition"
        >
          {muted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition"
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
