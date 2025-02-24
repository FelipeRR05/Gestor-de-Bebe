import CribIcon from "@mui/icons-material/Crib";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SpaIcon from "@mui/icons-material/Spa";
import { useTranslation } from "react-i18next";

const useActions = () => {
  const { t } = useTranslation();

  return [
    {
      title: t("sleep"),
      actionType: 1,
      Icon: CribIcon,
      color: "#4b10a9",
    },
    {
      title: t("eat"),
      actionType: 2,
      Icon: RestaurantMenuIcon,
      color: "#47c869",
    },
    {
      title: t("diaper"),
      actionType: 3,
      Icon: SpaIcon,
      color: "#f4cc1d",
    },
  ];
};

export { useActions };
