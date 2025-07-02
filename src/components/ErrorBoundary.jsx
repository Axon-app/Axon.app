// ErrorBoundary.jsx
// =====================================================
// Componente de React para manejo global de errores en la UI.
// Muestra un mensaje amigable y permite recuperación.
// Autor: Axon.App Team | Última revisión: 29/06/2025

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    this.errorContainerRef = React.createRef();
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    if (typeof this.props.onError === 'function') {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate() {
    if (this.state.hasError && this.errorContainerRef.current) {
      this.errorContainerRef.current.focus();
    }
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    const { errorTitle, errorMessage, reloadLabel } = this.props;
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-8"
          role="alertdialog"
          aria-modal="true"
          tabIndex={-1}
          ref={this.errorContainerRef}
        >
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            {errorTitle || '¡Algo salió mal!'}
          </h1>
          <p className="mb-2">
            {errorMessage || 'Ha ocurrido un error inesperado en la aplicación.'}
          </p>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={this.handleReload}
            autoFocus
          >
            {reloadLabel || 'Recargar página'}
          </button>
          <details
            className="mt-4 text-left w-full max-w-xl mx-auto bg-white p-4 rounded shadow"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            <summary className="cursor-pointer font-semibold">Detalles técnicos</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
