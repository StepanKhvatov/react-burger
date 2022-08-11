import doneImage from "../../images/done.png";
import orderDetailsStyles from "./order-details.module.css";

const OrderDetails = ({ orderId }) => {
  return (
    <div className={orderDetailsStyles.container}>
      <span className="text text_type_digits-large mb-8">{orderId}</span>
      <p className="text text_type_main-medium">идентификатор заказа</p>

      <img
        alt="done-icon"
        src={doneImage}
        className={`${orderDetailsStyles["image"]} mb-15 mt-15`}
      />
      <div className={orderDetailsStyles.container}>
        <p className="text text_type_main-default mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
