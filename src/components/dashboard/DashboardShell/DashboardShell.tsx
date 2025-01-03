'use client';

import { useEffect, useState } from 'react';
import { Flex } from '@/once-ui/components';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';
import styles from './DashboardShell.module.scss';

interface DashboardShellProps {
  children: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarCollapsed(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Flex fillHeight className={styles.shell}>
      <DashboardHeader
        onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <DashboardSidebar
        collapsed={sidebarCollapsed || isMobile}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </Flex>
  );
};
