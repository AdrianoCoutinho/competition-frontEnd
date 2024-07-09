import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { register } from "../../api";
import { SnackBars } from "../../shared/components";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { useAppDispatch } from "../../store/hooks";
import { setMessage } from "../../store/modules/SnackBarsSlice";
import "./style.css";

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const path = window.location.pathname;
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const width = isXs ? "90vw" : "30vw";

  const dispatch = useAppDispatch();
  const { isAuthenticated, login } = useAuthContext();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    re_password: "",
  });

  const auth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user.email) {
      return dispatch(
        setMessage({ message: "Preencha o campo e-mail!", status: "error" })
      );
    }
    if (!user.password) {
      return dispatch(
        setMessage({ message: "Preencha o campo senha!", status: "error" })
      );
    }

    await login(user.email, user.password);
  };

  const signup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user.name) {
      return dispatch(
        setMessage({ message: "Preencha o campo nome!", status: "error" })
      );
    }

    if (!user.email) {
      return dispatch(
        setMessage({ message: "Preencha o campo e-mail!", status: "error" })
      );
    }

    if (!user.phone) {
      return dispatch(
        setMessage({ message: "Preencha o campo celular", status: "error" })
      );
    }

    if (!user.password) {
      return dispatch(
        setMessage({ message: "Preencha o campo senha!", status: "error" })
      );
    }

    if (user.password !== user.re_password) {
      return dispatch(
        setMessage({ message: "As senhas não coincidem!", status: "error" })
      );
    }

    const result = await register(user);

    if (result.msg === "Email já cadastrado!") {
      return dispatch(
        setMessage({ message: "Email já cadastrado!", status: "error" })
      );
    }

    if (result.message === "Usuário criado com sucesso") {
      window.location.href = "/";
      return dispatch(
        setMessage({
          message: "Usuário criado com sucesso!",
          status: "success",
        })
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // const handleLoginRedirect = () => {
  //   window.location.href = "/login";
  // };

  // const handleRegisterRedirect = () => {
  //   window.location.href = "/register";
  // };

  if (isAuthenticated) return <>{children}</>;

  return (
    <Box id="login-container-box">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Box id="smooth-bg">
          {path === "/register" ? (
            <Box id="login-box-card" style={{ width }}>
              <Typography id="login-card-title-reset">Registre-se</Typography>
              <Box id="login-inputs">
                <form onSubmit={signup} id="login-form">
                  <TextField
                    label="Nome"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: "#fff" } }} // Estilo do rótulo
                    InputProps={{ style: { color: "#fff" } }} // Estilo do texto do input
                  />
                  <TextField
                    label="E-mail"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                  />
                  <TextField
                    label="Telefone"
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                  />
                  <TextField
                    label="Senha"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                  />
                  <TextField
                    label="Repetir Senha"
                    type="password"
                    name="re_password"
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    id="login-button"
                  >
                    Registrar-se
                  </Button>
                </form>
                <Typography id="return-login-button">
                  <a href="/" id="return-register">
                    Voltar ao login
                  </a>
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box id="login-box-card" style={{ width }}>
              <Box id="title-box">
                <Typography id="login-card-title">
                  Bem-Vindo de Volta
                </Typography>
                <span id="login-card-subtitle">
                  por favor entre na sua conta
                </span>
              </Box>
              <Box id="login-inputs">
                <form onSubmit={auth} id="login-form">
                  <TextField
                    label="E-mail"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                  />
                  <TextField
                    label="Senha"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    id="login-button"
                  >
                    Entrar
                  </Button>
                </form>
                <Typography id="return-login-button">
                  <a href="/register" id="register-link">
                    Não tem uma conta? Registre-se
                  </a>
                </Typography>
              </Box>
            </Box>
          )}
          <SnackBars />
        </Box>
      </Grid>
    </Box>
  );
};
