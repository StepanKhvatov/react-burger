import { FC } from "react";
import infoColumnStyles from "./info-column.module.css";

type TInfoColumnProps = {
  title: string;
  value: string | number;
};

const InfoColumn: FC<TInfoColumnProps> = ({ title, value }) => {
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

export default InfoColumn;
