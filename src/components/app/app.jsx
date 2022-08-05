import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../constuctor-page/constructor-page";

const App = () => {
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <ConstructorPage />
    </div>
  );
};

export default App;
