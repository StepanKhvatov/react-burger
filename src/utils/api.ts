export const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((error) => Promise.reject(error));
};

export const setCookie = (
  name: string,
  value: string,
  props: { [key: string]: any } & { expires?: number | Date | string } = {}
) => {
  props = props || {};

  let exp = props.expires;

  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
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

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

type TFetchApiProps<TSuccessResponse, TErrorResponse> = {
  method: "GET" | "POST" | "PATCH" | "PUT";
  endpoint: string;
  body?: object;
  withAuth?: boolean;
  onSuccess?: (response: TSuccessResponse) => void;
  onError?: (error: TErrorResponse) => void;
};

const combineHeaders = (withAuth: boolean) => {
  const initialHeaders: { "Content-type": string; Authorization?: string } = {
    "Content-type": "application/json",
  };

  if (withAuth) {
    const token = localStorage.getItem("token") || "";

    initialHeaders.Authorization = token;
  }

  return initialHeaders;
};

export const fetchApi = async <TSuccessResponse, TErrorResponse = {}>({
  method,
  endpoint,
  body,
  withAuth,
  onSuccess,
  onError,
}: TFetchApiProps<TSuccessResponse, TErrorResponse>) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/${endpoint}`, {
    method: method,
    headers: combineHeaders(Boolean(withAuth)),
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
