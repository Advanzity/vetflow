import { CarouselSection } from './CarouselSection';

export const CarouselDemo = () => {
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1200&h=600&fit=crop",
            badge: "Patient Management",
            title: "Streamline Your Practice",
            description: "Manage patient records, appointments, and treatments all in one place.",
            primaryAction: {
                label: "Get Started",
                href: "/signup"
            },
            secondaryAction: {
                label: "Learn More",
                href: "/features"
            }
        },
        {
            image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1200&h=600&fit=crop",
            badge: "Digital Records",
            title: "Go Paperless Today",
            description: "Access patient records instantly and securely from anywhere.",
            primaryAction: {
                label: "Try It Free",
                href: "/trial"
            },
            secondaryAction: {
                label: "Watch Demo",
                href: "/demo"
            }
        },
        {
            image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&h=600&fit=crop",
            badge: "Smart Analytics",
            title: "Data-Driven Insights",
            description: "Make informed decisions with comprehensive practice analytics.",
            primaryAction: {
                label: "See Analytics",
                href: "/analytics"
            },
            secondaryAction: {
                label: "Book Demo",
                href: "/demo"
            }
        }
    ];

    return <CarouselSection slides={slides} />;
};