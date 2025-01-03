const baseURL = 'demo.once-ui.com'

// Updated theme configuration for a professional medical dashboard
const style = {
    theme: 'dark',        // Light theme for medical/clinical setting
    neutral: 'gray',      // Slate for a professional, clean look
    brand: 'cyan',         // Cyan for a medical/healthcare feel
    accent: 'blue',        // Blue as complementary accent
    solid: 'color',        // Color for solid elements
    solidStyle: 'flat',    // Flat style for modern look
    border: 'conservative', // Conservative borders for professionalism
    surface: 'translucent', // Translucent surfaces for depth
    transition: 'micro',    // Micro transitions for subtlety
    scaling: '100',        // Default scaling
}

// Rest of the config remains the same
const meta = {
    title: 'VetFlow - Veterinary Practice Management',
    description: 'Modern veterinary practice management system for streamlined patient care and clinic operations.'
}

const og = {
    title: 'VetFlow Dashboard',
    description: 'Professional veterinary practice management system.',
    type: 'website'
}

const schema = {
    type: 'Organization',
    name: 'VetFlow',
    description: 'Professional veterinary practice management system.',
    email: 'support@vetflow.com'
}

const social = {
    twitter: 'https://twitter.com/vetflow',
    linkedin: 'https://linkedin.com/company/vetflow',
    discord: 'https://discord.gg/vetflow'
}

export { baseURL, style, meta, og, schema, social };