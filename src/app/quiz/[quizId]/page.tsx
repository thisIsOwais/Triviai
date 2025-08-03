"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Clock, ArrowLeft, ArrowRight, Flag, Moon, Sun, CheckCircle, XCircle } from "lucide-react"
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

const sampleQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    explanation: "Paris is the capital and most populous city of France.",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    explanation: "Mars is called the Red Planet due to its reddish appearance caused by iron oxide on its surface.",
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1,
    explanation: "The Blue Whale is the largest mammal and the largest animal ever known to have lived on Earth.",
  },
]

export default function QuizPage() {
  const params = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(sampleQuestions.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowResult(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(answers[currentQuestion + 1])
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
    }
  }

  const handleSubmit = () => {
    setShowResult(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === sampleQuestions[index].correctAnswer ? score + 1 : score
    }, 0)
  }

  if (showResult) {
    const score = calculateScore()
    const percentage = Math.round((score / sampleQuestions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-violet-950/30">
        <nav className="sticky top-0 z-50 glass-effect border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg gradient-violet flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">QuizMaster</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="h-20 w-20 rounded-full gradient-violet flex items-center justify-center mx-auto mb-4">
                {percentage >= 80 ? (
                  <CheckCircle className="h-10 w-10 text-white" />
                ) : (
                  <XCircle className="h-10 w-10 text-white" />
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Quiz Completed!</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {percentage >= 80 ? "Excellent work!" : percentage >= 60 ? "Good job!" : "Keep practicing!"}
              </p>
            </div>

            <Card className="glass-effect border-0 mb-8">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {score}/{sampleQuestions.length}
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">{percentage}% Score</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-white">Correct</div>
                    <div className="text-green-500 font-bold">{score}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-white">Incorrect</div>
                    <div className="text-red-500 font-bold">{sampleQuestions.length - score}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gradient-violet text-white border-0 hover:opacity-90">
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/result/${params.quizId}`}>View Detailed Results</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/leaderboard">View Leaderboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = sampleQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100

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
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={`font-mono ${timeLeft < 60 ? "text-red-500" : ""}`}>{formatTime(timeLeft)}</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Science & Technology Quiz</h1>
              <Badge className="gradient-violet text-white border-0">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Question Area */}
            <div className="lg:col-span-3">
              <Card className="glass-effect border-0 mb-6">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{question.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          selectedAnswer === index
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedAnswer === index
                                ? "border-violet-500 bg-violet-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {selectedAnswer === index && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <span className="text-gray-900 dark:text-white">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-3">
                  {currentQuestion === sampleQuestions.length - 1 ? (
                    <Button onClick={handleSubmit} className="gradient-violet text-white border-0 hover:opacity-90">
                      <Flag className="h-4 w-4 mr-2" />
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswer === null}
                      className="gradient-violet text-white border-0 hover:opacity-90"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="glass-effect border-0 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Question Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {sampleQuestions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentQuestion(index)
                          setSelectedAnswer(answers[index])
                        }}
                        className={`aspect-square rounded-lg border-2 text-sm font-medium transition-all ${
                          index === currentQuestion
                            ? "border-violet-500 bg-violet-500 text-white"
                            : answers[index] !== null
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                              : "border-gray-300 dark:border-gray-600 hover:border-violet-300"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Answered:</span>
                      <span className="font-medium">
                        {answers.filter((a) => a !== null).length}/{sampleQuestions.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Time Left:</span>
                      <span className={`font-mono font-medium ${timeLeft < 60 ? "text-red-500" : ""}`}>
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" onClick={handleSubmit} className="w-full mt-6 bg-transparent">
                    <Flag className="h-4 w-4 mr-2" />
                    Submit Early
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
