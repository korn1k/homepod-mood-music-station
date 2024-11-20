/** Requires a separate client app. The following code is *exclusively* for mocking */

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'

const moodSounds = {
  happy: [
    { name: "Upbeat Pop", url: "https://example.com/upbeat-pop.mp3" },
    { name: "Cheerful Acoustic", url: "https://example.com/cheerful-acoustic.mp3" },
    { name: "Sunny Day", url: "https://example.com/sunny-day.mp3" },
  ],
  relaxed: [
    { name: "Calm Waves", url: "https://example.com/calm-waves.mp3" },
    { name: "Gentle Piano", url: "https://example.com/gentle-piano.mp3" },
    { name: "Soft Breeze", url: "https://example.com/soft-breeze.mp3" },
  ],
  focused: [
    { name: "Deep Focus", url: "https://example.com/deep-focus.mp3" },
    { name: "Ambient Study", url: "https://example.com/ambient-study.mp3" },
    { name: "Concentration Boost", url: "https://example.com/concentration-boost.mp3" },
  ],
  energetic: [
    { name: "Workout Beats", url: "https://example.com/workout-beats.mp3" },
    { name: "Power Up", url: "https://example.com/power-up.mp3" },
    { name: "High Energy", url: "https://example.com/high-energy.mp3" },
  ],
}

const moodEmojis = {
  happy: "😊",
  relaxed: "😌",
  focused: "🧠",
  energetic: "⚡",
}

export default function MoodSoundPlayer() {
  const [selectedMood, setSelectedMood] = useState<keyof typeof moodSounds | ''>('')
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentSound = selectedMood ? moodSounds[selectedMood][currentSoundIndex] : null

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    audio.addEventListener('timeupdate', updateProgress)
    return () => audio.removeEventListener('timeupdate', updateProgress)
  }, [])

  const handleMoodSelect = (mood: keyof typeof moodSounds) => {
    setSelectedMood(mood)
    setCurrentSoundIndex(0)
    setIsPlaying(false)
    setProgress(0)
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handlePrevious = () => {
    setCurrentSoundIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : moodSounds[selectedMood].length - 1
    )
  }

  const handleNext = () => {
    setCurrentSoundIndex((prevIndex) => 
      prevIndex < moodSounds[selectedMood].length - 1 ? prevIndex + 1 : 0
    )
  }

  const handleProgressChange = (newProgress: number[]) => {
    if (audioRef.current) {
      const newTime = (newProgress[0] / 100) * audioRef.current.duration
      audioRef.current.currentTime = newTime
      setProgress(newProgress[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-md">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Mood Sound Player</h2>
            <p className="text-gray-600">Select your mood and enjoy the music!</p>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            {Object.entries(moodEmojis).map(([mood, emoji]) => (
              <Button
                key={mood}
                onClick={() => handleMoodSelect(mood as keyof typeof moodSounds)}
                variant={selectedMood === mood ? "default" : "outline"}
                className="text-2xl p-2 h-12 w-12 rounded-full"
              >
                {emoji}
              </Button>
            ))}
          </div>

          {currentSound && (
            <>
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold">{currentSound.name}</h3>
                <p className="text-gray-600">{selectedMood} Mood</p>
              </div>

              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <Button
                    onClick={togglePlay}
                    variant="ghost"
                    size="icon"
                    className="h-20 w-20 rounded-full hover:bg-gray-100"
                  >
                    {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 mb-4">
                <Button onClick={handlePrevious} variant="ghost" size="icon">
                  <SkipBack />
                </Button>
                <Button onClick={handleNext} variant="ghost" size="icon">
                  <SkipForward />
                </Button>
              </div>

              <Slider
                value={[progress]}
                max={100}
                step={1}
                onValueChange={handleProgressChange}
                className="mb-2"
              />

              <audio
                ref={audioRef}
                src={currentSound.url}
                onEnded={handleNext}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
