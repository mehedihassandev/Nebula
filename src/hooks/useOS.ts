import { useState, useEffect } from 'react';

export const useOS = () => {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const platform = navigator.platform.toUpperCase();
      const userAgent = navigator.userAgent.toUpperCase();
      setIsMac(platform.indexOf('MAC') >= 0 || userAgent.indexOf('MAC') >= 0);
    }
  }, []);

  const getShortcut = (macKey: string, winKey: string) => {
    return isMac ? macKey : winKey;
  };

  return { isMac, getShortcut };
};
