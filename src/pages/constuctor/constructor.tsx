import { FC } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import constructorPageStyles from "./constructor.module.css";

const ConstructorPage: FC = () => {
  return (
    <section className="container pt-10 pb-10 pr-5 pl-5">
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <main className={constructorPageStyles["content-container"]}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </section>
  );
};

export default ConstructorPage;
