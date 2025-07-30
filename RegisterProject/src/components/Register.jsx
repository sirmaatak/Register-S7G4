import { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import axios from "axios";

// for clear the form after submitted it
const initialFormData = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

//if users validation is false then show this messages
const errorMessages = {
  name: "Minimum 3 characters needed",
  surname: "Minimum 3 characters needed",
  email: "Invalid mail adress",
  password:
    "8 characters long 1 uppercase & 1 lowercase character and 1 number needed",
};

export default function Register() {
  // for keeping users registeration datas
  const [formData, setFormData] = useState(initialFormData);

  // for validation setters
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
  });
  const [isValid, setIsValid] = useState(false);

  //function for validate email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // for regex password validation
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  //checking the isValid
  useEffect(() => {
    if (
      formData.name.replaceAll(" ", "").length >= 3 &&
      formData.surname.replaceAll(" ", "").length >= 3 &&
      validateEmail(formData.email) &&
      regex.test(formData.password)
    ) {
      setIsValid(true);
      //console.log(errors);
    } else {
      //console.log(errors);
      setIsValid(false);
    }
    //console.log(isValid);
  }, [formData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    //name and surname validation
    if (name == "name" || name == "surname") {
      if (value.replaceAll(" ", "").length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    //email validation
    if (name == "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    //password validation
    if (name == "password") {
      if (regex.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) return;
    // for post request
    axios
      .post("https://reqres.in/api/users", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //for clear form
    setFormData(initialFormData);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Ad :</Label>
          <Input
            id="name"
            name="name"
            placeholder="Adinizi Yaziniz"
            type="text"
            onChange={handleChange}
            value={formData.name}
            invalid={errors.name}
          />
          {errors.name && <FormFeedback>{errorMessages.name}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="surname">Soyad :</Label>
          <Input
            id="surname"
            name="surname"
            placeholder="Soyadinizi Yaziniz"
            type="text"
            onChange={handleChange}
            value={formData.surname}
            invalid={errors.surname}
          />
          {errors.surname && (
            <FormFeedback>{errorMessages.surname}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="email">Email :</Label>
          <Input
            id="email"
            name="email"
            placeholder="Mail Adresinizi Yaziniz"
            type="email"
            onChange={handleChange}
            value={formData.email}
            invalid={errors.email}
          />
          {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="password">Sifre :</Label>
          <Input
            id="password"
            name="password"
            placeholder="Sifrenizi Yaziniz"
            type="password"
            onChange={handleChange}
            value={formData.password}
            invalid={errors.password}
          />
          {errors.password && (
            <FormFeedback>{errorMessages.password}</FormFeedback>
          )}
        </FormGroup>
        <Button disabled={!isValid}>Kayit Ol</Button>
      </Form>
    </>
  );
}
