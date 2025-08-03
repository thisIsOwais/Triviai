"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Clock, Target, TrendingUp } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

export interface QuizCardData {
  id: string
  title: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard" | "mixed"
  questionCount: number
  estimatedTime: number // in minutes
  participants: string
  icon: LucideIcon
  color: string
  isPopular?: boolean
  isNew?: boolean
}

interface QuizCardWithLeaderboardProps {
  quiz: QuizCardData
  onStartQuiz: (quizId: string) => void
  className?: string
}

export function QuizCardWithLeaderboard({ quiz, onStartQuiz, className = "" }: QuizCardWithLeaderboardProps) {
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

  const IconComponent = quiz.icon

  return (
    <Card className={`glass-effect border-0 hover:shadow-xl transition-all duration-300 group ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className={`h-12 w-12 rounded-lg bg-gradient-to-r ${quiz.color} flex items-center justify-center`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center space-x-2">
            {quiz.isNew && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 text-xs">
                New
              </Badge>
            )}
            {quiz.isPopular && (
              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300 text-xs">
                Popular
              </Badge>
            )}
            <Badge className={`text-xs ${getDifficultyColor(quiz.difficulty)}`}>
              {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
            </Badge>
          </div>
        </div>
        <CardTitle className="group-hover:text-primary transition-colors text-gray-900 dark:text-white">
          {quiz.title}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{quiz.description}</p>
      </CardHeader>
      <CardContent>
        {/* Quiz Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Target className="h-4 w-4" />
            <span>{quiz.questionCount} questions</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>~{quiz.estimatedTime} min</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4" />
            <span>{quiz.participants} players</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Badge variant="outline" className="text-xs">
              {quiz.category}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={() => onStartQuiz(quiz.id)}
            className="w-full gradient-violet text-white border-0 hover:opacity-90 group-hover:scale-105 transition-all duration-200"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Quiz
          </Button>
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <Link href={`/quiz/${quiz.id}/leaderboard`}>
              <TrendingUp className="h-4 w-4 mr-2" />
              View Leaderboard
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
