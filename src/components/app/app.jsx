import { useEffect, useState } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../constuctor-page/constructor-page";
import { IngredientsContext } from "../../services/ingredientsContext";
import { OrdersContext } from "../../services/ordersContext";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const ordersState = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          return setIngredients(res.data);
        }

        return res;
      })
      .catch((error) => {
        console.error(
          "Ошибка при получении данных ингредиентов:",
          error?.message || error
        );
      });
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <OrdersContext.Provider value={ordersState}>
        <IngredientsContext.Provider value={ingredients}>
          <ConstructorPage />
        </IngredientsContext.Provider>
      </OrdersContext.Provider>
    </div>
  );
};

export default App;
