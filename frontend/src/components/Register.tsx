import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

import "./register.scss";
import useCustomToast from "../hooks/useCustomToast";

const initialState = {
  email: "",
  username: "",
  name: "",
  accountType: "FARMER",
  password: "",
  bio: "",
};

export default function Login() {
  const navigate = useNavigate();
  const customToast = useCustomToast();

  const [formValues, setFormValues] = useState({ ...initialState });

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

    const url = `${import.meta.env.VITE_BACKEND_URL}/auth/register`;

    try {
      const res = await axios.post(url, formValues);

      setFormValues({ ...initialState });

      navigate("/login");
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
        <h3>Register your account</h3>

        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              value={formValues.name}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              onChange={handleChange}
              value={formValues.username}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              value={formValues.email}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Account Type</FormLabel>
            <Select
              value={formValues.accountType}
              placeholder="Select account type"
              onChange={handleChange}
              name="accountType"
            >
              <option value="FARMER">Farmer</option>
              <option value="BUYER">Buyer</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              value={formValues.password}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              onChange={handleChange}
              value={formValues.bio}
            />
          </FormControl>

          <Button
            colorScheme="whatsapp"
            textAlign={"center"}
            w={"100%"}
            h={12}
            type="submit"
          >
            Create Account
          </Button>
        </form>
      </section>
    </div>
  );
}
