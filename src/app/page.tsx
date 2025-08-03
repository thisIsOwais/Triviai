"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Trophy,
  Users,
  Zap,
  Target,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  TrendingUp,
  Award,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

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

export default  function LandingPage() {
  // const { signIn, isLoaded, setActive } = useSignIn()
  const router= useRouter();
  const { isSignedIn, userId } = useAuth()
  const handleAuthAction = (action: string) => {
    // e.preventDefault()

    // if (!isLoaded) return
    console.log(isSignedIn)
    if(isSignedIn)
    {
      console.log("Sign in clicked")
      console.log(isSignedIn)
      router.push('/dashboard')
      return;
    }
      router.push('/sign-in');
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-violet-950/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg gradient-violet flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">QuizMaster</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                How it Works
              </Link>
              <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
                Testimonials
              </Link>
              <button
                onClick={() => handleAuthAction("Leaderboard view")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Leaderboard
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={() => handleAuthAction("Sign in")}>
                Sign In
              </Button>
              <Button
                size="sm"
                className="gradient-violet text-white border-0 hover:opacity-90"
                onClick={() => handleAuthAction("Sign up")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 dark:from-violet-600/5 dark:to-purple-600/5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 gradient-violet text-white border-0" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              New: AI-Powered Quiz Generation
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Challenge Your <span className="gradient-text">Knowledge</span>
              <br />
              Master Every <span className="gradient-text">Quiz</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Dive into the ultimate quiz experience. Test your knowledge across thousands of topics, compete with
              friends, and climb the global leaderboards in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="gradient-violet text-white border-0 hover:opacity-90 text-lg px-8 py-6"
                onClick={() => handleAuthAction("Start playing")}
              >
                <Play className="h-5 w-5 mr-2" />
                Start Playing Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent"
                onClick={() => handleAuthAction("Dashboard view")}
              >
                View Dashboard
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">50K+</div>
                <div className="text-sm text-muted-foreground">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">10M+</div>
                <div className="text-sm text-muted-foreground">Questions Answered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">500+</div>
                <div className="text-sm text-muted-foreground">Quiz Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Everything You Need for the <span className="gradient-text">Perfect Quiz Experience</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover powerful features designed to make learning fun, competitive, and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-violet flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Smart Quiz Generation</CardTitle>
                <CardDescription>
                  AI-powered quiz creation with adaptive difficulty based on your performance and interests.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-violet flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Global Leaderboards</CardTitle>
                <CardDescription>
                  Compete with players worldwide and track your progress across different categories and difficulty
                  levels.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-violet flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Multiplayer Battles</CardTitle>
                <CardDescription>
                  Challenge friends in real-time quiz battles or join public rooms for instant competition.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-violet flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Optimized for speed with instant question loading and real-time score updates.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-violet flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Personalized Learning</CardTitle>
                <CardDescription>
                  Adaptive learning paths that focus on your weak areas and reinforce your strengths.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-violet flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Achievement System</CardTitle>
                <CardDescription>
                  Unlock badges, earn points, and celebrate milestones as you progress through your learning journey.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Get Started in <span className="gradient-text">3 Simple Steps</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of learners and start your quiz journey today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full gradient-violet flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Your Account</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up in seconds and customize your profile with your interests and skill level.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full gradient-violet flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Quiz</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse hundreds of categories or let our AI create personalized quizzes just for you.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full gradient-violet flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Play & Compete</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Answer questions, earn points, and climb the leaderboards while learning something new.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Loved by <span className="gradient-text">Quiz Enthusiasts</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what our community has to say about their QuizMaster experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg glass-effect">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "QuizMaster has completely transformed how I study. The adaptive difficulty keeps me challenged, and
                  the multiplayer battles make learning so much fun!"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 flex items-center justify-center text-white font-semibold">
                    S
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Medical Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg glass-effect">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The AI-generated quizzes are incredibly smart. They always seem to know exactly what I need to work
                  on. My test scores have improved dramatically!"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Marcus Johnson</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">High School Teacher</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg glass-effect">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "I love the competitive aspect! Racing against friends and seeing my name on the leaderboard motivates
                  me to keep learning new things every day."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 flex items-center justify-center text-white font-semibold">
                    E
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Emily Rodriguez</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">College Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-violet opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="gradient-text">Master Every Quiz?</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Join over 50,000 learners who are already improving their knowledge and having fun with QuizMaster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                className="gradient-violet text-white border-0 hover:opacity-90 text-lg px-8 py-6"
                onClick={() => handleAuthAction("Start your journey")}
              >
                <Play className="h-5 w-5 mr-2" />
                Start Your Journey
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent"
                onClick={() => handleAuthAction("Leaderboard view")}
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                View Leaderboard
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Free to start
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Instant access
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg gradient-violet flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">QuizMaster</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The ultimate quiz platform for learners, educators, and knowledge enthusiasts worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button
                    onClick={() => handleAuthAction("Dashboard view")}
                    className="hover:text-primary transition-colors"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleAuthAction("Quiz view")}
                    className="hover:text-primary transition-colors"
                  >
                    Quizzes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleAuthAction("Leaderboard view")}
                    className="hover:text-primary transition-colors"
                  >
                    Leaderboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleAuthAction("Results view")}
                    className="hover:text-primary transition-colors"
                  >
                    Results
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => alert("Demo: About page")} className="hover:text-primary transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Demo: Contact page")} className="hover:text-primary transition-colors">
                    Contact
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Demo: Privacy page")} className="hover:text-primary transition-colors">
                    Privacy
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Demo: Terms page")} className="hover:text-primary transition-colors">
                    Terms
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => alert("Demo: Help Center")} className="hover:text-primary transition-colors">
                    Help Center
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Demo: Documentation")} className="hover:text-primary transition-colors">
                    Documentation
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Demo: Community")} className="hover:text-primary transition-colors">
                    Community
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Demo: Status page")} className="hover:text-primary transition-colors">
                    Status
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} QuizMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
