"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

export interface QuestionOption {
  id: string
  text: string
}

export interface QuestionData {
  id: number
  question: string
  options: QuestionOption[]
  selectedAnswer?: string
  correctAnswer?: string
  explanation?: string
  category?: string
  difficulty?: "easy" | "medium" | "hard"
}

interface QuestionCardProps {
  question: QuestionData
  questionNumber: number
  totalQuestions: number
  onAnswerSelect: (answerId: string) => void
  showResult?: boolean
  className?: string
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSelect,
  showResult = false,
  className = "",
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(question.selectedAnswer)

  useEffect(() => {
    setSelectedOption(question.selectedAnswer)
  }, [question.selectedAnswer])

  const handleOptionSelect = (optionId: string) => {
    if (showResult) return // Prevent selection in result mode

    setSelectedOption(optionId)
    onAnswerSelect(optionId)
  }

  const getOptionStyle = (optionId: string) => {
    const isSelected = selectedOption === optionId

    if (showResult) {
      const isCorrect = optionId === question.correctAnswer
      const isSelectedWrong = isSelected && !isCorrect

      if (isCorrect) {
        return "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
      }
      if (isSelectedWrong) {
        return "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
      }
      return "border-gray-200 dark:border-gray-700 opacity-60"
    }

    if (isSelected) {
      return "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 ring-2 ring-violet-200 dark:ring-violet-800"
    }

    return "border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600 hover:bg-violet-50/50 dark:hover:bg-violet-900/10"
  }

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
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
    <Card className={`glass-effect border-0 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="gradient-violet text-white border-0">
            Question {questionNumber} of {totalQuestions}
          </Badge>
          <div className="flex items-center space-x-2">
            {question.category && (
              <Badge variant="outline" className="text-xs">
                {question.category}
              </Badge>
            )}
            {question.difficulty && (
              <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-xl text-gray-900 dark:text-white leading-relaxed">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index) // A, B, C, D
            const isSelected = selectedOption === option.id
            const isCorrect = showResult && option.id === question.correctAnswer

            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${getOptionStyle(
                  option.id,
                )} ${showResult ? "cursor-default" : "cursor-pointer hover:shadow-md"}`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm ${
                      isSelected
                        ? showResult
                          ? isCorrect
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-red-500 bg-red-500 text-white"
                          : "border-violet-500 bg-violet-500 text-white"
                        : isCorrect && showResult
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {isCorrect && showResult ? <CheckCircle className="h-4 w-4" /> : optionLetter}
                  </div>
                  <span className="flex-1 text-gray-900 dark:text-white">{option.text}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation (shown in result mode) */}
        {showResult && question.explanation && (
          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Explanation</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">{question.explanation}</p>
          </div>
        )}

        {/* Selection Status */}
        {!showResult && (
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{selectedOption ? "Answer selected" : "Select an answer to continue"}</span>
            {selectedOption && <CheckCircle className="h-4 w-4 text-green-500" />}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
