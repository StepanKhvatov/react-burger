import PropTypes from "prop-types";
import doneImage from "../../images/done.png";
import orderDetailsStyles from "./order-details.module.css";

const OrderDetails = ({ orderId }) => {
  return (
    <div className={`${orderDetailsStyles.container} pt-15 pb-15`}>
      <span className="text text_type_digits-large mb-8">{orderId}</span>
      <h4 className="text text_type_main-medium">идентификатор заказа</h4>
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

OrderDetails.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default OrderDetails;