import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { EmblaCarouselType as CarouselType } from 'embla-carousel';

import GlobalContext from '../../../../context/GlobalContext';

type CarouselDotsProps = { carouselApi?: CarouselType };

const CarouselDots = ({ carouselApi }: CarouselDotsProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const [carouselDots, setCarouselDots] = React.useState<number[]>([]);
  const [carouselDotSelected, setCarouselDotSelected] =
    React.useState<number>(0);

  const handleDotButtonClick = React.useCallback(
    (index: number) => {
      if (!carouselApi) return;
      carouselApi.scrollTo(index);
    },
    [carouselApi],
  );

  const handleInit = React.useCallback((carouselApi: CarouselType) => {
    setCarouselDots(carouselApi.scrollSnapList());
  }, []);

  const handleSelect = React.useCallback((carouselApi: CarouselType) => {
    setCarouselDotSelected(carouselApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!carouselApi) return;

    handleInit(carouselApi);
    handleSelect(carouselApi);

    carouselApi
      .on('reInit', handleInit)
      .on('reInit', handleSelect)
      .on('select', handleSelect);
  }, [carouselApi, handleInit, handleSelect]);

  return (
    <div>
      {carouselDots.map((_, carouselDot) => (
        <CarouselDotButton
          onClick={() => handleDotButtonClick(carouselDot)}
          $isDarkMode={isDarkMode}
          $isCarouselDotSelected={carouselDotSelected === carouselDot}
        />
      ))}
    </div>
  );
};

export default CarouselDots;

const CarouselDotButton = styled.button<{
  $isCarouselDotSelected?: boolean;
  $isDarkMode?: boolean;
}>(({ $isDarkMode, $isCarouselDotSelected = false }) => [
  !$isCarouselDotSelected && !$isDarkMode && tw`bg-gray-D9D9D9`,
  !$isCarouselDotSelected && $isDarkMode && tw`bg-gray-3D3D3D`,
  $isCarouselDotSelected && !$isDarkMode && tw`bg-gray-4E4E4E`,
  $isCarouselDotSelected && $isDarkMode && tw`bg-gray-D9D9D9`,
  tw`h-2`,
  tw`mx-2`,
  tw`rounded-full`,
  tw`w-2`,
]);
