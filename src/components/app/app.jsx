import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../constuctor-page/constructor-page";
import { ingredients } from "../../utils/data";

const App = () => {
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <ConstructorPage ingredients={ingredients} />
    </div>
  );
};

export default App;
