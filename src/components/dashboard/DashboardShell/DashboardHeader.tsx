'use client';

import { Button, Flex, IconButton, Logo } from '@/once-ui/components';
// import { UserMenu } from './UserMenu';
import styles from './DashboardHeader.module.scss';

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
    return (
        <header className={styles.header}>
            <Flex 
                fillWidth
                alignItems="center"
                justifyContent="space-between"
                gap="16"
                padding="16">
                <Flex alignItems="center" gap="16">
                    <IconButton
                        icon="menu"
                        variant="ghost"
                        onClick={onMenuClick}
                        className={styles.menuButton}
                    />
                    <Logo />
                </Flex>

                <Flex alignItems="center" gap="16">
                    <Button
                        variant="primary"
                        size="s"
                        label="New Patient"
                        prefixIcon="plus"
                    />
                    {/* <UserMenu /> */}
                </Flex>
            </Flex>
        </header>
    );
}