// src/components/ProductCarousel.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCarousel from './ProductCarousel';

const mockProducts = [
  {
    productoId: 1,
    nombre: 'Producto 1',
    descripcion: 'Descripción del producto 1',
    precioFinal: 100,
    imagen: 'https://via.placeholder.com/150',
    ranking: 4,
  },
  {
    productoId: 2,
    nombre: 'Producto 2',
    descripcion: 'Descripción del producto 2',
    precioFinal: 200,
    imagen: 'https://via.placeholder.com/150',
    ranking: 5,
  },
];

describe('ProductCarousel Component', () => {
  it('should render products and handle click', () => {
    render(
      <MemoryRouter>
        <ProductCarousel products={mockProducts} />
      </MemoryRouter>
    );

    // Verificar que los nombres de los productos se renderizan
    expect(screen.getByText(/producto 1/i)).toBeInTheDocument();
    expect(screen.getByText(/producto 2/i)).toBeInTheDocument();

    // Verificar que los precios se renderizan
    const priceElements = screen.getAllByText(/precio:/i);
    expect(priceElements.length).toBe(2); 

    expect(screen.getByText(/\$100/i)).toBeInTheDocument();
    expect(screen.getByText(/\$200/i)).toBeInTheDocument();

    // Simular clic en el primer producto
    fireEvent.click(screen.getByText(/producto 1/i));

    // Verificar que se redirige a la ruta correcta
    expect(window.location.pathname).toBe('/product/1');
  });
});