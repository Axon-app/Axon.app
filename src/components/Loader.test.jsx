// Loader.test.jsx
// eslint-env jest
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom'; // Asegura los matchers personalizados
import { render, screen } from '@testing-library/react';
import '../i18n';
import Loader from './Loader';

describe('Loader', () => {
  it('muestra el texto de carga en español por defecto', () => {
    render(<Loader />);
    expect(screen.getByText('Cargando aplicación...')).toBeInTheDocument();
  });
});
