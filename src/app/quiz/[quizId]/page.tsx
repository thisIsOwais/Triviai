"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, ArrowLeft, ArrowRight, Flag, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { QuestionCard, type QuestionData } from "@/components/QuestionCard"
import { ProgressSidebar, type Question, type QuestionStatus } from "@/components/ProgressSidebar"
import { Timer } from "@/components/Timer"

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

const sampleQuestions: QuestionData[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: [
      { id: "a", text: "London" },
      { id: "b", text: "Berlin" },
      { id: "c", text: "Paris" },
      { id: "d", text: "Madrid" },
    ],
    correctAnswer: "c",
    explanation: "Paris is the capital and most populous city of France.",
    category: "Geography",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: [
      { id: "a", text: "Venus" },
      { id: "b", text: "Mars" },
      { id: "c", text: "Jupiter" },
      { id: "d", text: "Saturn" },
    ],
    correctAnswer: "b",
    explanation: "Mars is called the Red Planet due to its reddish appearance caused by iron oxide on its surface.",
    category: "Science",
    difficulty: "medium",
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: [
      { id: "a", text: "African Elephant" },
      { id: "b", text: "Blue Whale" },
      { id: "c", text: "Giraffe" },
      { id: "d", text: "Polar Bear" },
    ],
    correctAnswer: "b",
    explanation: "The Blue Whale is the largest mammal and the largest animal ever known to have lived on Earth.",
    category: "Biology",
    difficulty: "easy",
  },
]

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<Question[]>(
    sampleQuestions.map((q, index) => ({
      id: q.id,
      status: index === 0 ? "visited" : "unvisited",
    })),
  )
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [showResult, setShowResult] = useState(false)

  // Update question status when navigating
  const updateQuestionStatus = (questionIndex: number, status: QuestionStatus) => {
    setQuestions((prev) => prev.map((q, index) => (index === questionIndex ? { ...q, status } : q)))
  }

  // Handle answer selection
  const handleAnswerSelect = (answerId: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answerId }
    setAnswers(newAnswers)

    // Mark question as answered
    updateQuestionStatus(currentQuestion, "answered")
  }

  // Handle question navigation
  const handleQuestionSelect = (questionIndex: number) => {
    // Mark current question as visited if not answered
    if (!answers[currentQuestion]) {
      updateQuestionStatus(currentQuestion, "visited")
    }

    // Mark target question as visited
    updateQuestionStatus(questionIndex, "visited")

    setCurrentQuestion(questionIndex)
  }

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      // Mark current as visited if not answered
      if (!answers[currentQuestion]) {
        updateQuestionStatus(currentQuestion, "visited")
      }

      const nextIndex = currentQuestion + 1
      updateQuestionStatus(nextIndex, "visited")
      setCurrentQuestion(nextIndex)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevIndex = currentQuestion - 1
      setCurrentQuestion(prevIndex)
    }
  }

  const handleSubmit = () => {
    setShowResult(true)
  }

  const handleTimeUp = () => {
    // Auto-submit when time runs out
    setShowResult(true)
  }

  const calculateScore = () => {
    return Object.entries(answers).reduce((score, [questionIndex, answer]) => {
      const question = sampleQuestions[Number.parseInt(questionIndex)]
      return answer === question.correctAnswer ? score + 1 : score
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
            <Card className="glass-effect border-0 mb-8">
              <CardContent className="p-8">
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Quiz Completed!</h1>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {score}/{sampleQuestions.length}
                </div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">{percentage}% Score</div>
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
                <Link href={`/quiz/${params.quizId}/leaderboard`}>Quiz Leaderboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestionData: QuestionData = {
    ...sampleQuestions[currentQuestion],
    selectedAnswer: answers[currentQuestion],
  }

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
              <Timer
                initialTime={300}
                onTimeUp={handleTimeUp}
                onTimeUpdate={setTimeLeft}
                warningThreshold={60}
                autoSubmit={true}
                className="hidden md:block"
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Question Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Mobile Timer */}
              <Timer
                initialTime={300}
                onTimeUp={handleTimeUp}
                onTimeUpdate={setTimeLeft}
                warningThreshold={60}
                autoSubmit={true}
                className="md:hidden"
              />

              {/* Question Card */}
              <QuestionCard
                question={currentQuestionData}
                questionNumber={currentQuestion + 1}
                totalQuestions={sampleQuestions.length}
                onAnswerSelect={handleAnswerSelect}
              />

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="bg-transparent"
                >
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
                    <Button onClick={handleNext} className="gradient-violet text-white border-0 hover:opacity-90">
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Sidebar */}
            <div className="lg:col-span-1">
              <ProgressSidebar
                questions={questions}
                currentQuestion={currentQuestion}
                timeLeft={timeLeft}
                onQuestionSelect={handleQuestionSelect}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
