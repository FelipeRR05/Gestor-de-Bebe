import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Grid,
  Box,
  TextField,
  Typography,
} from "../components";
import { logout } from "../services/authentication";
import { useTranslation } from "react-i18next";

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: { value: "", error: false, helperText: "" },
    weight: { value: "", error: false, helperText: "" },
    height: { value: "", error: false, helperText: "" },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    } else {
      const browserLanguage = navigator.language.split("-")[0];
      i18n.changeLanguage(browserLanguage);
      localStorage.setItem("language", browserLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    const savedBabyData = localStorage.getItem("babyData");
    if (savedBabyData) {
      setData(JSON.parse(savedBabyData));
    }
  }, []);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const saveBabyData = () => {
    setLoading(true);
    localStorage.setItem("babyData", JSON.stringify(data));
    alert(t("form-saved"));
    setLoading(false);
  };

  const handleInputValue = (field: keyof typeof data, value: string) => {
    setData({
      ...data,
      [field]: { ...data[field], value },
    });
  };

  const verifyLanguage = (language: string) =>
    i18n.language === language ? "contained" : "outlined";

  return (
    <>
      <AppBar title={t("settings")} />
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "1em",
          padding: "1em",
        }}
      >
        <Grid item xs={12}>
          <Button
            onClick={() => changeLanguage("en")}
            variant={verifyLanguage("en")}
            sx={{ ...styles.button }}
          >
            {t("english")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => changeLanguage("es")}
            variant={verifyLanguage("es")}
            sx={{ ...styles.button }}
          >
            {t("spanish")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => changeLanguage("pt")}
            variant={verifyLanguage("pt")}
            sx={{ ...styles.button }}
          >
            {t("portugues")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="error"
            onClick={() => logout(navigate)}
            sx={{ ...styles.button }}
          >
            {t("logout")}
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Typography component="h5" variant="h5">
            {t("baby-data-title")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box component="form" onSubmit={(e) => e.preventDefault()} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label={t("name")}
              id="name"
              value={data.name.value}
              error={data.name.error}
              helperText={data.name.helperText}
              onChange={(e) => handleInputValue("name", e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="weight"
              label={t("weight")}
              id="weight"
              value={data.weight.value}
              error={data.weight.error}
              helperText={data.weight.helperText}
              onChange={(e) => handleInputValue("weight", e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="height"
              label={t("height")}
              id="height"
              value={data.height.value}
              error={data.height.error}
              helperText={data.height.helperText}
              onChange={(e) => handleInputValue("height", e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={saveBabyData}
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {t("save")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const styles = {
  button: {
    width: "100%",
  },
};

export default Settings;
