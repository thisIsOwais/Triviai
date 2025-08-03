"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, RefreshCw } from "lucide-react"
import { LeaderboardList, type LeaderboardPlayer } from "./LeaderboardList"

export interface QuizLeaderboardData {
  quizId: string
  quizTitle: string
  category: string
  difficulty: string
  totalAttempts: number
  averageScore: number
  averageTime: number
  topPlayers: LeaderboardPlayer[]
  recentPlayers: LeaderboardPlayer[]
  userRank?: {
    position: number
    score: number
    accuracy: number
    timeSpent: number
    completedAt: string
  }
}

interface QuizLeaderboardProps {
  data: QuizLeaderboardData
  onRefresh?: () => void
  onRetakeQuiz?: () => void
  className?: string
}

export function QuizLeaderboard({ data, onRefresh, onRetakeQuiz, className = "" }: QuizLeaderboardProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quiz Info Header */}
      <Card className="glass-effect border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">{data.quizTitle}</CardTitle>
              <div className="flex items-center space-x-3 mt-2">
                <Badge variant="outline">{data.category}</Badge>
                <Badge className={`${getDifficultyColor(data.difficulty)}`}>{data.difficulty}</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {onRefresh && (
                <Button variant="outline" size="sm" onClick={onRefresh}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              )}
              {onRetakeQuiz && (
                <Button
                  className="gradient-violet text-white border-0 hover:opacity-90"
                  size="sm"
                  onClick={onRetakeQuiz}
                >
                  Retake Quiz
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">{data.totalAttempts.toLocaleString()}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Attempts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">{data.averageScore}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">{formatTime(data.averageTime)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User's Performance (if available) */}
      {data.userRank && (
        <Card className="glass-effect border-0 ring-2 ring-violet-200 dark:ring-violet-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Your Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 text-white font-bold">
                #{data.userRank.position}
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Score</div>
                    <div className="text-violet-600 dark:text-violet-400">{data.userRank.score}%</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Accuracy</div>
                    <div className="text-violet-600 dark:text-violet-400">{data.userRank.accuracy}%</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Time</div>
                    <div className="text-violet-600 dark:text-violet-400">{formatTime(data.userRank.timeSpent)}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Completed</div>
                    <div className="text-violet-600 dark:text-violet-400">
                      {new Date(data.userRank.completedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard Tabs */}
      <Tabs defaultValue="top" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="top">Top Performers</TabsTrigger>
          <TabsTrigger value="recent">Recent Attempts</TabsTrigger>
        </TabsList>

        <TabsContent value="top" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Highest Scores</h3>
            <Badge variant="secondary" className="gradient-violet text-white border-0">
              {data.topPlayers.length} Players
            </Badge>
          </div>
          <LeaderboardList players={data.topPlayers} showCategory={false} />
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Completions</h3>
            <Badge variant="secondary" className="gradient-violet text-white border-0">
              Last 24 Hours
            </Badge>
          </div>
          <LeaderboardList players={data.recentPlayers} showCategory={false} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
