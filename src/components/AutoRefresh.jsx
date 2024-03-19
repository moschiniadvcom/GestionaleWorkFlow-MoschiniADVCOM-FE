import React from 'react';

function AutoRefresh() {
  React.useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  return null;
}

export default AutoRefresh;