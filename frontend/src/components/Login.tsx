import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";

import "./login.scss";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const customToast = (status: string, message: string) => {
    return toast({
      title: message,
      status,
      duration: 4000,
      position: "top-right",
      isClosable: true,
    });
  };

  const handleChange = (e) => {
    setFormValues((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;

    try {
      const res = await axios.post(url, formValues);

      localStorage.setItem("accessToken", res.data.token);
      setFormValues({
        username: "",
        password: "",
      });

      navigate("/feed");
      customToast("success", res.data?.message);
    } catch (err) {
      const msg = err.response
        ? err.response?.data?.message
        : "Unexpected error";

      customToast("error", msg);
    }
  };

  return (
    <div className="login__wrapper">
      <header>
        <Link to="/" className="logo">
          <h2>Farmsquare 🚜</h2>
        </Link>
      </header>

      <section className="form__wrapper">
        <h3>Login to your account</h3>

        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              onChange={handleChange}
              value={formValues.username}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              value={formValues.password}
            />
          </FormControl>

          <Button
            colorScheme="whatsapp"
            textAlign={"center"}
            w={"100%"}
            h={12}
            type="submit"
          >
            Login
          </Button>
        </form>
      </section>
    </div>
  );
}
