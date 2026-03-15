import { useRegisterSW } from 'virtual:pwa-register/react';
import { useLanguage } from '../i18n/LanguageContext';

export function ReloadPrompt() {
  const { t } = useLanguage();
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {offlineReady ? t.offlineReady : t.updateAvailable}
          </p>
        </div>
        <div className="flex gap-2">
          {needRefresh && (
            <button
              type="button"
              onClick={() => updateServiceWorker(true)}
              className="px-3 py-1 text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {t.reload}
            </button>
          )}
          <button
            type="button"
            onClick={close}
            className="px-3 py-1 text-xs font-medium rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
