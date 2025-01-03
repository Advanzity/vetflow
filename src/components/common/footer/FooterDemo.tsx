import { Footer } from './Footer';

export const FooterDemo = () => {
    const groups = [
        {
            title: "Product",
            links: [
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "Security", href: "/security" },
                { label: "Roadmap", href: "/roadmap" }
            ]
        },
        {
            title: "Company",
            links: [
                { label: "About", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Blog", href: "/blog" },
                { label: "Press", href: "/press" }
            ]
        },
        {
            title: "Resources",
            links: [
                { label: "Documentation", href: "/docs" },
                { label: "Help Center", href: "/help" },
                { label: "Community", href: "/community" },
                { label: "Contact", href: "/contact" }
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
                { label: "Licenses", href: "/licenses" }
            ]
        }
    ];

    const socialLinks = [
        { icon: "github", href: "https://github.com", label: "GitHub" },
        { icon: "twitter", href: "https://twitter.com", label: "Twitter" },
        { icon: "linkedin", href: "https://linkedin.com", label: "LinkedIn" },
        { icon: "discord", href: "https://discord.com", label: "Discord" }
    ];

    return (
        <Footer
            groups={groups}
            socialLinks={socialLinks}
        />
    );
};