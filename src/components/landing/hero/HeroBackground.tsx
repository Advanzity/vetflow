import { Background } from '@/once-ui/components';

interface HeroBackgroundProps {
    animate?: boolean;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
    animate = true
}) => {
    return (
        <>
            <Background
                position="absolute"
                gradient={{
                    display: true,
                    opacity: 0.5
                }}
                mask={animate ? "cursor" : "none"}
            />
            <Background
                position="absolute"
                dots={{
                    display: true,
                    opacity: 0.5,
                    size: "32"
                }}
                mask={animate ? "cursor" : "none"}
            />
        </>
    );
};