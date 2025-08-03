"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

interface TimerProps {
  initialTime: number // in seconds
  onTimeUp: () => void
  onTimeUpdate?: (timeLeft: number) => void
  warningThreshold?: number // seconds when to show warning (default: 60)
  autoSubmit?: boolean
  className?: string
}

export function Timer({
  initialTime,
  onTimeUp,
  onTimeUpdate,
  warningThreshold = 60,
  autoSubmit = true,
  className = "",
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1

        // Call the update callback
        if (onTimeUpdate) {
          onTimeUpdate(newTime)
        }

        // Check if time is up
        if (newTime <= 0) {
          setIsRunning(false)
          if (autoSubmit) {
            onTimeUp()
          }
          return 0
        }

        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, timeLeft, onTimeUp, onTimeUpdate, autoSubmit])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getTimeDisplay = () => {
    const formatted = formatTime(timeLeft)
    const isWarning = timeLeft <= warningThreshold && timeLeft > 0
    const isExpired = timeLeft <= 0

    return {
      time: formatted,
      isWarning,
      isExpired,
      color: isExpired
        ? "text-red-600 dark:text-red-400"
        : isWarning
          ? "text-orange-600 dark:text-orange-400"
          : "text-gray-900 dark:text-white",
    }
  }

  const getProgressPercentage = () => {
    return ((initialTime - timeLeft) / initialTime) * 100
  }

  const pauseTimer = () => setIsRunning(false)
  const resumeTimer = () => setIsRunning(true)

  const display = getTimeDisplay()

  return (
    <Card className={`glass-effect border-0 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Clock className={`h-4 w-4 ${display.color}`} />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Remaining</span>
          </div>
          {display.isWarning && !display.isExpired && (
            <Badge variant="destructive" className="text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Hurry Up!
            </Badge>
          )}
          {display.isExpired && (
            <Badge variant="destructive" className="text-xs">
              Time's Up!
            </Badge>
          )}
        </div>

        <div className="text-center">
          <div className={`text-3xl font-mono font-bold ${display.color} mb-2`}>{display.time}</div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                display.isExpired ? "bg-red-500" : display.isWarning ? "bg-orange-500" : "bg-violet-500"
              }`}
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>

          {/* Timer Controls (optional) */}
          <div className="flex items-center justify-center space-x-2">
            {!display.isExpired && (
              <>
                {isRunning ? (
                  <button
                    onClick={pauseTimer}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={resumeTimer}
                    className="text-xs text-violet-500 hover:text-violet-700 dark:hover:text-violet-300"
                  >
                    Resume
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Time Status Messages */}
        {display.isWarning && !display.isExpired && (
          <div className="mt-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-xs text-orange-800 dark:text-orange-200 text-center">
              Less than {Math.ceil(warningThreshold / 60)} minute{warningThreshold > 60 ? "s" : ""} remaining!
            </p>
          </div>
        )}

        {display.isExpired && (
          <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-xs text-red-800 dark:text-red-200 text-center">
              {autoSubmit ? "Quiz auto-submitted" : "Time expired - please submit your quiz"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
