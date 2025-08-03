"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Trophy,
  Users,
  Zap,
  Target,
  Star,
  ArrowRight,
  Play,
  Clock,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  BarChart3,
  Moon,
  Sun,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

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

const quizCategories = [
  {
    id: "1",
    title: "Science & Technology",
    description: "Test your knowledge of physics, chemistry, biology, and tech",
    questions: 150,
    difficulty: "Mixed",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    participants: "12.5K",
  },
  {
    id: "2",
    title: "History & Geography",
    description: "Explore world history, cultures, and geographical wonders",
    questions: 200,
    difficulty: "Medium",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
    participants: "8.3K",
  },
  {
    id: "3",
    title: "Sports & Entertainment",
    description: "Movies, music, sports, and pop culture trivia",
    questions: 180,
    difficulty: "Easy",
    icon: Trophy,
    color: "from-orange-500 to-red-500",
    participants: "15.2K",
  },
  {
    id: "4",
    title: "Mathematics",
    description: "From basic arithmetic to advanced calculus",
    questions: 120,
    difficulty: "Hard",
    icon: Target,
    color: "from-purple-500 to-pink-500",
    participants: "6.8K",
  },
  {
    id: "5",
    title: "Literature & Arts",
    description: "Classic literature, poetry, and fine arts",
    questions: 90,
    difficulty: "Medium",
    icon: Star,
    color: "from-indigo-500 to-purple-500",
    participants: "4.9K",
  },
  {
    id: "6",
    title: "General Knowledge",
    description: "A mix of everything - perfect for testing broad knowledge",
    questions: 300,
    difficulty: "Mixed",
    icon: Zap,
    color: "from-violet-500 to-purple-500",
    participants: "22.1K",
  },
]

const recentQuizzes = [
  {
    id: 1,
    title: "World Capitals Challenge",
    score: 85,
    totalQuestions: 20,
    date: "2 hours ago",
    category: "Geography",
  },
  {
    id: 2,
    title: "Science Fundamentals",
    score: 92,
    totalQuestions: 15,
    date: "1 day ago",
    category: "Science",
  },
  {
    id: 3,
    title: "Movie Trivia Night",
    score: 78,
    totalQuestions: 25,
    date: "3 days ago",
    category: "Entertainment",
  },
]

export default function DashboardPage() {
  const handleStartQuiz = (categoryId: string) => {
    // Navigate directly to the quiz page
    window.location.href = `/quiz/${categoryId}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-violet-950/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg gradient-violet flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Triviai</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-sm font-medium text-primary">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
                Leaderboard
              </Link>
              <Link href="/result" className="text-sm font-medium hover:text-primary transition-colors">
                Results
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Welcome back, <span className="gradient-text">Quiz Master!</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Ready to challenge your knowledge? Pick a category and start your next quiz adventure.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-effect border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Quizzes</p>
                  <p className="text-2xl font-bold gradient-text">47</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
                  <p className="text-2xl font-bold gradient-text">85%</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Global Rank</p>
                  <p className="text-2xl font-bold gradient-text">#342</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Streak</p>
                  <p className="text-2xl font-bold gradient-text">12 days</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quiz Categories */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz Categories</h2>
              <Badge variant="secondary" className="gradient-violet text-white border-0">
                6 Available
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {quizCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Card
                    key={category.id}
                    className="glass-effect border-0 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleStartQuiz(category.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`h-12 w-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span>{category.questions} questions</span>
                        <span>{category.participants} players</span>
                      </div>
                      <Button className="w-full gradient-violet text-white border-0 hover:opacity-90">
                        <Play className="h-4 w-4 mr-2" />
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="glass-effect border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{quiz.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {quiz.category} • {quiz.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm gradient-text">
                        {quiz.score}/{quiz.totalQuestions}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/result">
                    View All Results
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Achievement Progress */}
            <Card className="glass-effect border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Next Achievement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Quiz Master</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">47/50</span>
                    </div>
                    <Progress value={94} className="h-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Complete 3 more quizzes to unlock</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Perfect Score</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">2/5</span>
                    </div>
                    <Progress value={40} className="h-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Get 3 more perfect scores</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-effect border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/leaderboard">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Leaderboard
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Challenge Friends
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Brain className="h-4 w-4 mr-2" />
                  AI Quiz Generator
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
