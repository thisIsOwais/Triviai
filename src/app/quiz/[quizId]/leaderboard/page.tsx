"use client"

import { Button } from "@/components/ui/button"
import { Brain, ArrowLeft, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { QuizLeaderboard, type QuizLeaderboardData } from "@/components/QuizLeaderboard"

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

// Sample data for the specific quiz leaderboard
const getQuizLeaderboardData = (quizId: string): QuizLeaderboardData => {
  const quizData = {
    "1": {
      quizTitle: "Science & Technology Fundamentals",
      category: "Science",
      difficulty: "Medium",
    },
    "2": {
      quizTitle: "World Geography Challenge",
      category: "Geography",
      difficulty: "Easy",
    },
    "3": {
      quizTitle: "Advanced Mathematics",
      category: "Mathematics",
      difficulty: "Hard",
    },
  }

  const quiz = quizData[quizId as keyof typeof quizData] || quizData["1"]

  return {
    quizId,
    quizTitle: quiz.quizTitle,
    category: quiz.category,
    difficulty: quiz.difficulty,
    totalAttempts: 1247,
    averageScore: 73,
    averageTime: 285,
    topPlayers: [
      {
        rank: 1,
        name: "Alex Chen",
        avatar: "AC",
        score: 2847,
        quizzes: 1,
        accuracy: 100,
        country: "🇺🇸",
      },
      {
        rank: 2,
        name: "Sarah Johnson",
        avatar: "SJ",
        score: 2756,
        quizzes: 1,
        accuracy: 95,
        country: "🇬🇧",
      },
      {
        rank: 3,
        name: "Miguel Rodriguez",
        avatar: "MR",
        score: 2698,
        quizzes: 1,
        accuracy: 92,
        country: "🇪🇸",
      },
      {
        rank: 4,
        name: "Emma Wilson",
        avatar: "EW",
        score: 2634,
        quizzes: 1,
        accuracy: 88,
        country: "🇨🇦",
      },
      {
        rank: 5,
        name: "Yuki Tanaka",
        avatar: "YT",
        score: 2587,
        quizzes: 1,
        accuracy: 85,
        country: "🇯🇵",
      },
    ],
    recentPlayers: [
      {
        rank: 1,
        name: "David Kim",
        avatar: "DK",
        score: 487,
        quizzes: 1,
        accuracy: 96,
        country: "🇰🇷",
      },
      {
        rank: 2,
        name: "Lisa Anderson",
        avatar: "LA",
        score: 456,
        quizzes: 1,
        accuracy: 93,
        country: "🇸🇪",
      },
      {
        rank: 3,
        name: "Marco Silva",
        avatar: "MS",
        score: 423,
        quizzes: 1,
        accuracy: 91,
        country: "🇧🇷",
      },
    ],
    userRank: {
      position: 23,
      score: 85,
      accuracy: 85,
      timeSpent: 245,
      completedAt: "2024-01-15T14:30:00Z",
    },
  }
}

export default function QuizLeaderboardPage() {
  const params = useParams()
  const router = useRouter()
  const [leaderboardData, setLeaderboardData] = useState<QuizLeaderboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading quiz-specific leaderboard data
    const loadData = async () => {
      setIsLoading(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const data = getQuizLeaderboardData(params.quizId as string)
      setLeaderboardData(data)
      setIsLoading(false)
    }

    loadData()
  }, [params.quizId])

  const handleRefresh = () => {
    const data = getQuizLeaderboardData(params.quizId as string)
    setLeaderboardData(data)
  }

  const handleRetakeQuiz = () => {
    router.push(`/quiz/${params.quizId}`)
  }

  if (isLoading) {
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
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading quiz leaderboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!leaderboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-violet-950/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Quiz leaderboard not found.</p>
          </div>
        </div>
      </div>
    )
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

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
                Global Leaderboard
              </Link>
              <Link
                href={`/quiz/${params.quizId}`}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Take Quiz
              </Link>
            </div>

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
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              Quiz <span className="gradient-text">Leaderboard</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              See how you rank against other players on this specific quiz
            </p>
          </div>

          {/* Quiz Leaderboard Component */}
          <QuizLeaderboard data={leaderboardData} onRefresh={handleRefresh} onRetakeQuiz={handleRetakeQuiz} />
        </div>
      </div>
    </div>
  )
}
