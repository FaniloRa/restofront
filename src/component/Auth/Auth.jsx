import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Box, Button, Modal, Snackbar, Typography } from "@mui/material";
import { style } from "./../Cart/Cart";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };

  return (
    <>
      <Modal
        open={
          location.pathname === "/account/register" ||
          location.pathname === "/account/login" ||
          location.pathname === "/account/reset-password-request" ||
          location.pathname === "/account/reset-password"
        }
        onclose={handleClose}
      >
        <Box sx={style}>
          {location.pathname === "/account/register" ? (
            <RegisterForm />
          ) : (
            <LoginForm />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Auth;
