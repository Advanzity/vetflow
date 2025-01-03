'use client';

import { usePathname } from 'next/navigation';
import { Flex, ToggleButton } from '@/once-ui/components';
import styles from './DashboardSidebar.module.scss';

interface DashboardSidebarProps {
    collapsed: boolean;
    onCollapse: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
    collapsed,
    onCollapse 
}) => {
    const pathname = usePathname();

    const navItems = [
        { label: 'Dashboard', icon: 'home', href: '/dashboard' },
        { label: 'Patients', icon: 'users', href: '/dashboard/patients' },
        { label: 'Appointments', icon: 'calendar', href: '/dashboard/appointments' },
        { label: 'Records', icon: 'fileText', href: '/dashboard/records' },
        { label: 'Analytics', icon: 'barChart', href: '/dashboard/analytics' },
        { label: 'Settings', icon: 'settings', href: '/dashboard/settings' }
    ];

    return (
        <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
            <Flex 
                direction="column"
                gap="4"
                padding="16">
                {navItems.map((item) => (
                    <ToggleButton
                        key={item.href}
                        selected={pathname === item.href}
                        href={item.href}
                        prefixIcon={item.icon}
                        label={collapsed ? undefined : item.label}
                        width="fill"
                        align="start"
                    />
                ))}
            </Flex>
        </aside>
    );
}