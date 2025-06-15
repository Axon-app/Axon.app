import React from "react";

export const EmailClientSelector = React.memo(
  ({ emailData, onClose, isOpen }) => {
    // URLs para diferentes clientes de correo
    const getGmailUrl = () => {
      const params = new URLSearchParams({
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
      });
      return `https://mail.google.com/mail/?view=cm&fs=1&${params.toString()}`;
    };

    const getOutlookUrl = () => {
      const params = new URLSearchParams({
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
      });
      return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
    };

    const getYahooUrl = () => {
      const params = new URLSearchParams({
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
      });
      return `https://compose.mail.yahoo.com/?${params.toString()}`;
    };

    const getMailtoUrl = () => {
      return `mailto:${emailData.to}?subject=${encodeURIComponent(
        emailData.subject
      )}&body=${encodeURIComponent(emailData.body)}`;
    };

    const handleClientSelection = (url, isExternal = false) => {
      if (isExternal) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = url;
      }
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-selector-title"
      >
        <div
          className="bg-slate-800 rounded-xl max-w-md w-full shadow-2xl border border-blue-500/30"
          onClick={(e) => e.stopPropagation()}
        >
          {" "}
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/logo1.png"
                alt="Axon.App"
                className="w-10 h-10 rounded-lg"
              />
              <h3
                id="email-selector-title"
                className="text-xl font-bold text-white"
              >
                Elige tu cliente de correo
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Selecciona dónde quieres redactar tu mensaje
            </p>
          </div>
          {/* Email preview */}
          <div className="p-4 bg-slate-900/50 border-b border-gray-700">
            <div className="text-xs text-gray-400 space-y-1">
              <p>
                <strong>Para:</strong> {emailData.to}
              </p>
              <p>
                <strong>Asunto:</strong> {emailData.subject}
              </p>
            </div>
          </div>
          {/* Client options */}
          <div className="p-6 space-y-3">
            {/* Gmail */}{" "}
            <button
              onClick={() => handleClientSelection(getGmailUrl(), true)}
              className="w-full flex items-center p-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    fill="#4285f4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34a853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#fbbc05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#ea4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Gmail</div>
                <div className="text-red-200 text-sm">
                  Abrir en nueva pestaña
                </div>
              </div>
            </button>
            {/* Outlook */}{" "}
            <button
              onClick={() => handleClientSelection(getOutlookUrl(), true)}
              className="w-full flex items-center p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    fill="#0078d4"
                    d="M7.462 0h9.076c3.052 0 5.524 2.472 5.524 5.524v12.952c0 3.052-2.472 5.524-5.524 5.524H7.462c-3.052 0-5.524-2.472-5.524-5.524V5.524C1.938 2.472 4.41 0 7.462 0z"
                  />
                  <path
                    fill="#fff"
                    d="M12 6.4c2.9 0 5.2 2.3 5.2 5.2s-2.3 5.2-5.2 5.2-5.2-2.3-5.2-5.2S9.1 6.4 12 6.4z"
                  />
                  <path
                    fill="#0078d4"
                    d="M12 8.5c1.7 0 3.1 1.4 3.1 3.1s-1.4 3.1-3.1 3.1-3.1-1.4-3.1-3.1S10.3 8.5 12 8.5z"
                  />
                  <path
                    fill="#fff"
                    d="M12 9.5c1.1 0 2.1.9 2.1 2.1s-.9 2.1-2.1 2.1-2.1-.9-2.1-2.1S10.9 9.5 12 9.5z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">
                  Outlook / Hotmail
                </div>
                <div className="text-blue-200 text-sm">
                  Abrir en nueva pestaña
                </div>
              </div>
            </button>
            {/* Yahoo */}{" "}
            <button
              onClick={() => handleClientSelection(getYahooUrl(), true)}
              className="w-full flex items-center p-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    fill="#6001d2"
                    d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"
                  />
                  <path
                    fill="#fff"
                    d="M7.2 6.4l3.1 4.5v4.7h1.4v-4.7l3.1-4.5H13.6l-1.6 2.3-1.6-2.3H7.2z"
                  />
                  <path
                    fill="#fff"
                    d="M16.8 17.6h1.4v-1.4h-1.4v1.4zm0-2.8h1.4V9.2h-1.4v5.6z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Yahoo Mail</div>
                <div className="text-purple-200 text-sm">
                  Abrir en nueva pestaña
                </div>
              </div>
            </button>
            {/* Default email client */}
            <button
              onClick={() => handleClientSelection(getMailtoUrl(), false)}
              className="w-full flex items-center p-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">
                  Cliente predeterminado
                </div>
                <div className="text-gray-300 text-sm">
                  Aplicación de correo del sistema
                </div>
              </div>
            </button>
          </div>
          {/* Footer */}
          <div className="p-4 border-t border-gray-700 text-center">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }
);

EmailClientSelector.displayName = "EmailClientSelector";
