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
import { signUp } from "../services/authentication";
import { useState } from "react";
import { handleChange } from "../utils/core";
import { validateEmail, validPassword } from "../utils/validators";
import { useAppContext } from "../Context";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { showAlertMessage } = useAppContext();
  const [data, setData] = useState({
    email: { value: "", error: false, helperText: "" },
    password: { value: "", error: false, helperText: "" },
    confirm_password: { value: "", error: false, helperText: "" },
  });

  const verifyRegister = async () => {
    const emailValidation = validateEmail(data.email.value);
    const passwordValidation = validPassword(data.password.value);

    setData((v) => ({
      ...v,
      email: {
        value: v.email.value,
        error: emailValidation.error,
        helperText: emailValidation.helperText,
      },
      password: {
        value: v.password.value,
        error: passwordValidation.error,
        helperText: passwordValidation.helperText,
      },
    }));

    if (emailValidation.error || passwordValidation.error) {
      return;
    }

    if (data.password.value !== data.confirm_password.value) {
      showAlertMessage("As senhas não coincidem", "error");
      return;
    }

    const response = await signUp(data.email.value, data.password.value);

    if (response.success) {
      alert("Cadastro realizado com sucesso!");
      navigate("/signin");
    } else {
      alert(response.error || "Erro ao realizar cadastro");
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
          Registrar
        </Typography>
        <Typography component="h5" variant="h5">
          Seja Bem-vindo!
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
            label="E-mail"
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
            label="Senha"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirmar Senha"
            type="password"
            id="confirm-password"
            value={data.confirm_password.value}
            onChange={(event) =>
              handleChange(
                data,
                setData,
                event.target.value,
                "confirm_password"
              )
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
            <Link to="/signin">Entrar</Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={verifyRegister}
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
