"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, Eye, RotateCcw, Share2 } from "lucide-react"

export interface QuizResult {
  id: string
  title: string
  category: string
  date: string
  score: number
  totalQuestions: number
  timeSpent: number // in seconds
  accuracy: number
  difficulty: "easy" | "medium" | "hard" | "mixed"
  status: "completed" | "abandoned"
}

interface ResultTableProps {
  results: QuizResult[]
  onViewDetails: (resultId: string) => void
  onRetakeQuiz: (resultId: string) => void
  onShareResult: (resultId: string) => void
  className?: string
}

export function ResultTable({ results, onViewDetails, onRetakeQuiz, onShareResult, className = "" }: ResultTableProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getScoreColor = (accuracy: number) => {
    if (accuracy >= 90) return "text-green-600 dark:text-green-400"
    if (accuracy >= 80) return "text-blue-600 dark:text-blue-400"
    if (accuracy >= 70) return "text-yellow-600 dark:text-yellow-400"
    if (accuracy >= 60) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "mixed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  if (results.length === 0) {
    return (
      <Card className={`glass-effect border-0 ${className}`}>
        <CardContent className="p-8 text-center">
          <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No quiz results yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Take your first quiz to see your results here</p>
          <Button className="gradient-violet text-white border-0 hover:opacity-90">Start Your First Quiz</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`glass-effect border-0 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Quiz Results
          <Badge variant="secondary" className="gradient-violet text-white border-0">
            {results.length} Results
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{result.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {result.category}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(result.difficulty)}`}>{result.difficulty}</Badge>
                    {result.status === "abandoned" && (
                      <Badge variant="destructive" className="text-xs">
                        Abandoned
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{formatDate(result.date)}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(result.timeSpent)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`text-2xl font-bold ${getScoreColor(result.accuracy)}`}>
                      {result.score}/{result.totalQuestions}
                    </div>
                    {result.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className={`text-sm font-medium ${getScoreColor(result.accuracy)}`}>
                    {result.accuracy}% Accuracy
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                <Button variant="outline" size="sm" onClick={() => onViewDetails(result.id)} className="bg-transparent">
                  <Eye className="h-3 w-3 mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm" onClick={() => onRetakeQuiz(result.id)} className="bg-transparent">
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Retake
                </Button>
                {result.status === "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onShareResult(result.id)}
                    className="bg-transparent"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
