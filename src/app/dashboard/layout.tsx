import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
// import { auth } from '@/lib/auth/auth';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const session = await auth();

    // if (!session) {
    //     redirect('/login');
    // }

    return <DashboardShell>{children}</DashboardShell>;
}