import { Flex, Logo, Text } from '@/once-ui/components';
import { FooterLinks, FooterLinkGroup } from './FooterLinks';
import { FooterSocial, SocialLink } from './FooterSocial';
import styles from './Footer.module.scss';

export interface FooterProps {
    groups: FooterLinkGroup[];
    socialLinks: SocialLink[];
    copyright?: string;
}

export const Footer: React.FC<FooterProps> = ({
    groups,
    socialLinks,
    copyright = `© ${new Date().getFullYear()} VetFlow. All rights reserved.`
}) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <Flex direction="column" gap="48">
                    <Flex
                        direction="column"
                        gap="48">
                        <Logo />
                        <FooterLinks groups={groups} />
                    </Flex>

                    <div className={styles.divider} />

                    <div className={styles.bottom}>
                        <Text
                            variant="body-default-s"
                            onBackground="neutral-medium">
                            {copyright}
                        </Text>
                        <FooterSocial links={socialLinks} />
                    </div>
                </Flex>
            </div>
        </footer>
    );
};