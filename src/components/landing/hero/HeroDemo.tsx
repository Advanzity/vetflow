'use client';

import { Hero } from './Hero';

const HeroDemo: React.FC = () => {
    return (
        <Hero
            title="Streamline Your Veterinary Practice with VetFlow"
            subtitle="The all-in-one platform designed to help veterinary practices manage patients, appointments, and records with ease."
            primaryCTA={{
                label: "Get Started",
                href: "/signup"
            }}
            secondaryCTA={{
                label: "Book Demo",
                href: "/demo"
            }}
        />
    );
};

export { HeroDemo };