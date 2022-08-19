import PropTypes from "prop-types";
import infoColumnStyles from "./info-column.module.css";

const InfoColumn = ({ title, value }) => {
  return (
    <div className={infoColumnStyles.container}>
      <h5 className="text text_type_main-default text_color_inactive mb-2">
        {title}
      </h5>
      <p className="text text_type_digits-default text_color_inactive">
        {value}
      </p>
    </div>
  );
};

InfoColumn.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InfoColumn;
