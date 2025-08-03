"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Trophy, Medal } from "lucide-react"

export interface LeaderboardPlayer {
  rank: number
  name: string
  avatar: string
  score: number
  quizzes: number
  accuracy: number
  streak?: number
  country: string
  category?: string
}

interface LeaderboardListProps {
  players: LeaderboardPlayer[]
  showStreak?: boolean
  showCategory?: boolean
  className?: string
}

export function LeaderboardList({
  players,
  showStreak = false,
  showCategory = false,
  className = "",
}: LeaderboardListProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return Crown
      case 2:
        return Trophy
      case 3:
        return Medal
      default:
        return null
    }
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500"
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-600"
      default:
        return "bg-gradient-to-r from-violet-400 to-purple-400"
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {players.map((player) => {
        const isTopThree = player.rank <= 3
        const RankIcon = getRankIcon(player.rank)

        return (
          <Card
            key={`${player.rank}-${player.name}`}
            className={`glass-effect border-0 transition-all duration-200 hover:shadow-lg ${
              isTopThree ? "ring-2 ring-violet-200 dark:ring-violet-800" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                {/* Rank and Avatar */}
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${getRankStyle(
                      player.rank,
                    )} text-white font-bold text-sm`}
                  >
                    {RankIcon ? <RankIcon className="h-4 w-4" /> : player.rank}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 flex items-center justify-center text-white font-semibold">
                    {player.avatar}
                  </div>
                </div>

                {/* Player Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{player.name}</h3>
                    <span className="text-lg">{player.country}</span>
                    {isTopThree && (
                      <Badge variant="secondary" className="text-xs">
                        Top {player.rank}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{player.quizzes} quizzes</span>
                    <span>{player.accuracy}% accuracy</span>
                    {showStreak && player.streak && <span>{player.streak} day streak</span>}
                    {showCategory && player.category && (
                      <Badge variant="outline" className="text-xs">
                        {player.category}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Score */}
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
