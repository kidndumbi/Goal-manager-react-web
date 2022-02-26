import { useState } from "react";

const useHttp = (config: any, successCallback?: any, errorCallback?: any) => {
  const [error, setError] = useState(null);

  const sendRequest = () => {

    fetch(config.url, {
      ...config,
      method: config.method || 'GET',
      body: config.body ? JSON.stringify(config.body) : null,
    })
      .then((response) => response.json())
      .then((data: any) => {
        setError(null);
        successCallback(data);
      })
      .catch((err) => {
        setError(err);
        errorCallback(err);
      });
  };

  return { sendRequest, error };

};

export { useHttp }
