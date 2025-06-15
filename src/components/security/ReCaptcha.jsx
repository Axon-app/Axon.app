import React, { useCallback, useEffect, useRef } from "react";
import { RECAPTCHA_CONFIG } from "../../services/recaptchaService";

/**
 * Componente para Google reCAPTCHA v2
 * Renderiza el widget visible de verificación
 */
export const ReCaptchaComponent = React.memo(
  ({ onVerify, onError, onExpired, className = "" }) => {
    const recaptchaRef = useRef(null);
    const widgetId = useRef(null);
    const [loadAttempts, setLoadAttempts] = React.useState(0);
    const maxAttempts = 3;

    // Verificar la configuración de reCAPTCHA
    useEffect(() => {
      if (!RECAPTCHA_CONFIG.SITE_KEY) {
        onError?.("Error: Falta la clave del sitio de reCAPTCHA (SITE_KEY)");
        return;
      }
    }, [onError]);

    // Verificar si grecaptcha está disponible
    const checkRecaptchaLoaded = useCallback(() => {
      return (
        typeof window !== "undefined" &&
        window.grecaptcha &&
        window.grecaptcha.render &&
        typeof window.grecaptcha.render === "function"
      );
    }, []); // Renderizar el widget de reCAPTCHA v2
    const renderRecaptcha = useCallback(() => {
      if (!RECAPTCHA_CONFIG.SITE_KEY) {
        onError?.("Error: Falta la clave del sitio de reCAPTCHA (SITE_KEY)");
        return;
      }

      if (!checkRecaptchaLoaded()) {
        if (loadAttempts < maxAttempts) {
          setTimeout(() => {
            setLoadAttempts((prev) => prev + 1);
          }, 1000);
        } else {
          onError?.("No se pudo cargar reCAPTCHA después de varios intentos");
        }
        return;
      }

      if (!recaptchaRef.current || recaptchaRef.current.hasChildNodes()) {
        return;
      }

      try {
        widgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_CONFIG.SITE_KEY,
          callback: (token) => {
            if (token) {
              onVerify?.(token);
            } else {
              onError?.("No se recibió un token válido de reCAPTCHA");
            }
          },
          "expired-callback": () => {
            onExpired?.();
            if (widgetId.current !== null) {
              window.grecaptcha.reset(widgetId.current);
            }
          },
          "error-callback": (error) => {
            onError?.(error || "Error en la verificación de reCAPTCHA");
            if (widgetId.current !== null) {
              window.grecaptcha.reset(widgetId.current);
            }
          },
          theme: RECAPTCHA_CONFIG.THEME || "light",
          size: RECAPTCHA_CONFIG.SIZE || "normal",
          badge: "inline",
        });
      } catch (error) {
        onError?.(error.message || "Error al cargar reCAPTCHA");
      }
    }, [checkRecaptchaLoaded, onVerify, onError, onExpired, loadAttempts]);

    // Limpiar el widget al desmontar
    useEffect(() => {
      return () => {
        if (widgetId.current !== null) {
          try {
            window.grecaptcha?.reset(widgetId.current);
          } catch {
            // Silently handle cleanup errors
          }
        }
      };
    }, []);

    // Cargar el script de reCAPTCHA
    useEffect(() => {
      if (!RECAPTCHA_CONFIG.SITE_KEY) {
        onError?.("Error: Falta la clave del sitio de reCAPTCHA (SITE_KEY)");
        return;
      }

      const existingScript = document.getElementById("recaptcha-script");
      if (existingScript) {
        if (checkRecaptchaLoaded()) {
          renderRecaptcha();
        }
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=es`;
      script.async = true;
      script.defer = true;
      script.id = "recaptcha-script";

      const timeoutId = setTimeout(() => {
        if (!checkRecaptchaLoaded()) {
          onError?.("Error: Tiempo de carga de reCAPTCHA excedido");
        }
      }, 10000);

      script.onerror = () => {
        clearTimeout(timeoutId);
        onError?.("Error: No se pudo cargar el script de reCAPTCHA");
      };

      script.onload = () => {
        clearTimeout(timeoutId);
        setTimeout(() => {
          if (checkRecaptchaLoaded()) {
            renderRecaptcha();
          } else {
            onError?.("Error: reCAPTCHA no se inicializó correctamente");
          }
        }, 1000);
      };

      document.head.appendChild(script);

      return () => {
        clearTimeout(timeoutId);
        if (widgetId.current !== null) {
          try {
            window.grecaptcha?.reset(widgetId.current);
          } catch {
            // Silently handle cleanup errors
          }
        }
        const scriptToRemove = document.getElementById("recaptcha-script");
        if (scriptToRemove) {
          document.head.removeChild(scriptToRemove);
        }
      };
    }, [checkRecaptchaLoaded, renderRecaptcha, onError]);

    return RECAPTCHA_CONFIG.SITE_KEY ? (
      <div
        ref={recaptchaRef}
        className={`g-recaptcha ${className}`.trim()}
        data-sitekey={RECAPTCHA_CONFIG.SITE_KEY}
        data-theme={RECAPTCHA_CONFIG.THEME || "light"}
        data-size={RECAPTCHA_CONFIG.SIZE || "normal"}
        aria-label="reCAPTCHA"
      />
    ) : null;
  }
);

ReCaptchaComponent.displayName = "ReCaptchaComponent";
