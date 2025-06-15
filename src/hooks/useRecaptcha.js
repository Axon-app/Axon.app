import React from "react";
import { RECAPTCHA_CONFIG } from "../services/recaptchaService";

/**
 * Hook personalizado para manejar reCAPTCHA v3
 * Gestiona el estado y la ejecución de verificaciones
 */
export const useRecaptcha = () => {
  const [recaptchaToken, setRecaptchaToken] = React.useState(null);
  const [recaptchaError, setRecaptchaError] = React.useState(null);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = React.useState(false);
  const [isExecuting, setIsExecuting] = React.useState(false);

  // Ejecutar reCAPTCHA v3
  const executeRecaptcha = React.useCallback(
    async (action = "submit_form") => {
      if (!window.grecaptcha || !window.grecaptcha.ready) {
        setRecaptchaError("reCAPTCHA no está disponible");
        return null;
      }

      if (isExecuting) {
        return null;
      }

      setIsExecuting(true);
      setRecaptchaError(null);

      try {
        const token = await new Promise((resolve, reject) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha
              .execute(RECAPTCHA_CONFIG.SITE_KEY, { action })
              .then(resolve)
              .catch(reject);
          });
        });

        if (token) {
          setRecaptchaToken(token);
          setIsRecaptchaVerified(true);
          setRecaptchaError(null);
          return token;
        }
      } catch {
        setRecaptchaError("Error al verificar reCAPTCHA");
        return null;
      } finally {
        setIsExecuting(false);
      }
    },
    [isExecuting]
  );

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

  const resetRecaptcha = () => {
    setRecaptchaToken(null);
    setIsRecaptchaVerified(false);
    setRecaptchaError(null);
    setIsExecuting(false);
  };

  return {
    recaptchaToken,
    recaptchaError,
    isRecaptchaVerified,
    isExecuting,
    executeRecaptcha,
    handleRecaptchaVerify,
    handleRecaptchaError,
    resetRecaptcha,
  };
};
