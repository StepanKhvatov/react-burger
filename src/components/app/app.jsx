import { useEffect, useState } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../constuctor-page/constructor-page";
import IngredientDetails from "../ingredient-details/ingredient-details";

const App = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/ingredients`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          return setIngredients(res.data);
        }

        return res;
      })
      .catch((error) => {
        console.log("Fetch data error", error.message);
      });
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      {!!ingredients?.length && (
        <IngredientDetails ingredient={ingredients[0]} />
      )}

      {!!ingredients.length && <ConstructorPage ingredients={ingredients} />}
    </div>
  );
};

export default App;
