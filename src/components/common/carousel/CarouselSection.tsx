import { Badge, Button, Carousel, Flex, Heading, Text } from '@/once-ui/components';
import styles from './CarouselSection.module.scss';

interface CarouselSlide {
    image: string;
    badge: string;
    title: string;
    description: string;
    primaryAction?: {
        label: string;
        href: string;
    };
    secondaryAction?: {
        label: string;
        href: string;
    };
}

interface CarouselSectionProps {
    slides: CarouselSlide[];
}

export const CarouselSection: React.FC<CarouselSectionProps> = ({
    slides
}) => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <Carousel
                    images={slides.map(slide => ({
                        src: slide.image,
                        alt: slide.title
                    }))}
                    aspectRatio="21/9"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    codePreview={slides.map((slide, index) => (
                        <div key={index} className={styles.slideContent}>
                            <Badge
                                title={slide.badge}
                                variant="brand"
                                className={styles.badge}
                            />
                            <Heading
                                variant="heading-strong-xl"
                                onSolid="neutral-strong">
                                {slide.title}
                            </Heading>
                            <Text
                                variant="heading-default-l"
                                onSolid="neutral-medium"
                                maxWidth={48}>
                                {slide.description}
                            </Text>
                            <div className={styles.actions}>
                                {slide.primaryAction && (
                                    <Button
                                        variant="primary"
                                        size="l"
                                        label={slide.primaryAction.label}
                                        href={slide.primaryAction.href}
                                    />
                                )}
                                {slide.secondaryAction && (
                                    <Button
                                        variant="secondary"
                                        size="l"
                                        label={slide.secondaryAction.label}
                                        href={slide.secondaryAction.href}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                />
            </div>
        </section>
    );
};