import { useEffect, useState } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../constuctor-page/constructor-page";
import { IngredientsContext } from "../../services/ingredientsContext";

const App = () => {
  const [ingredients, setIngredients] = useState([]);

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
      {!!ingredients.length && (
        <IngredientsContext.Provider value={ingredients}>
          <ConstructorPage />
        </IngredientsContext.Provider>
      )}
    </div>
  );
};

export default App;
