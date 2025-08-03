"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Trophy, Medal, Crown, TrendingUp, Users, Calendar, Moon, Sun } from "lucide-react"
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

const globalLeaderboard = [
  {
    rank: 1,
    name: "Alex Chen",
    avatar: "AC",
    score: 2847,
    quizzes: 156,
    accuracy: 94,
    streak: 28,
    country: "🇺🇸",
  },
  {
    rank: 2,
    name: "Sarah Johnson",
    avatar: "SJ",
    score: 2756,
    quizzes: 142,
    accuracy: 91,
    streak: 22,
    country: "🇬🇧",
  },
  {
    rank: 3,
    name: "Miguel Rodriguez",
    avatar: "MR",
    score: 2698,
    quizzes: 138,
    accuracy: 89,
    streak: 19,
    country: "🇪🇸",
  },
  {
    rank: 4,
    name: "Emma Wilson",
    avatar: "EW",
    score: 2634,
    quizzes: 129,
    accuracy: 92,
    streak: 15,
    country: "🇨🇦",
  },
  {
    rank: 5,
    name: "Yuki Tanaka",
    avatar: "YT",
    score: 2587,
    quizzes: 134,
    accuracy: 88,
    streak: 31,
    country: "🇯🇵",
  },
]

const weeklyLeaderboard = [
  {
    rank: 1,
    name: "David Kim",
    avatar: "DK",
    score: 487,
    quizzes: 23,
    accuracy: 96,
    country: "🇰🇷",
  },
  {
    rank: 2,
    name: "Lisa Anderson",
    avatar: "LA",
    score: 456,
    quizzes: 21,
    accuracy: 93,
    country: "🇸🇪",
  },
  {
    rank: 3,
    name: "Marco Silva",
    avatar: "MS",
    score: 423,
    quizzes: 19,
    accuracy: 91,
    country: "🇧🇷",
  },
]

const categoryLeaderboard = [
  {
    rank: 1,
    name: "Dr. Physics",
    avatar: "DP",
    score: 1247,
    category: "Science",
    accuracy: 97,
    country: "🇩🇪",
  },
  {
    rank: 2,
    name: "History Buff",
    avatar: "HB",
    score: 1189,
    category: "History",
    accuracy: 94,
    country: "🇫🇷",
  },
  {
    rank: 3,
    name: "Math Wizard",
    avatar: "MW",
    score: 1156,
    category: "Mathematics",
    accuracy: 95,
    country: "🇮🇳",
  },
]

function LeaderboardCard({ players, showStreak = false }: { players: any[]; showStreak?: boolean }) {
  return (
    <div className="space-y-3">
      {players.map((player, index) => {
        const isTopThree = player.rank <= 3
        const rankIcon = player.rank === 1 ? Crown : player.rank === 2 ? Trophy : player.rank === 3 ? Medal : null

        return (
          <Card
            key={player.rank}
            className={`glass-effect border-0 ${isTopThree ? "ring-2 ring-violet-200 dark:ring-violet-800" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      player.rank === 1
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                        : player.rank === 2
                          ? "bg-gradient-to-r from-gray-300 to-gray-500"
                          : player.rank === 3
                            ? "bg-gradient-to-r from-orange-400 to-orange-600"
                            : "bg-gradient-to-r from-violet-400 to-purple-400"
                    } text-white font-bold text-sm`}
                  >
                    {rankIcon ? <rankIcon className="h-4 w-4" /> : player.rank}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 flex items-center justify-center text-white font-semibold">
                    {player.avatar}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{player.name}</h3>
                    <span className="text-lg">{player.country}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{player.quizzes} quizzes</span>
                    <span>{player.accuracy}% accuracy</span>
                    {showStreak && <span>{player.streak} day streak</span>}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold gradient-text">{player.score.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-violet-950/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg gradient-violet flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">QuizMaster</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="text-sm font-medium text-primary">
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            <span className="gradient-text">Global</span> Leaderboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">See how you rank against quiz masters worldwide</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-effect border-0">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold gradient-text">50,247</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Players</div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold gradient-text">#342</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Your Global Rank</div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold gradient-text">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="global">Global Rankings</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All-Time Leaders</h2>
              <Badge variant="secondary" className="gradient-violet text-white border-0">
                Updated Live
              </Badge>
            </div>
            <LeaderboardCard players={globalLeaderboard} showStreak={true} />
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weekly Champions</h2>
              <Badge variant="secondary" className="gradient-violet text-white border-0">
                Resets Monday
              </Badge>
            </div>
            <LeaderboardCard players={weeklyLeaderboard} />
          </TabsContent>

          <TabsContent value="category" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Category Leaders</h2>
              <Badge variant="secondary" className="gradient-violet text-white border-0">
                Top Specialists
              </Badge>
            </div>
            <LeaderboardCard players={categoryLeaderboard} />
          </TabsContent>
        </Tabs>

        {/* Your Position */}
        <Card className="glass-effect border-0 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Your Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 text-white font-bold text-sm">
                342
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 flex items-center justify-center text-white font-semibold">
                YU
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">You (Demo User)</h3>
                  <span className="text-lg">🌍</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>47 quizzes</span>
                  <span>85% accuracy</span>
                  <span>12 day streak</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold gradient-text">1,847</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">points</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
