import { HeroDemo } from '@/components/landing/hero/HeroDemo';
import { CarouselDemo } from '@/components/common/carousel/CarouselDemo';
import { FeaturesDemo } from '@/components/landing/features/FeaturesDemo';
import { PricingSection } from '@/components/landing/pricing/PricingSection';
import { FooterDemo } from '@/components/common/footer/FooterDemo';

export default function LandingPage() {
    const pricingTiers = [
        {
            name: "Basic",
            price: 49,
            interval: "month" as "month",
            description: "Perfect for small veterinary practices",
            features: [
                { feature: "Up to 500 patient records", included: true },
                { feature: "Basic appointment scheduling", included: true },
                { feature: "Email support", included: true },
                { feature: "Advanced analytics", included: false },
                { feature: "Custom branding", included: false }
            ]
        },
        {
            name: "Professional",
            price: 99,
            interval: "month" as "month" | "year",
            description: "Ideal for growing clinics",
            isPopular: true,
            features: [
                { feature: "Unlimited patient records", included: true },
                { feature: "Advanced scheduling", included: true },
                { feature: "Priority support", included: true },
                { feature: "Advanced analytics", included: true },
                { feature: "Custom branding", included: true }
            ]
        },
        {
            name: "Enterprise",
            price: 199,
            interval: "month" as "month" | "year",
            description: "For large veterinary hospitals",
            features: [
                { feature: "Unlimited everything", included: true },
                { feature: "24/7 premium support", included: true },
                { feature: "Custom integrations", included: true },
                { feature: "Advanced security", included: true },
                { feature: "Training sessions", included: true }
            ]
        }
    ];

    return (
        <main>
            {/* Hero Section */}
            <HeroDemo />

            {/* Carousel Section */}
            <CarouselDemo />

            {/* Features Section */}
            <FeaturesDemo />
            
            {/* Pricing Section */}
            <PricingSection
                title="Choose Your Plan"
                subtitle="Select the perfect plan for your veterinary practice"
                tiers={pricingTiers}
            />

            {/* Footer */}
            <FooterDemo />
        </main>
    );
}