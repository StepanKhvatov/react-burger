import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";

const App = () => {
  return (
    <div className={appStyles.app}>
      <AppHeader />
    </div>
  );
};

export default App;
