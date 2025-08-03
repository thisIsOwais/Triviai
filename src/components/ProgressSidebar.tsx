"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flag, Clock } from "lucide-react"

export type QuestionStatus = "unvisited" | "visited" | "answered"

export interface Question {
  id: number
  status: QuestionStatus
}

interface ProgressSidebarProps {
  questions: Question[]
  currentQuestion: number
  timeLeft: number
  onQuestionSelect: (questionIndex: number) => void
  onSubmit: () => void
  className?: string
}

export function ProgressSidebar({
  questions,
  currentQuestion,
  timeLeft,
  onQuestionSelect,
  onSubmit,
  className = "",
}: ProgressSidebarProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getQuestionButtonStyle = (index: number, status: QuestionStatus) => {
    const isActive = index === currentQuestion

    if (isActive) {
      return "border-violet-500 bg-violet-500 text-white"
    }

    switch (status) {
      case "answered":
        return "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
      case "visited":
        return "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
      case "unvisited":
      default:
        return "border-gray-300 dark:border-gray-600 hover:border-violet-300 dark:hover:border-violet-600"
    }
  }

  const getStatusCounts = () => {
    const answered = questions.filter((q) => q.status === "answered").length
    const visited = questions.filter((q) => q.status === "visited").length
    const unvisited = questions.filter((q) => q.status === "unvisited").length

    return { answered, visited, unvisited }
  }

  const { answered, visited, unvisited } = getStatusCounts()

  return (
    <Card className={`glass-effect border-0 sticky top-24 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Question Overview
          <Badge variant="secondary" className="text-xs">
            {currentQuestion + 1}/{questions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question Grid */}
        <div className="grid grid-cols-5 gap-2">
          {questions.map((question, index) => (
            <button
              key={question.id}
              onClick={() => onQuestionSelect(index)}
              className={`aspect-square rounded-lg border-2 text-sm font-medium transition-all hover:scale-105 ${getQuestionButtonStyle(
                index,
                question.status,
              )}`}
              title={`Question ${index + 1} - ${question.status}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded border-2 border-green-500 bg-green-50 dark:bg-green-900/20"></div>
              <span className="text-gray-600 dark:text-gray-400">Answered</span>
            </div>
            <span className="font-medium text-green-600">{answered}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded border-2 border-orange-500 bg-orange-50 dark:bg-orange-900/20"></div>
              <span className="text-gray-600 dark:text-gray-400">Visited</span>
            </div>
            <span className="font-medium text-orange-600">{visited}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded border-2 border-gray-300 dark:border-gray-600"></div>
              <span className="text-gray-600 dark:text-gray-400">Unvisited</span>
            </div>
            <span className="font-medium text-gray-600 dark:text-gray-400">{unvisited}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3 text-sm border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Progress:</span>
            <span className="font-medium">{Math.round(((answered + visited) / questions.length) * 100)}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">Time Left:</span>
            </div>
            <span
              className={`font-mono font-medium ${timeLeft < 60 ? "text-red-500" : "text-gray-900 dark:text-white"}`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <Button variant="outline" onClick={onSubmit} className="w-full bg-transparent" disabled={answered === 0}>
          <Flag className="h-4 w-4 mr-2" />
          Submit Quiz
        </Button>
      </CardContent>
    </Card>
  )
}
