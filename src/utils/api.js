export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};

export const fetchApi = async ({
  method,
  endpoint,
  body,
  onSuccess,
  onError,
}) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/${endpoint}`, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })
    .then(checkResponse)
    .then((res) => {
      if (res?.success && typeof onSuccess === "function") {
        return onSuccess(res);
      }

      return res;
    })
    .catch((error) => {
      console.error(
        `Ошибка при выполнении запроса к ${endpoint}`,
        error?.message || error
      );

      if (typeof onError === "function") {
        onError(error);
      }
    });
};
