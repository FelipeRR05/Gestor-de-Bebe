import { AppBar } from "../components";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <AppBar title={t("dashboard")} />
    </>
  );
};

export default Dashboard;
