import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ClientsSection } from './ClientsSection';
import { clientsData } from '../../data/clientsData';

// Mock de los datos de clientes
vi.mock('../../data/clientsData', () => ({
  clientsData: [
    { id: 1, name: 'Client 1', industry: 'Tech', logo: 'test1.png', testimonial: 'Great service!' },
    {
      id: 2,
      name: 'Client 2',
      industry: 'Education',
      logo: 'test2.png',
      testimonial: 'Excellent!',
    },
    { id: 3, name: 'Client 3', industry: 'Tech', logo: 'test3.png', testimonial: 'Amazing!' },
  ],
}));

describe('ClientsSection', () => {
  it('renders all clients initially', () => {
    render(<ClientsSection />);
    expect(screen.getAllByTestId('client-card')).toHaveLength(3);
  });

  it('filters clients by industry correctly', () => {
    render(<ClientsSection />);

    // Seleccionar industria Tech
    fireEvent.click(screen.getByRole('button', { name: 'Tech' }));
    expect(screen.getAllByTestId('client-card')).toHaveLength(2);

    // Seleccionar industria Education
    fireEvent.click(screen.getByRole('button', { name: 'Education' }));
    expect(screen.getAllByTestId('client-card')).toHaveLength(1);
  });

  it('shows "no results" message when no clients match filter', () => {
    render(<ClientsSection />);

    // Seleccionar una industria que no existe
    fireEvent.click(screen.getByRole('button', { name: 'Healthcare' }));
    expect(screen.getByText(/no se encontraron clientes/i)).toBeInTheDocument();
  });

  it('displays client testimonials', () => {
    render(<ClientsSection />);
    expect(screen.getByText('Great service!')).toBeInTheDocument();
    expect(screen.getByText('Excellent!')).toBeInTheDocument();
  });
});
