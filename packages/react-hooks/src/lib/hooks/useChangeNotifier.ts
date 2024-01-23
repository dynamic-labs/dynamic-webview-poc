import { ChangeNotifier } from 'client';
import { useEffect, useState } from 'react';

export const useChangeNotifier = <T extends ChangeNotifier>(notifier: T): T => {
  const [, setLastUpdateDate] = useState<number>(new Date().getTime());

  useEffect(() => {
    const listener = () => setLastUpdateDate(new Date().getTime());

    notifier.addListener(listener);

    return () => {
      notifier.removeListener(listener);
    };
  }, [notifier]);

  return notifier;
};
