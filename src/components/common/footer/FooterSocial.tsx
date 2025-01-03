import { Icon } from '@/once-ui/components';
import styles from './FooterSocial.module.scss';

export interface SocialLink {
    icon: string;
    href: string;
    label: string;
}

interface FooterSocialProps {
    links: SocialLink[];
}

export const FooterSocial: React.FC<FooterSocialProps> = ({
    links
}) => {
    return (
        <div 
            className={styles.social}
            role="list"
            aria-label="Social media links">
            {links.map((link) => (
                <a
                    key={link.label}
                    href={link.href}
                    className={styles.iconLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    role="listitem">
                    <Icon
                        name={link.icon}
                        size="m"
                        onBackground="neutral-medium" />
                </a>
            ))}
        </div>
    );
};