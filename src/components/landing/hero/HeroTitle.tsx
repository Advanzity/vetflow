import { Heading, LetterFx } from '@/once-ui/components';

interface HeroTitleProps {
    title: string;
    highlight?: string;
}

export const HeroTitle: React.FC<HeroTitleProps> = ({
    title,
    highlight
}) => {
    if (!highlight) {
        return (
            <Heading 
                variant="display-strong-xl" 
                align="center">
                {title}
            </Heading>
        );
    }

    const parts = title.split(highlight);
    const beforeText = parts[0];
    const afterText = parts[1];

    return (
        <Heading 
            variant="display-strong-xl" 
            align="center">
            {beforeText}
            <LetterFx trigger="instant">
                {highlight}
            </LetterFx>
            {afterText}
        </Heading>
    );
};