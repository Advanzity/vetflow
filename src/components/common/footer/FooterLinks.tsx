import { Heading, SmartLink } from '@/once-ui/components';
import styles from './FooterLinks.module.scss';

export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterLinkGroup {
    title: string;
    links: FooterLink[];
}

interface FooterLinksProps {
    groups: FooterLinkGroup[];
}

export const FooterLinks: React.FC<FooterLinksProps> = ({
    groups
}) => {
    return (
        <nav className={styles.linksGrid}>
            {groups.map((group) => (
                <div 
                    key={group.title}
                    className={styles.linkGroup}
                    role="group"
                    aria-labelledby={`footer-group-${group.title}`}>
                    <Heading
                        id={`footer-group-${group.title}`}
                        variant="heading-strong-xs">
                        {group.title}
                    </Heading>
                    <div 
                        className={styles.linkList}
                        role="list">
                        {group.links.map((link) => (
                            <SmartLink
                                key={link.label}
                                href={link.href}
                                className={styles.link}
                                role="listitem">
                                {link.label}
                            </SmartLink>
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    );
};