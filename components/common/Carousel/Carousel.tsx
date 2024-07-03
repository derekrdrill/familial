import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import useCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import CarouselButtons from './components/CarouselButtons';
import CarouselDots from './components/CarouselDots';

type CarouselRootProps = {
  carouselContent: {
    component: React.ReactNode;
    id: string;
  }[];
  carouselHeight?: number;
  hasButtons?: boolean;
  hasDots?: boolean;
  isSlideshow?: boolean;
  shouldAutoPlay?: boolean;
  shouldCarouselLoop?: boolean;
  shouldMouseWheelScroll?: boolean;
};

const Carousel = ({
  carouselHeight,
  carouselContent,
  hasButtons = true,
  hasDots = true,
  isSlideshow = false,
  shouldAutoPlay = false,
  shouldCarouselLoop = false,
  shouldMouseWheelScroll = true,
}: CarouselRootProps) => {
  const getAutoPlayPlugin = (shouldAutoPlay: boolean) => {
    if (shouldAutoPlay) return [Autoplay()];
    return [];
  };

  const getFadePlugin = (isSlideshow: boolean) => {
    if (isSlideshow) return [Fade()];
    return [];
  };

  const getWheelGesturesPlugin = (
    isSlideshow: boolean,
    shouldMouseWheelScroll: boolean,
  ) => {
    if (!isSlideshow && shouldMouseWheelScroll) return [WheelGesturesPlugin()];
    return [];
  };

  const [carouselRef, carouselApi] = useCarousel(
    { dragFree: true, loop: shouldCarouselLoop },
    [
      ...getAutoPlayPlugin(shouldAutoPlay),
      ...getFadePlugin(isSlideshow),
      ...getWheelGesturesPlugin(isSlideshow, shouldMouseWheelScroll),
    ],
  );

  return (
    <CarouselRoot $height={carouselHeight}>
      <div ref={carouselRef}>
        <CarouselContentContainer $height={carouselHeight}>
          {carouselContent.map(carouselContentItem => (
            <CarouselContentItemContainer key={carouselContentItem.id}>
              {carouselContentItem.component}
            </CarouselContentItemContainer>
          ))}
        </CarouselContentContainer>
        <CarouselActionsContainer $hasButtons={hasButtons} $hasDots={hasDots}>
          {hasButtons && <CarouselButtons carouselApi={carouselApi} />}
          {hasDots && <CarouselDots carouselApi={carouselApi} />}
        </CarouselActionsContainer>
      </div>
    </CarouselRoot>
  );
};

const CarouselActionsContainer = styled.div<{
  $hasButtons: boolean;
  $hasDots: boolean;
}>(({ $hasButtons, $hasDots }) => [
  !$hasButtons && !$hasDots && tw`hidden`,
  !$hasButtons && $hasDots && tw`justify-end`,
  $hasButtons && $hasDots && tw`justify-between`,
  ($hasButtons || $hasDots) && tw`flex`,
]);

const CarouselContentContainer = styled.div<{ $height?: number }>(
  ({ $height }) => [
    tw`col-span-1`,
    tw`flex`,
    tw`min-h-full`,
    tw`w-full`,
    $height && {
      height: $height,
    },
  ],
);

const CarouselContentItemContainer = styled.div<{}>(({}) => [
  tw`min-w-fit`,
  tw`mx-2`,
]);

const CarouselRoot = styled.section<{ $height?: number }>(({ $height }) => [
  tw`min-w-full`,
  tw`overflow-hidden`,
  $height && {
    height: $height + 40,
  },
]);

export default Carousel;
export { CarouselContentContainer, CarouselRoot };
