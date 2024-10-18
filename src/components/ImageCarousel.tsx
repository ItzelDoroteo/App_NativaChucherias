import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node_modules/swiper/swiper-bundle.min.css';
import '../../node_modules/swiper/swiper.min.css';
import './ImageCarousel.css';

interface ImageCarouselProps {
  images: string[]; // Array de URLs de imágenes
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1} // Ajusta según tu diseño
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }} // Cambia el tiempo de retraso aquí
      loop={true} // Permite el bucle infinito
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Imagen ${index + 1}`} className="carousel-image" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
