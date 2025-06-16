import React, { useEffect } from "react";

/**
 * Componente para Google reCAPTCHA v2
 * ⚠️ TEMPORALMENTE SUSPENDIDO ⚠️
 *
 * El reCAPTCHA ha sido suspendido debido a conflictos de renderizado.
 * Este componente simula la verificación automáticamente para no bloquear los formularios.
 *
 * TODO: Reactivar cuando se solucionen los problemas de integración
 */
export const ReCaptchaComponent = React.memo(
  ({ onVerify, onError: _onError, onExpired: _onExpired, className = "" }) => {
    useEffect(() => {
      // Simular verificación exitosa automáticamente
      // Esto evita que los formularios se bloqueen
      const timer = setTimeout(() => {
        if (onVerify) {
          onVerify(`recaptcha-suspended-${Date.now()}`);
        }
      }, 200);

      return () => clearTimeout(timer);
    }, [onVerify]);

    return (
      <div
        className={`recaptcha-container ${className}`.trim()}
        aria-label="reCAPTCHA suspendido temporalmente"
        style={{
          padding: "16px",
          border: "2px dashed #e2e8f0",
          borderRadius: "8px",
          textAlign: "center",
          color: "#718096",
          fontSize: "14px",
          backgroundColor: "#f7fafc",
          margin: "12px 0",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ marginBottom: "8px", fontSize: "20px" }}>🔒✅</div>
        <div style={{ fontWeight: "500", marginBottom: "4px" }}>
          Verificación de Seguridad
        </div>
        <div style={{ fontSize: "12px", opacity: 0.8 }}>
          Verificación automática activada
        </div>
        <div style={{ fontSize: "11px", opacity: 0.6, marginTop: "6px" }}>
          (reCAPTCHA temporalmente suspendido)
        </div>
      </div>
    );
  }
);

ReCaptchaComponent.displayName = "ReCaptchaComponent";

/* 
================================================================================
CÓDIGO ORIGINAL DE RECAPTCHA - COMENTADO PARA REFERENCIA FUTURA
================================================================================

import React, { useEffect, useRef, useMemo } from "react";
import { RECAPTCHA_CONFIG } from "../../services/recaptchaService";

export const ReCaptchaComponent = React.memo(
  ({ onVerify, onError, onExpired, className = "" }) => {
    const recaptchaRef = useRef(null);
    const widgetId = useRef(null);
    const isRendered = useRef(false);
    const componentId = useMemo(() => `recaptcha-${Date.now()}-${Math.random()}`, []);

    useEffect(() => {
      if (!RECAPTCHA_CONFIG.SITE_KEY || RECAPTCHA_CONFIG.SITE_KEY === 'undefined') {
        onError?.("Error: Configuración de reCAPTCHA no válida");
        return;
      }

      const cleanupWidget = () => {
        if (widgetId.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(widgetId.current);
          } catch {
            // Ignorar errores de reset
          }
        }
        if (recaptchaRef.current) {
          recaptchaRef.current.innerHTML = '';
        }
        widgetId.current = null;
        isRendered.current = false;
      };

      const loadRecaptcha = () => {
        if (window.grecaptcha && window.grecaptcha.render) {
          renderRecaptcha();
          return;
        }

        const existingScript = document.getElementById("recaptcha-script");
        if (existingScript) return;

        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
        script.id = "recaptcha-script";
        script.async = true;
        script.defer = true;

        window.onRecaptchaLoad = () => {
          renderRecaptcha();
        };

        script.onerror = () => {
          onError?.("No se pudo cargar el script de reCAPTCHA");
        };

        document.head.appendChild(script);
      };

      const renderRecaptcha = () => {
        if (!recaptchaRef.current || !window.grecaptcha || isRendered.current) return;

        if (recaptchaRef.current.children.length > 0) {
          cleanupWidget();
        }

        try {
          widgetId.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: RECAPTCHA_CONFIG.SITE_KEY,
            callback: (token) => {
              onVerify?.(token);
            },
            "expired-callback": () => {
              onExpired?.();
            },
            "error-callback": () => {
              onError?.("Error en la verificación de reCAPTCHA");
            },
            theme: "light",
            size: "normal",
          });
          isRendered.current = true;
        } catch (error) {
          if (error.message.includes('already been rendered')) {
            cleanupWidget();
            setTimeout(() => {
              if (recaptchaRef.current && !isRendered.current) {
                try {
                  widgetId.current = window.grecaptcha.render(recaptchaRef.current, {
                    sitekey: RECAPTCHA_CONFIG.SITE_KEY,
                    callback: onVerify,
                    "expired-callback": onExpired,
                    "error-callback": () => onError?.("Error en la verificación de reCAPTCHA"),
                    theme: "light",
                    size: "normal",
                  });
                  isRendered.current = true;
                } catch (retryError) {
                  onError?.(`Error al inicializar reCAPTCHA: ${retryError.message}`);
                }
              }
            }, 100);
          } else {
            onError?.(`Error al inicializar reCAPTCHA: ${error.message}`);
          }
        }
      };

      loadRecaptcha();

      return () => {
        cleanupWidget();
      };
    }, [onVerify, onError, onExpired]);

    return (
      <div
        ref={recaptchaRef}
        id={componentId}
        className={`recaptcha-container ${className}`.trim()}
        aria-label="reCAPTCHA"
      />
    );
  }
);

================================================================================
FIN DEL CÓDIGO COMENTADO
================================================================================
*/
