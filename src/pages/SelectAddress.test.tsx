import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SelectAddress from './SelectAddress';
import { CartProvider } from '../contexts/CartContext';
import { AuthProvider } from '../contexts/AuthContext';
import axios from 'axios';
import { vi } from 'vitest';

// Mocking axios
vi.mock('axios');

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          {ui}
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('SelectAddress Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('debería renderizar correctamente', async () => {
    // Mocking la respuesta de la API
    (axios.get as vi.Mock).mockResolvedValueOnce({
      data: [{ SucursalId: 1, Nombre: 'Sucursal 1', Calle: 'Calle 1', Telefono: '123456789', Horario: '9am - 5pm' }],
    }).mockResolvedValueOnce({
      data: [{ DomicilioId: 1, Nombre: 'Domicilio 1', Calle: 'Calle 1', Telefono: '987654321', Referencias: 'Referencia 1', CP: '12345' }],
    });

    const { getByText } = renderWithProviders(<SelectAddress />);

    await waitFor(() => {
      expect(getByText('Elige la forma de entrega')).toBeInTheDocument();
      expect(getByText('Sucursal 1')).toBeInTheDocument();
      expect(getByText('Domicilio 1')).toBeInTheDocument();
    });
  });

  it('debería seleccionar un domicilio y mostrar el costo de envío', async () => {
    // Mocking la respuesta de la API
    (axios.get as vi.Mock).mockResolvedValueOnce({
      data: [{ DomicilioId: 1, Nombre: 'Domicilio 1', Calle: 'Calle 1', Telefono: '987654321', Referencias: 'Referencia 1', CP: '12345' }],
    }).mockResolvedValueOnce({
      data: [{ envio: '10.00' }], // Mock del costo de envío
    });

    const { getByText, getByRole } = renderWithProviders(<SelectAddress />);

    await waitFor(() => {
      fireEvent.click(getByText('Enviar a domicilio'));
    });

    await waitFor(() => {
      fireEvent.click(getByRole('radio', { name: 'Domicilio 1' }));
    });

    await waitFor(() => {
      expect(getByText('Envío')).toBeInTheDocument();
      expect(getByText('$ 10.00')).toBeInTheDocument();
    });
  });

  it('debería seleccionar una sucursal y establecer el costo de envío a 0', async () => {
    // Mocking la respuesta de la API
    (axios.get as vi.Mock).mockResolvedValueOnce({
      data: [{ SucursalId: 1, Nombre: 'Sucursal 1', Calle: 'Calle 1', Telefono: '123456789', Horario: '9am - 5pm' }],
    });

    const { getByText, getByRole } = renderWithProviders(<SelectAddress />);

    await waitFor(() => {
      fireEvent.click(getByText('Recoger en una sucursal'));
    });

    await waitFor(() => {
      fireEvent.click(getByRole('radio', { name: 'Sucursal 1' }));
    });

    await waitFor(() => {
      expect(getByText('Envío')).toBeInTheDocument();
      expect(getByText('No aplica')).toBeInTheDocument();
    });
  });

  it('debería mostrar un mensaje de error si no se selecciona una dirección', async () => {
    const { getByText } = renderWithProviders(<SelectAddress />);

    await waitFor(() => {
      fireEvent.click(getByText('Proceder al Pago'));
    });

    await waitFor(() => {
      expect(getByText('Por favor, seleccione una dirección antes de proceder al pago.')).toBeInTheDocument();
    });
  });
});