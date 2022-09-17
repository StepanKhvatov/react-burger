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

// headers: {
//   'Content-Type': 'application/json',
//         // Отправляем токен и схему авторизации в заголовке при запросе данных
//   Authorization: 'Bearer ' + getCookie('token')
// },

export const setCookie = (name, value, props) => {
  props = props || {};

  let exp = props.expires;

  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = name + "=" + value;

  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];

    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
};

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};
