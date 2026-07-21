import { useState, useEffect } from 'react';

interface IpCheckResult {
  loading: boolean;
  blocked: boolean;
}

export function useIpCheck(): IpCheckResult {
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch('/api/check', { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        setBlocked(data.blocked === true);
      })
      .catch(() => {
        // Fail open — if server unreachable, allow access
        setBlocked(false);
      })
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  return { loading, blocked };
}
