import {
  TOwnerOrder,
  TUser,
  TAuthSuccessResponse,
  TForgotPasswordSuccessResponse,
  TResetPasswordSuccessResponse,
  TFetchProfileSuccessResponse,
} from "../types";

export const mockOwnerOrder: TOwnerOrder = {
  ingredients: [
    {
      _id: "60d3b41abdacab0026a733cd",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
    },
    {
      _id: "60d3b41abdacab0026a733c7",
      name: "Флюоресцентная булка R2-D3",
      type: "bun",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      __v: 0,
    },
    {
      _id: "60d3b41abdacab0026a733c7",
      name: "Флюоресцентная булка R2-D3",
      type: "bun",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      __v: 0,
    },
  ],
  _id: "635d62859b518a001bb78f91",
  owner: {
    name: "Степан",
    email: "stepanhv@icloud.com",
  },
  status: "done",
  name: "Space флюоресцентный бургер",
  createdAt: "2022-10-29T17:27:33.947Z",
  updatedAt: "2022-10-29T17:27:34.375Z",
  number: 29106,
  price: 2056,
};

export const mockUser: TUser = {
  email: "test@mail.ru",
  name: "Test user",
};

export const mockAuthSuccessResponse: TAuthSuccessResponse = {
  success: true,
  user: mockUser,
  refreshToken: "Bearer tGzv3JOkF0XG5Qx2TlKWIA",
  accessToken: "Bearer tGzv3JOkF0XG5Qx2TlKWIA",
};

export const mockForgotPasswordSuccessResponse: TForgotPasswordSuccessResponse =
  {
    success: true,
    message: "Reset email sent",
  };

export const mockResetPasswordSuccessResponse: TResetPasswordSuccessResponse = {
  success: true,
  message: "Password successfully reset",
};

export const mockFetchProfileSuccessResponse: TFetchProfileSuccessResponse = {
  success: true,
  user: mockUser,
};
