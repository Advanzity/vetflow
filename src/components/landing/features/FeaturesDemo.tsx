import { Features } from './Features';

export const FeaturesDemo = () => {
    const features = [
        {
            icon: "calendar",
            title: "Smart Scheduling",
            description: "Efficiently manage appointments with our intelligent scheduling system that prevents double bookings and optimizes your clinic's time."
        },
        {
            icon: "fileText",
            title: "Digital Records",
            description: "Keep all patient records, medical histories, and test results in one secure, easily accessible digital location."
        },
        {
            icon: "bell",
            title: "Automated Reminders",
            description: "Send automated appointment reminders and follow-ups to reduce no-shows and improve client communication."
        },
        {
            icon: "barChart",
            title: "Analytics & Insights",
            description: "Make data-driven decisions with comprehensive analytics about your practice's performance and growth."
        },
        {
            icon: "users",
            title: "Team Collaboration",
            description: "Enable seamless communication between staff members with real-time updates and task management."
        },
        {
            icon: "smartphone",
            title: "Mobile Access",
            description: "Access your practice management system anywhere, anytime with our secure mobile application."
        }
    ];

    return (
        <Features
            heading="Everything You Need"
            subheading="Powerful features to streamline your veterinary practice and provide better care for your patients."
            features={features}
        />
    );
};