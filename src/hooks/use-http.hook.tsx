import { useState } from "react";

const useHttp = (config: any, successCallback?: any, errorCallback?: any) => {
  const [error, setError] = useState(null);

  const sendRequest = () => {

    console.log('sendRequest() has been called')

    fetch(config.url, {
      ...config,
      method: config.method || 'GET',
      body: config.body ? JSON.stringify(config.body) : null,
    })
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data: any) => {
        setError(null);
        successCallback(data);
      })
      .catch((err) => {
        //console.log('in error blaco', err)
        setError(err);
        errorCallback(err);
      });
  };

  return { sendRequest, error };

};

export { useHttp }
