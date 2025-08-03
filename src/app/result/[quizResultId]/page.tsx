"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  Share2,
  Moon,
  Sun,
  RotateCcw,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-9 w-9 rounded-full"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

const quizResults = {
  id: "1",
  title: "Science & Technology Quiz",
  category: "Science",
  completedAt: "2024-01-15T14:30:00Z",
  timeSpent: 285, // seconds
  totalQuestions: 15,
  correctAnswers: 12,
  score: 85,
  questions: [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      userAnswer: 2,
      isCorrect: true,
      explanation: "Paris is the capital and most populous city of France.",
      timeSpent: 8,
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      userAnswer: 1,
      isCorrect: true,
      explanation: "Mars is called the Red Planet due to its reddish appearance caused by iron oxide on its surface.",
      timeSpent: 12,
    },
    {
      id: 3,
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctAnswer: 1,
      userAnswer: 0,
      isCorrect: false,
      explanation: "The Blue Whale is the largest mammal and the largest animal ever known to have lived on Earth.",
      timeSpent: 15,
    },
  ],
}

export default function ResultPage() {
  const params = useParams()
  const percentage = Math.round((quizResults.correctAnswers / quizResults.totalQuestions) * 100)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return { message: "Outstanding!", color: "text-green-600" }
    if (score >= 80) return { message: "Excellent!", color: "text-blue-600" }
    if (score >= 70) return { message: "Good Job!", color: "text-yellow-600" }
    if (score >= 60) return { message: "Not Bad!", color: "text-orange-600" }
    return { message: "Keep Practicing!", color: "text-red-600" }
  }

  const performance = getPerformanceMessage(percentage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-violet-950/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <div className="h-8 w-8 rounded-lg gradient-violet flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">QuizMaster</span>
            </Link>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Quiz Results</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {quizResults.title} • {quizResults.category}
            </p>
          </div>

          {/* Score Overview */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="glass-effect border-0">
              <CardContent className="p-8 text-center">
                <div className="h-20 w-20 rounded-full gradient-violet flex items-center justify-center mx-auto mb-4">
                  {percentage >= 80 ? (
                    <CheckCircle className="h-10 w-10 text-white" />
                  ) : (
                    <Target className="h-10 w-10 text-white" />
                  )}
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {quizResults.correctAnswers}/{quizResults.totalQuestions}
                </div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{percentage}% Score</div>
                <div className={`text-lg font-medium ${performance.color}`}>{performance.message}</div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Performance Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-400">Correct Answers</span>
                    </div>
                    <span className="font-semibold text-green-600">{quizResults.correctAnswers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="text-gray-600 dark:text-gray-400">Incorrect Answers</span>
                    </div>
                    <span className="font-semibold text-red-600">
                      {quizResults.totalQuestions - quizResults.correctAnswers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <span className="text-gray-600 dark:text-gray-400">Time Spent</span>
                    </div>
                    <span className="font-semibold text-blue-600">{formatTime(quizResults.timeSpent)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-purple-500" />
                      <span className="text-gray-600 dark:text-gray-400">Accuracy Rate</span>
                    </div>
                    <span className="font-semibold text-purple-600">{percentage}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Review */}
          <Card className="glass-effect border-0 mb-8">
            <CardHeader>
              <CardTitle>Question Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quizResults.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          question.isCorrect ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
                        }`}
                      >
                        {question.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">Question {index + 1}</h4>
                          <Badge variant={question.isCorrect ? "default" : "destructive"}>
                            {question.isCorrect ? "Correct" : "Incorrect"}
                          </Badge>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">{question.question}</p>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border-2 ${
                                optionIndex === question.correctAnswer
                                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                  : optionIndex === question.userAnswer && !question.isCorrect
                                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                    : "border-gray-200 dark:border-gray-700"
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {optionIndex === question.correctAnswer && (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                                {optionIndex === question.userAnswer && !question.isCorrect && (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                )}
                                <span
                                  className={`${
                                    optionIndex === question.correctAnswer
                                      ? "text-green-700 dark:text-green-300 font-medium"
                                      : optionIndex === question.userAnswer && !question.isCorrect
                                        ? "text-red-700 dark:text-red-300"
                                        : "text-gray-700 dark:text-gray-300"
                                  }`}
                                >
                                  {option}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gradient-violet text-white border-0 hover:opacity-90">
              <Link href="/dashboard">
                <RotateCcw className="h-4 w-4 mr-2" />
                Take Another Quiz
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/quiz/${params.quizResultId}/leaderboard`}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Quiz Leaderboard
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/leaderboard">Global Leaderboard</Link>
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
