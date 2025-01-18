import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "../components";
import logo from "../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/authentication";
import { useState } from "react";
import { handleChange } from "../utils/core";
import { useAppContext } from "../Context";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { translate } = useAppContext();

  const [data, setData] = useState({
    email: { value: "", error: false, helperText: "" },
    password: { value: "", error: false, helperText: "" },
  });

  const verifyLogin = async () => {
    const response = await signIn(data.email.value, data.password.value);

    if (response.success) {
      navigate("/");
    } else {
      alert(response.error || "Erro ao realizar login");
    }
  };

  return (
    <Container
      className="app-background"
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 4,
        }}
      >
        <Avatar sx={{ width: 180, height: 180 }} src={logo} />
        <Typography component="h3" variant="h3">
          {translate("login")}
        </Typography>
        <Typography component="h5" variant="h5">
          {translate("welcome")}
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={translate("email")}
            name="email"
            autoComplete="email"
            autoFocus
            value={data.email.value}
            error={data.email.error}
            helperText={data.email.helperText}
            onChange={(event) =>
              handleChange(data, setData, event.target.value, "email")
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={translate("password")}
            type="password"
            id="password"
            autoComplete="current-password"
            value={data.password.value}
            error={data.password.error}
            helperText={data.password.helperText}
            onChange={(event) =>
              handleChange(data, setData, event.target.value, "password")
            }
          />
          <Box
            component="span"
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link to="/signup">{translate("sign-up")}</Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={verifyLogin}
          >
            {translate("sign-in")}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
