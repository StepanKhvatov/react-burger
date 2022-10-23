import type { TOrder } from "../types";

export const localaizedStatuses: {
  [key in TOrder["status"]]: string;
} = {
  created: "Создан",
  pending: "Готовится",
  done: "Выполнен",
};
