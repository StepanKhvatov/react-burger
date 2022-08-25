import { useState } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../constuctor-page/constructor-page";
import { OrdersContext } from "../../services/ordersContext";

const App = () => {
  const ordersState = useState([]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <OrdersContext.Provider value={ordersState}>
        <ConstructorPage />
      </OrdersContext.Provider>
    </div>
  );
};

export default App;
