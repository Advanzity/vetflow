import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Activity, Calendar, FileText, Circle, Sparkles } from 'lucide-react';
import React from "react";

export default function VetFlowLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section remains the same */}
      {/* Navigation */}
      <nav className="fixed w-full backdrop-blur-[2px] z-50 border-b border-border-weak bg-surface-primary/70">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <Circle className="h-3 w-3 fill-primary text-primary" />
              <span className="text-lg font-medium tracking-tight text-text-primary">vetflow</span>
            </div>
            <Button className="button-primary rounded-full px-6">
              Get Access
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-secondary to-transparent" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-2xl">
            <Badge className="mb-8 elevation-raised" variant="secondary">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Veterinary Software Reimagined
            </Badge>
            <h1 className="text-6xl font-semibold tracking-tight text-text-primary mb-6">
              Where <span className="text-primary font-bold">intelligent design</span> meets veterinary excellence
            </h1>
            <p className="text-lg text-body mb-10">
              Experience the future of veterinary practice management. Seamlessly integrate AI-powered scheduling, 
              intuitive patient records, and automated billing in one elegant platform.
            </p>
            <div className="flex items-center gap-6">
              <Button 
                size="lg" 
                className="button-primary rounded-full h-14 px-8 text-base"
              >
                Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <span className="flex items-center text-sm text-text-tertiary">
                <Activity className="h-4 w-4 mr-1.5" />
                Trusted by 500+ clinics
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Smart Scheduling",
                description: "Intelligent appointment management with automated reminders",
                icon: Calendar,
                features: ["Reduce no-shows by 40%", "Smart conflict detection", "Multi-location support"]
              },
              {
                title: "Digital Records",
                description: "Complete patient history and medical records at your fingertips",
                icon: FileText,
                features: ["Secure cloud storage", "Quick search & filters", "Treatment tracking"]
              },
              {
                title: "Analytics & Reports",
                description: "Data-driven insights to grow your practice",
                icon: Activity,
                features: ["Financial forecasting", "Performance metrics", "Custom reports"]
              }
            ].map((feature, i) => (
              <Card key={i} className="surface-card-hover">
                <div className="relative space-y-4">
                  <div className="p-2 w-12 h-12 rounded-lg bg-surface-tertiary flex items-center justify-center">
                    {React.createElement(feature.icon, { className: "w-6 h-6 text-text-primary" })}
                  </div>
                  <h3 className="text-heading">{feature.title}</h3>
                  <p className="text-body">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.features.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <Circle className="w-1.5 h-1.5 fill-current text-primary" />
                        <span className="text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-surface-primary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl text-heading sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="text-body">
              Choose the perfect plan for your veterinary practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Basic",
                price: "49",
                description: "Perfect for small clinics",
                features: [
                  "Up to 500 patients",
                  "Basic appointment scheduling",
                  "Digital medical records",
                  "Email support",
                  "Basic reporting"
                ]
              },
              {
                name: "Professional",
                price: "99",
                description: "For growing practices",
                popular: true,
                features: [
                  "Unlimited patients",
                  "Advanced scheduling",
                  "Inventory management",
                  "Priority support",
                  "Financial reporting",
                  "Staff management",
                  "Custom templates"
                ]
              },
              {
                name: "Enterprise",
                price: "199",
                description: "For large clinics",
                features: [
                  "Multi-location support",
                  "Custom integrations",
                  "Dedicated account manager",
                  "Advanced analytics",
                  "24/7 phone support",
                  "Staff training",
                  "Custom development"
                ]
              }
            ].map((plan, i) => (
              <Card
                key={i}
                className={`surface-card elevation-floating ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-4">
                    <Badge className="bg-primary text-primary-foreground border-0 elevation-raised">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl text-heading">{plan.name}</h3>
                    <p className="text-sm text-body">{plan.description}</p>
                  </div>
                  <div className="flex items-baseline text-text-primary">
                    <span className="text-4xl font-bold tracking-tight">$</span>
                    <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                    <span className="ml-1 text-sm font-medium text-text-tertiary">/month</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <div className="h-4 w-4 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                        </div>
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular ? "button-primary" : "button-secondary"
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-surface-hover backdrop-blur-[2px]" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl text-heading mb-6">
              Ready to streamline your practice?
            </h2>
            
            <p className="text-lg text-body mb-12 max-w-2xl mx-auto">
              Start your 30-day free trial. No credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="button-primary min-w-[200px]">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" className="button-secondary min-w-[200px]">
                Book a Demo
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-text-tertiary">
              <div className="flex items-center gap-2">
                <Circle className="h-1.5 w-1.5 fill-current" />
                <span>Free for 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="h-1.5 w-1.5 fill-current" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border-weak">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Circle className="h-2 w-2 fill-primary text-primary" />
              <span className="text-sm text-text-tertiary"> 2024 VetFlow</span>
            </div>
            <div className="flex gap-6 text-sm">
              {['Privacy', 'Terms', 'Contact'].map((item) => (
                <Button key={item} variant="link" className="text-text-tertiary hover:text-primary transition-medium">
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}