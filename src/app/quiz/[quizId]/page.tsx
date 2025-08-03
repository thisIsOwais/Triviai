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
  {
    id: 4,
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      { id: "a", text: "William Wordsworth" },
      { id: "b", text: "Jane Austen" },
      { id: "c", text: "William Shakespeare" },
      { id: "d", text: "Leo Tolstoy" },
    ],
    correctAnswer: "c",
    explanation: "William Shakespeare is the author of the famous tragedy 'Romeo and Juliet'.",
    category: "Literature",
    difficulty: "medium",
  },
  {
    id: 5,
    question: "What is the chemical symbol for Gold?",
    options: [
      { id: "a", text: "Go" },
      { id: "b", text: "Au" },
      { id: "c", text: "Ag" },
      { id: "d", text: "Gd" },
    ],
    correctAnswer: "b",
    explanation: "Gold has the chemical symbol 'Au' from its Latin name 'Aurum'.",
    category: "Chemistry",
    difficulty: "easy",
  },
  {
    id: 6,
    question: "Which country hosted the 2016 Summer Olympics?",
    options: [
      { id: "a", text: "China" },
      { id: "b", text: "Brazil" },
      { id: "c", text: "UK" },
      { id: "d", text: "Russia" },
    ],
    correctAnswer: "b",
    explanation: "The 2016 Summer Olympics were held in Rio de Janeiro, Brazil.",
    category: "Sports",
    difficulty: "easy",
  },
  {
    id: 7,
    question: "What is H2O commonly known as?",
    options: [
      { id: "a", text: "Oxygen" },
      { id: "b", text: "Salt" },
      { id: "c", text: "Water" },
      { id: "d", text: "Hydrogen" },
    ],
    correctAnswer: "c",
    explanation: "H2O is the chemical formula for water.",
    category: "Chemistry",
    difficulty: "easy",
  },
  {
    id: 8,
    question: "Who painted the Mona Lisa?",
    options: [
      { id: "a", text: "Pablo Picasso" },
      { id: "b", text: "Vincent Van Gogh" },
      { id: "c", text: "Leonardo da Vinci" },
      { id: "d", text: "Michelangelo" },
    ],
    correctAnswer: "c",
    explanation: "Leonardo da Vinci painted the Mona Lisa during the Renaissance.",
    category: "Art",
    difficulty: "medium",
  },
  {
    id: 9,
    question: "Which is the smallest prime number?",
    options: [
      { id: "a", text: "0" },
      { id: "b", text: "1" },
      { id: "c", text: "2" },
      { id: "d", text: "3" },
    ],
    correctAnswer: "c",
    explanation: "2 is the smallest and the only even prime number.",
    category: "Mathematics",
    difficulty: "easy",
  },
  {
    id: 10,
    question: "Who was the first man to step on the moon?",
    options: [
      { id: "a", text: "Buzz Aldrin" },
      { id: "b", text: "Yuri Gagarin" },
      { id: "c", text: "Neil Armstrong" },
      { id: "d", text: "Michael Collins" },
    ],
    correctAnswer: "c",
    explanation: "Neil Armstrong stepped on the moon on July 20, 1969.",
    category: "History",
    difficulty: "medium",
  },
  {
    id: 11,
    question: "Which organ is responsible for pumping blood in the human body?",
    options: [
      { id: "a", text: "Brain" },
      { id: "b", text: "Lungs" },
      { id: "c", text: "Heart" },
      { id: "d", text: "Liver" },
    ],
    correctAnswer: "c",
    explanation: "The heart pumps blood throughout the body.",
    category: "Biology",
    difficulty: "easy",
  },
  {
    id: 12,
    question: "What is the square root of 64?",
    options: [
      { id: "a", text: "6" },
      { id: "b", text: "7" },
      { id: "c", text: "8" },
      { id: "d", text: "9" },
    ],
    correctAnswer: "c",
    explanation: "The square root of 64 is 8.",
    category: "Mathematics",
    difficulty: "easy",
  },
  {
    id: 13,
    question: "Which language is primarily spoken in Brazil?",
    options: [
      { id: "a", text: "Spanish" },
      { id: "b", text: "Portuguese" },
      { id: "c", text: "English" },
      { id: "d", text: "French" },
    ],
    correctAnswer: "b",
    explanation: "Portuguese is the official language of Brazil.",
    category: "Geography",
    difficulty: "medium",
  },
  {
    id: 14,
    question: "What does CPU stand for?",
    options: [
      { id: "a", text: "Central Processing Unit" },
      { id: "b", text: "Computer Processing Unit" },
      { id: "c", text: "Control Panel Unit" },
      { id: "d", text: "Central Power Unit" },
    ],
    correctAnswer: "a",
    explanation: "CPU stands for Central Processing Unit — the brain of the computer.",
    category: "Technology",
    difficulty: "easy",
  },
  {
    id: 15,
    question: "Who is the author of 'Harry Potter'?",
    options: [
      { id: "a", text: "J.K. Rowling" },
      { id: "b", text: "Stephen King" },
      { id: "c", text: "George R.R. Martin" },
      { id: "d", text: "J.R.R. Tolkien" },
    ],
    correctAnswer: "a",
    explanation: "J.K. Rowling is the British author of the Harry Potter series.",
    category: "Literature",
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
  const [timeLeft, setTimeLeft] = useState(1800) // 15 minutes
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
                <span className="text-xl font-bold gradient-text">Triviai</span>
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
              <span className="text-xl font-bold gradient-text">Triviai</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Timer
                initialTime={1800}
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
                initialTime={1800}
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
