"use client"

import { ChevronDown, Play, Menu, X, Sun, Moon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import React, { useState, forwardRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// --- TypeScript Interfaces ---

interface NavLinkProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  fullWidth?: boolean
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

// --- Reusable Components ---

export function NavLink({ href, onClick, children, className }: NavLinkProps) {
  const baseClass = "text-[#6b7c93] dark:text-slate-400 text-sm font-medium hover:text-[#1b2a4e] dark:hover:text-slate-100 transition-colors flex items-center gap-1 py-1"
  
  if (href) {
    return (
      <Link href={href} className={cn(baseClass, className)}>
        {children}
      </Link>
    )
  }
  
  return (
    <button onClick={onClick} className={cn(baseClass, className)}>
      {children}
    </button>
  )
}

export function Button({
  href,
  fullWidth = false,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "rounded-full font-semibold transition-colors inline-flex items-center justify-center text-center whitespace-nowrap"
  
  const variantClasses = {
    primary: "bg-[#43d3b1] text-white hover:bg-[#3bc4a3]",
    secondary: "text-[#6b7c93] dark:text-slate-400 hover:text-[#1b2a4e] dark:hover:text-slate-100",
  }
  
  const sizeClasses = {
    sm: "text-sm px-5 py-2.5 font-medium",
    md: "text-base py-4 px-6",
    lg: "text-lg py-5 px-8",
  }
  
  const widthClass = fullWidth ? "w-full" : ""
  
  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className
  )
  
  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    )
  }
  
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  )
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full px-6 py-4 border border-[#e2e8f0] dark:border-slate-800 rounded-full text-[#6b7c93] dark:text-slate-200 placeholder:text-[#a0aec0] focus:outline-none focus:border-[#43d3b1] focus:ring-1 focus:ring-[#43d3b1] transition-colors bg-white dark:bg-slate-900",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

// --- Main Page Component ---

export default function StartupLanding() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    setMounted(true)
  }, [])

  const toggleDarkMode = () => {
    const newDark = !darkMode
    setDarkMode(newDark)
    if (newDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-slate-950 text-[#1b2a4e] dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Navigation */}
      <header className="w-full px-6 md:px-8 py-5 max-w-7xl mx-auto relative z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-[#1b2a4e] dark:text-slate-100 font-bold text-xl tracking-tight shrink-0">
              Startup 3
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <NavLink>
                Products
                <ChevronDown className="w-4 h-4 text-[#a0aec0]" />
              </NavLink>
              <NavLink href="/pricing">Pricing</NavLink>
              <NavLink href="/community">Community</NavLink>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/api">API</NavLink>
            <NavLink href="/help">Help</NavLink>
            <NavLink href="/login">Login</NavLink>
            <Button href="/signup" size="sm">
              Sign Up
            </Button>
            
            {/* Dark Mode Toggle Button */}
            {mounted && (
              <button
                onClick={toggleDarkMode}
                className="p-2 text-[#6b7c93] dark:text-slate-400 hover:text-[#1b2a4e] dark:hover:text-slate-100 hover:bg-[#e2e8f0]/50 dark:hover:bg-slate-800/50 rounded-full transition-all duration-200"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
          </div>

          {/* Mobile Action Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={toggleDarkMode}
                className="p-2 text-[#6b7c93] dark:text-slate-400 hover:text-[#1b2a4e] dark:hover:text-slate-100 hover:bg-[#e2e8f0]/50 dark:hover:bg-slate-800/50 rounded-full transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button 
              className="p-2 text-[#1b2a4e] dark:text-slate-100 hover:bg-[#e2e8f0]/50 dark:hover:bg-slate-800/50 rounded-full transition-colors" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-4 right-4 bg-white dark:bg-slate-900 shadow-xl rounded-2xl border border-[#e2e8f0] dark:border-slate-800 p-6 mt-2 flex flex-col gap-4 z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink className="justify-between w-full">
                Products
                <ChevronDown className="w-4 h-4 text-[#a0aec0]" />
              </NavLink>
              <NavLink href="/pricing" className="w-full">Pricing</NavLink>
              <NavLink href="/community" className="w-full">Community</NavLink>
              <div className="h-px bg-[#e2e8f0] dark:bg-slate-800 my-1" />
              <NavLink href="/api" className="w-full">API</NavLink>
              <NavLink href="/help" className="w-full">Help</NavLink>
              <NavLink href="/login" className="w-full">Login</NavLink>
              <Button href="/signup" size="sm" className="w-full mt-2">
                Sign Up
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-16 lg:py-20 w-full flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left Column - Form with Viewport Entrance Animation */}
          <motion.div 
            className="max-w-md w-full mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-[#1b2a4e] dark:text-slate-100 text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight tracking-tight mb-8 md:mb-12">
              A high-quality solution for those who want a beautiful startup website quickly
            </h1>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="pt-2">
                <Button type="submit" fullWidth>
                  Sign In
                </Button>
              </div>
              <p className="text-center text-[#a0aec0] dark:text-slate-500 text-sm pt-2">
                By signing up, you agree to the{" "}
                <Link href="/terms" className="text-[#6b7c93] dark:text-slate-400 hover:text-[#1b2a4e] dark:hover:text-slate-100 transition-colors">
                  Terms of Service
                </Link>
              </p>
            </form>
          </motion.div>

          {/* Right Column - Image & Description with aspect ratio to prevent CLS */}
          <motion.div 
            className="w-full max-w-[520px] mx-auto lg:mx-0 lg:pt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            {/* aspect-[520/320] wrapper guarantees precise layout slot reservation preventing any layout shift */}
            <div className="relative rounded-lg overflow-hidden mb-6 aspect-[520/320] w-full bg-[#f1f3f7] dark:bg-slate-900">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/header_3_sm%402x-Gp2lxW3WdGLlvZOBlspD7v2o8Kyq0n.png"
                alt="3D rendered chattering teeth toy with colorful desserts"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover rounded-lg"
                priority
              />
              <button
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Play video"
              >
                <div className="w-16 h-16 bg-[#ff5c5c] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
              </button>
            </div>
            <p className="text-[#6b7c93] dark:text-slate-400 text-base leading-relaxed max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              We made it so beautiful and simple. It combines landings, pages, blogs and shop screens. It is definitely the tool you need in your collection!
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
