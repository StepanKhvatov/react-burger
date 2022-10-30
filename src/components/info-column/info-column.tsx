import { FC } from "react";
import infoColumnStyles from "./info-column.module.css";

type TInfoColumnProps = {
  title?: string;
  value?: string | number;
  dataTestId?: string;
};

const InfoColumn: FC<TInfoColumnProps> = ({ title, value, dataTestId }) => {
  return (
    <div className={infoColumnStyles.container} data-testid={dataTestId}>
      {title && (
        <h5 className="text text_type_main-default text_color_inactive mb-2">
          {title}
        </h5>
      )}
      {value && (
        <p className="text text_type_digits-default text_color_inactive">
          {value}
        </p>
      )}
    </div>
  );
};

export default InfoColumn;
