'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/lib/components/theme-provider';
import { ToastProvider } from '@/once-ui/components/ToastProvider';

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}