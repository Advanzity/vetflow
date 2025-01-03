import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";
import { headers } from "next/headers";
import { Metadata } from "next";
import { baseURL, style, meta, og, schema, social } from "@/once-ui/resources/config";
import { Background, Flex } from '@/once-ui/components';
import { Inter } from 'next/font/google';
import { Roboto_Mono } from 'next/font/google';
import { Providers } from '@/components/providers/Providers';
import { GridBackground } from '@/components/backgrounds/GridBackground';

const primary = Inter({
    variable: '--font-primary',
    subsets: ['latin'],
    display: 'swap'
});

const code = Roboto_Mono({
    variable: '--font-code',
    subsets: ['latin'],
    display: 'swap',
});

type FontConfig = {
    variable: string;
};

const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;

const schemaData = {
    "@context": "https://schema.org",
    "@type": schema.type,
    "url": "https://" + baseURL,
    "logo": schema.logo,
    "name": schema.name,
    "description": schema.description,
    "email": schema.email,
    "sameAs": Object.values(social).filter(Boolean)
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Flex
            as="html" lang="en"
            fillHeight background="page"
            data-neutral={style.neutral} data-brand={style.brand} data-accent={style.accent}
            data-border={style.border} data-theme={style.theme}
            data-solid={style.solid} data-solid-style={style.solidStyle}
            data-surface={style.surface} data-transition={style.transition}
            data-scaling={style.scaling}
            className={`${primary.variable} ${code.variable} ${secondary ? secondary.variable : ''} ${tertiary ? tertiary.variable : ''}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
                />
            </head>
            <Flex
                as="body"
                fillWidth fillHeight margin="0" padding="0">
                <Providers>
                    <Flex flex={1} direction="column">
                        {/* <GridBackground 
                            speed="normal"
                            density="small"
                            perspective={1000}
                            opacity={0.15}
                        /> */}
                        {children}
                    </Flex>
                </Providers>
            </Flex>
        </Flex>
    );
}