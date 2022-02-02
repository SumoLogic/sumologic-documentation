import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useRef } from 'react';

export interface ImageSliderProps {
  path: string;
}

export default function ImageSlider({ path }: ImageSliderProps) {
  // Import images from the infographics folder
  function importImages(r) {
    return r.keys().map((x) => x.replace('.', ''));
  }

  const allImages = importImages(
    require.context('/img/', true, /\.(png|jpe?g|svg|mp4)$/),
  );
  const requestedImages = allImages.filter((word) => word.startsWith(path));

  // Get file extension
  function getFileExtension(filename) {
    return filename.split('.').pop();
  }

  // Create an array of objects with the image paths
  function createImageArray() {
    const images = [];
    for (let i = 0; i < requestedImages.length; i++) {
      const image = useBaseUrl('/img' + requestedImages[i]);
      if (getFileExtension(requestedImages[i]) === 'mp4') {
        images.push({
          original: image,
          thumbnail: useBaseUrl('/img/infographics/video-placeholder.png'),
          renderItem: () => (
            <video
              controls
              autoPlay={true}
              muted
              className='image-gallery-video'
            >
              <source src={image} type='video/mp4' />
            </video>
          ),
        });
      } else {
        images.push({
          original: image,
          thumbnail: image,
          thumbnailHeight: 48,
        });
      }
    }
    return images;
  }
  const carousel = useRef(null);
  const images = createImageArray();

  // Create the image gallery
  return (
    <ImageGallery
      onClick={() => carousel?.current?.fullScreen()}
      ref={carousel}
      items={images}
      showPlayButton={false}
      lazyLoad={true}
    />
  );
}
