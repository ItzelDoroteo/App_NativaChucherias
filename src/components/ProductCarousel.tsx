// src/components/ProductCarousel.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node_modules/swiper/swiper-bundle.min.css';
import '../../node_modules/swiper/swiper.min.css'

// import './ProductCarousel.css'; 

interface Product {
  productoId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={2} // Puedes ajustar cuántos productos mostrar por vista
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.productoId}>
          <div className="product-card">
            <img src={product.imagen} alt={product.nombre} className="product-image" />
            <h2>{product.nombre}</h2>
            <p>{`$${product.precio}`}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
