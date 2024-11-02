import React from 'react';
import Slideshow from '../../Slideshow/Slideshow';
import { Photos } from '../../../../types';

type PhotosSlideshowProps = {
  photoSlideshowPhotos: Photos[];
};

const PhotosSlideshow = ({ photoSlideshowPhotos }: PhotosSlideshowProps) => {
  return <Slideshow isFullSlideShow slideshowPhotos={photoSlideshowPhotos} />;
};

export default PhotosSlideshow;
