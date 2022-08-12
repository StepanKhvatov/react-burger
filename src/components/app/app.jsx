import { useEffect, useState } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../constuctor-page/constructor-page";

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
        console.error("Fetch ingredients data error", error.message);
      });
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      {!!ingredients.length && <ConstructorPage ingredients={ingredients} />}
    </div>
  );
};

export default App;
