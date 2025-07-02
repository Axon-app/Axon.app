// Loader.jsx
// Loader internacionalizado para fallback de Suspense
import { useTranslation } from 'react-i18next';

const Loader = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center text-xl">{t('loading')}</div>
  );
};

export default Loader;
