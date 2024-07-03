import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import { EmblaCarouselType as CarouselType } from 'embla-carousel';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';

import GlobalContext from '../../../../context/GlobalContext';

type CarouselButtonsProps = { carouselApi?: CarouselType };

const CarouselButtons = ({ carouselApi }: CarouselButtonsProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = React.useState(true);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = React.useState(true);

  const handleNextButtonClick = React.useCallback(() => {
    if (!carouselApi) return;
    carouselApi.scrollNext();
  }, [carouselApi]);

  const handlePrevButtonClick = React.useCallback(() => {
    if (!carouselApi) return;
    carouselApi.scrollPrev();
  }, [carouselApi]);

  const handleSelect = React.useCallback((carouselApi: CarouselType) => {
    setIsPrevBtnDisabled(!carouselApi.canScrollPrev());
    setIsNextBtnDisabled(!carouselApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!carouselApi) return;

    handleSelect(carouselApi);
    carouselApi.on('reInit', handleSelect).on('select', handleSelect);
  }, [carouselApi, handleSelect]);

  return (
    <div>
      <CarouselIconButton
        disabled={isPrevBtnDisabled}
        onClick={handlePrevButtonClick}
        $isDarkMode={isDarkMode}
      >
        <ArrowBackIos />
      </CarouselIconButton>
      <CarouselIconButton
        disabled={isNextBtnDisabled}
        onClick={handleNextButtonClick}
        $isDarkMode={isDarkMode}
      >
        <ArrowForwardIos />
      </CarouselIconButton>
    </div>
  );
};

const CarouselIconButton = styled(IconButton)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode = false }) => [
    !$isDarkMode && tw`text-gray-4E4E4E`,
    !$isDarkMode && tw`disabled:text-gray-D9D9D9`,
    $isDarkMode && tw`text-white`,
    $isDarkMode && tw`disabled:text-gray-4E4E4E`,
    tw`hover:bg-gray-4E4E4E`,
    tw`hover:bg-opacity-30`,
  ],
);

export default CarouselButtons;
