import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UnifiedContactForm } from './UnifiedContactForm';

// Mock de i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str) => str,
    i18n: { changeLanguage: vi.fn() }
  })
}));

// Mock del módulo de validación
vi.mock('../../utils/validators', () => ({
  SecurityValidators: {
    sanitizeInput: vi.fn(input => input),
    validateEmail: vi.fn(() => true),
    validatePhone: vi.fn(() => true),
    validateName: vi.fn(() => true),
    validateCity: vi.fn(() => true),
    detectSQLInjection: vi.fn(() => false),
    validateLength: vi.fn(() => true)
  }
}));

describe('UnifiedContactForm', () => {
  /** @type {import('./UnifiedContactForm').UnifiedFormProps} */
  const defaultProps = {
    onSubmit: vi.fn(),
    formType: /** @type {'contact'} */ ('contact')
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza correctamente', () => {
    render(<UnifiedContactForm {...defaultProps} />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('renders all required fields', () => {
    render(<UnifiedContactForm {...defaultProps} />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(<UnifiedContactForm {...defaultProps} />);

    await userEvent.type(screen.getByLabelText(/nombre/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/mensaje/i), 'Test message');

    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      });
    });
  });

  it('shows error messages for invalid data', async () => {
    // Mock del validador de email para que falle
    const mockValidateEmail = vi.spyOn(require('../../utils/validators').SecurityValidators, 'validateEmail');
    mockValidateEmail.mockReturnValueOnce(false);

    render(<UnifiedContactForm {...defaultProps} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/email.+inválido/i)).toBeInTheDocument();
    });
  });
});
