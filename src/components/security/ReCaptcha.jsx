import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_CONFIG } from "../../services/recaptchaService";

/**
 * Componente reutilizable para Google reCAPTCHA v2
 * Proporciona protección contra bots y spam en formularios
 */
export const ReCaptchaComponent = React.memo(
  ({
    onVerify,
    onExpire,
    onError,
    theme = RECAPTCHA_CONFIG.THEME,
    size = RECAPTCHA_CONFIG.SIZE,
  }) => {
    const recaptchaRef = React.useRef(null);

    // Manejar verificación exitosa
    const handleVerify = (token) => {
      if (onVerify) {
        onVerify(token);
      }
    };

    // Manejar expiración del token
    const handleExpire = () => {
      if (onExpire) {
        onExpire();
      }
    };

    // Manejar errores de carga
    const handleError = () => {
      if (onError) {
        onError("Error al cargar reCAPTCHA");
      }
    };

    return (
      <div className="recaptcha-container flex justify-center my-4">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_CONFIG.SITE_KEY}
          onChange={handleVerify}
          onExpired={handleExpire}
          onErrored={handleError}
          theme={theme}
          size={size}
          hl={RECAPTCHA_CONFIG.LANGUAGE}
        />
      </div>
    );
  }
);

ReCaptchaComponent.displayName = "ReCaptchaComponent";
