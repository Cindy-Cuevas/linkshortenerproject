import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, BarChart3, Shield, Zap, Users, QrCode } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect("/dashboard");
  }
  
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <section className="text-center mb-24 md:mb-32">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Shorten Links.<br />
            <span className="text-primary">Track Everything.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Create short, memorable links and gain powerful insights with our advanced analytics platform.
            Perfect for marketers, businesses, and content creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="text-base">
                Get Started Free
              </Button>
            </SignUpButton>
            <Button size="lg" variant="outline" className="text-base">
              View Demo
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-24 md:mb-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Powerful Features
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Everything you need to manage and optimize your links in one place
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Link2 className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Quick Link Shortening</CardTitle>
                <CardDescription>
                  Transform long URLs into short, shareable links in seconds. Custom aliases available.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Track clicks, locations, devices, and referrers. Get real-time insights on link performance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Enterprise-grade security with 99.9% uptime. Your links are always safe and accessible.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Blazing-fast redirects with global CDN. Your users experience zero delays.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Share and manage links across your team. Set permissions and collaborate seamlessly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <QrCode className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>QR Code Generation</CardTitle>
                <CardDescription>
                  Automatically generate QR codes for all your links. Perfect for print and offline campaigns.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Paste Your Link</h3>
              <p className="text-muted-foreground">
                Copy and paste any long URL into our dashboard
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Customize & Create</h3>
              <p className="text-muted-foreground">
                Add a custom alias or let us generate one for you
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Share & Track</h3>
              <p className="text-muted-foreground">
                Share your link and monitor performance in real-time
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-card rounded-2xl p-12 border shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join thousands of users who trust us with their links. Sign up now and start shortening!
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="text-base">
              Create Your Account
            </Button>
          </SignUpButton>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2026 Link Shortener. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
