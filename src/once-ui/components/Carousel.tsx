"use client";
import { Flex, RevealFx, Scroller, SmartImage } from "@/once-ui/components";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Image {
    src: string;
    alt: string;
}

interface SlideProps {
    image?: string;
    children?: React.ReactNode;
}

interface CarouselProps {
    slides?: SlideProps[];
    images?: Image[];
    indicator?: 'line' | 'thumbnail';
    aspectRatio?: string;
    sizes?: string;
}

export const Slide: React.FC<SlideProps> = ({ image, children }) => {
    return (
        <Flex direction="column" gap="4">
            {image && (
                <SmartImage
                    priority
                    radius="l"
                    alt="Slide image"
                    aspectRatio="16 / 9"
                    src={image}
                    style={{
                        border: '1px solid var(--neutral-alpha-weak)',
                    }}
                />
            )}
            {children && (
                <Flex direction="column">
                    {children}
                </Flex>
            )}
        </Flex>
    );
};

export const Carousel: React.FC<CarouselProps> = ({
    slides = [],
    images = [],
    indicator = 'line',
    aspectRatio = '16 / 9',
    sizes,
}) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    // Determine if we're using slides or images
    const items = slides.length > 0 ? slides : images.map(img => ({ image: img.src }));
    const totalItems = items.length;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransitioning(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handlePrevious = () => {
        if(totalItems > 1) {
            setIsTransitioning(false);
            const nextIndex = (activeIndex - 1 + totalItems) % totalItems;
            handleControlClick(nextIndex);
        }
    };

    const handleNext = () => {
        if(totalItems > 1) {
            setIsTransitioning(false);
            const nextIndex = (activeIndex + 1) % totalItems;
            handleControlClick(nextIndex);
        }
    };

    const handleControlClick = (index: number) => {
        if (index !== activeIndex) {
            setIsTransitioning(false);
            setTimeout(() => {
                setActiveIndex(index);
                setIsTransitioning(true);
            }, 500);
        }
    };

    if (totalItems === 0) {
        return null;
    }

    return (
        <Flex fillWidth gap="12" direction="column">
            <Flex position="relative">
                <RevealFx
                    style={{ width: '100%' }}
                    trigger={isTransitioning}
                    translateY="16"
                    speed="fast">
                    {slides.length > 0 ? (
                        <Slide {...slides[activeIndex]} />
                    ) : (
                        <SmartImage
                            sizes={sizes}
                            priority
                            tabIndex={0}
                            radius="l"
                            alt={images[activeIndex]?.alt}
                            aspectRatio={aspectRatio}
                            src={images[activeIndex]?.src}
                            style={{
                                border: '1px solid var(--neutral-alpha-weak)',
                            }}
                        />
                    )}
                </RevealFx>
                
                {totalItems > 1 && (
                    <>
                        <div 
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '8px',
                                transform: 'translateY(-50%)',
                                padding: '12px',
                                backgroundColor: 'var(--background)',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease',
                            }}
                            onClick={handlePrevious}>
                            <ChevronLeft size={24} />
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '8px',
                                transform: 'translateY(-50%)',
                                padding: '12px',
                                backgroundColor: 'var(--background)',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease',
                            }}
                            onClick={handleNext}>
                            <ChevronRight size={24} />  
                        </div>
                    </>
                )}
            </Flex>
            
            {totalItems > 1 && (
                <>
                    {indicator === 'line' ? (
                        <Flex
                            gap="4"
                            paddingX="s"
                            fillWidth
                            justifyContent="center">
                            {items.map((_, index) => (
                                <Flex
                                    key={index}
                                    onClick={() => handleControlClick(index)}
                                    style={{
                                        background:
                                            activeIndex === index
                                                ? 'var(--neutral-on-background-strong)'
                                                : 'var(--neutral-alpha-medium)',
                                        cursor: 'pointer',
                                        transition: 'background 0.3s ease',
                                    }}
                                    fillWidth
                                    height="2"></Flex>
                            ))}
                        </Flex>
                    ) : (
                        <Scroller fillWidth gap="4">
                            {items.map((item, index) => (
                                <Flex
                                    key={index}
                                    style={{
                                        border:
                                            activeIndex === index
                                                ? '2px solid var(--brand-solid-strong)'
                                                : 'none',
                                        cursor: 'pointer',
                                        borderRadius: 'var(--radius-m-nest-4)',
                                        transition: 'border 0.3s ease',
                                    }}
                                    padding="4"
                                    width="80"
                                    height="80">
                                    <SmartImage
                                        alt={images[index]?.alt || "Thumbnail"}
                                        aspectRatio="1 / 1"
                                        sizes="120px"
                                        src={slides.length > 0 ? item.image : images[index].src}
                                        onClick={() => handleControlClick(index)}
                                        style={{
                                            cursor: 'pointer',
                                            borderRadius: 'var(--radius-m)',
                                            transition: 'background 0.3s ease',
                                        }}/>
                                </Flex>
                            ))}
                        </Scroller>
                    )}
                </>
            )}
        </Flex>
    );
};

export default Carousel;