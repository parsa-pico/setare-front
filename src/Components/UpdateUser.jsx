import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { tryHTTP } from "../Common/commonFuncs";
import httpService from "../Services/httpService";
import axios from "axios";
import { authHeader } from "../Services/authService";
import { useParams } from "react-router-dom";
const UpdateUser = () => {
  const params = useParams();
  useEffect(() => {
    tryHTTP(async () => {
      const { data } = await httpService.get(
        "/admin/users/" + params.id,
        authHeader
      );
      setFormData(data);
    });
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };

  function updateUser() {
    tryHTTP(async () => {
      const { data } = await httpService.put(
        `/admin/update-user/${params.id}`,
        formData,
        authHeader
      );
      alert("کاربر ادیت شد");
      window.location = "/students";
    });
  }
  return (
    <Form className="add-user-form" onSubmit={handleSubmit}>
      <Form.Group controlId="firstName">
        <Form.Label>نام</Form.Label>
        <Form.Control
          type="text"
          //   placeholder="Enter first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>نام خانوادگی</Form.Label>
        <Form.Control
          type="text"
          //   placeholder="Enter last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="phoneNumber">
        <Form.Label>شماره تلفن</Form.Label>
        <Form.Control
          type="tel"
          //   placeholder="Enter phone number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button className="mt-4" variant="primary" type="submit">
        ادیت
      </Button>
    </Form>
  );
};

export default UpdateUser;
