export const checkResponse = (res) => {
  return res.ok
    ? res.json()
    : res.json().then((error) => Promise.reject(error));
};

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

export const fetchApi = async ({
  method,
  endpoint,
  body,
  withAuth,
  onSuccess,
  onError,
}) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/${endpoint}`, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Authorization: withAuth ? getCookie("token") : undefined,
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
