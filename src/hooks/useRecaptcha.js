import React from "react";

/**
 * Hook personalizado para manejar reCAPTCHA v2
 * Gestiona el estado y la verificación de tokens
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

  const handleRecaptchaError = (error) => {
    setRecaptchaToken(null);
    setIsRecaptchaVerified(false);
    setRecaptchaError(error);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setIsRecaptchaVerified(false);
    setRecaptchaError("reCAPTCHA expirado, por favor verifica nuevamente");
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
    setRecaptchaToken,
    setRecaptchaError,
    handleRecaptchaVerify,
    handleRecaptchaError,
    handleRecaptchaExpired,
    resetRecaptcha,
  };
};
