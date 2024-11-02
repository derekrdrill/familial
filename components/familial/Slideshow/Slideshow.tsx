import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { useRouter } from 'next/router';

import Carousel from '../../common/Carousel/Carousel';
import { Photos } from '../../../types';

type SlideshowProps = {
  isFullSlideShow?: boolean;
  slideshowPhotos: Photos[];
};

const Slideshow = ({ slideshowPhotos, isFullSlideShow }: SlideshowProps) => {
  const router = useRouter();

  return (
    <SlideshowColDiv onClick={() => router.push('/photos/slideshow')} tw='cursor-pointer'>
      <Carousel
        carouselContent={slideshowPhotos.map(photo => ({
          id: photo._id,
          component: (
            <div tw='flex justify-center min-w-full'>
              <SlideshowImage
                alt='slideshow'
                height={0}
                sizes='100vw'
                src={photo.url}
                style={{
                  overflowClipMargin: 'unset',
                }}
                width={0}
                $isFullSlideshow={!!isFullSlideShow}
              />
            </div>
          ),
        }))}
        hasButtons={false}
        hasDots={false}
        isSlideshow
        shouldAutoPlay
      />
    </SlideshowColDiv>
  );
};

export default Slideshow;

const SlideshowColDiv = styled.div([tw`col-span-5`, tw`mt-6`, tw`md:col-span-2`]);

const SlideshowImage = styled(Image)<{ $isFullSlideshow: boolean }>(({ $isFullSlideshow }) => [
  !$isFullSlideshow && tw`h-96`,
  $isFullSlideshow && tw`h-[600px]`,
  tw`object-contain`,
  tw`w-full`,
]);
