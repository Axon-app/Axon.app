import React from "react";

// HOC para manejar el loading de componentes lazy
export const withSuspense = (Component, fallback = null) => {
  return React.forwardRef((props, ref) => (
    <React.Suspense
      fallback={
        fallback || (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )
      }
    >
      <Component {...props} ref={ref} />
    </React.Suspense>
  ));
};
