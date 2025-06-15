import React from "react";

/**
 * Hook personalizado para manejar el estado de reCAPTCHA
 * Simplifica la integración en formularios
 */
export const useRecaptcha = () => {
  const [recaptchaToken, setRecaptchaToken] = React.useState(null);
  const [recaptchaError, setRecaptchaError] = React.useState(null);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = React.useState(false);

  const handleRecaptchaVerify = (token) => {
    setRecaptchaToken(token);
    setIsRecaptchaVerified(!!token);
    setRecaptchaError(null);
  };

  const handleRecaptchaExpire = () => {
    setRecaptchaToken(null);
    setIsRecaptchaVerified(false);
    setRecaptchaError(
      "La verificación de reCAPTCHA ha expirado. Por favor, verifica nuevamente."
    );
  };

  const handleRecaptchaError = (error) => {
    setRecaptchaToken(null);
    setIsRecaptchaVerified(false);
    setRecaptchaError(error);
  };

  const resetRecaptcha = () => {
    setRecaptchaToken(null);
    setIsRecaptchaVerified(false);
    setRecaptchaError(null);
  };

  return {
    recaptchaToken,
    recaptchaError,
    isRecaptchaVerified,
    handleRecaptchaVerify,
    handleRecaptchaExpire,
    handleRecaptchaError,
    resetRecaptcha,
  };
};
