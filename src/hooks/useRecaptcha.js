import React from "react";

/**
 * Hook personalizado para manejar reCAPTCHA v2
 * ⚠️ TEMPORALMENTE SUSPENDIDO ⚠️
 *
 * Este hook simula el comportamiento de reCAPTCHA sin realizar verificaciones reales.
 * Los formularios funcionarán normalmente sin bloqueos.
 *
 * TODO: Reactivar cuando se solucionen los problemas de integración
 */
export const useRecaptcha = () => {
  const [recaptchaToken, setRecaptchaToken] = React.useState("suspended-token");
  const [recaptchaError, setRecaptchaError] = React.useState(null);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = React.useState(true); // Siempre verificado

  const handleRecaptchaVerify = (token) => {
    setRecaptchaToken(token || "suspended-token");
    setIsRecaptchaVerified(true); // Siempre verificado cuando está suspendido
    setRecaptchaError(null);
  };
  const handleRecaptchaError = (_error) => {
    // No hacer nada en modo suspendido - mantener verificado
    // Ignorar error silenciosamente
  };

  const handleRecaptchaExpired = () => {
    // No hacer nada en modo suspendido - mantener verificado
    // reCAPTCHA expirado pero mantenemos verificado
  };
  const resetRecaptcha = () => {
    setRecaptchaToken("suspended-token");
    setIsRecaptchaVerified(true); // Mantener siempre verificado
    setRecaptchaError(null);
  };
  // Función para compatibilidad con reCAPTCHA v3 (también suspendida)
  const executeRecaptcha = async (_action) => {
    // Simular ejecución de reCAPTCHA v3
    return "suspended-v3-token";
  };

  return {
    recaptchaToken,
    recaptchaError,
    isRecaptchaVerified,
    setRecaptchaToken,
    setRecaptchaError,
    handleRecaptchaVerify,
    handleRecaptchaError,
    handleRecaptchaExpired,
    resetRecaptcha,
    executeRecaptcha, // Agregar función faltante
  };
};
