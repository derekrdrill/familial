import React from 'react';
import Slideshow from '../../Slideshow/Slideshow';

type PhotosSlideshowProps = { photoSlideshowPhotos: any };

const PhotosSlideshow = ({ photoSlideshowPhotos }: PhotosSlideshowProps) => {
  return <Slideshow isFullSlideShow slideshowPhotos={photoSlideshowPhotos} />;
};

export default PhotosSlideshow;
