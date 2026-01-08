"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { Car, LogOut, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 glass">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              ParkBy
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="/find-spot" className="text-sm font-medium hover:text-primary transition-colors">
              Find Spot
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
          </nav>
          <div className="flex gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Hello, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button variant="neon" size="sm" asChild>
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10" />

          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
              Smart Parking <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                Reimagined
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              Experience the future of parking with AI-driven spot detection, seamless bookings, and real-time security monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <div className="relative flex w-full max-w-sm items-center">
                <Input
                  type="text"
                  placeholder="Enter location..."
                  className="pr-20 glass-card border-white/10 h-12"
                />
                <Button className="absolute right-1 top-1 bottom-1 h-auto" size="sm" asChild>
                  <Link href="/find-spot">Search</Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 w-full max-w-4xl">
              {[
                { label: "Active Spots", value: "2,400+" },
                { label: "Users", value: "50k+" },
                { label: "Cities", value: "12" },
                { label: "Rating", value: "4.9/5" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose ParkBy?</h2>
              <p className="text-muted-foreground">Advanced features for modern parking needs.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-300">
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Instant Booking</CardTitle>
                  <CardDescription>
                    Reserve your spot in seconds. No more circling around the block.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-300">
                <CardHeader>
                  <Car className="h-10 w-10 text-secondary mb-2" />
                  <CardTitle>Smart Detection</CardTitle>
                  <CardDescription>
                    CCTV integration automatically detects vacant spots in real-time.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-300">
                <CardHeader>
                  <ShieldCheck className="h-10 w-10 text-accent mb-2" />
                  <CardTitle>Secure & Safe</CardTitle>
                  <CardDescription>
                    24/7 monitoring ensures your vehicle is always safe with us.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-black/40 text-center">
        <div className="container mx-auto px-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} ParkBy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
