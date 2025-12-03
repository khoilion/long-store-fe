"use client"

import type React from "react"

import { useState, useEffect } from "react"

export default function ComingSoon() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    // Set launch date to 30 days from now
    useEffect(() => {
        const launchDate = new Date()
        launchDate.setDate(launchDate.getDate() + 30)

        const timer = setInterval(() => {
            const now = new Date()
            const difference = launchDate.getTime() - now.getTime()

            if (difference <= 0) {
                clearInterval(timer)
                return
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24))
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((difference % (1000 * 60)) / 1000)

            setCountdown({ days, hours, minutes, seconds })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the email to your backend
        console.log("Email submitted:", email)
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 3000)
        setEmail("")
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
            <div className="w-full max-w-3xl text-center space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                     <span className="text-primary">Sắp ra mắt</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                    Chúng tôi đang nỗ lực hết mình để mang đến cho bạn những điều tuyệt vời. Hãy theo dõi và là người đầu tiên biết khi chúng tôi ra mắt.
                </p>

                <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
                    {Object.entries(countdown).map(([unit, value]) => (
                        <div key={unit} className="p-4 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold">{value}</span>
                            <span className="text-xs text-muted-foreground capitalize">{unit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
