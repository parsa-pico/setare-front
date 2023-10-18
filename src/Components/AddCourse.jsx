import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { persianDays, tryHTTP } from "../Common/commonFuncs";
import httpService from "../Services/httpService";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { authHeader } from "../Services/authService";
import DaysInput from "./DaysInput";

export default function AddCourse() {
  const nav = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    days: [{ index: "", startTime: "", endTime: "" }],
    paymentAmount: 0,
    level: "",
  });

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData.days];

    updatedFormData[index][name] = value;
    setFormData({ ...formData, days: updatedFormData });
  };

  const handleAddEntry = () => {
    setFormData({
      ...formData,
      days: [...formData.days, { index: "", startTime: "", endTime: "" }],
    });
  };

  function submitForm() {
    const userId = location.state._id;
    const formattedDays = {};
    formData.days.forEach(({ index, startTime, endTime }) => {
      formattedDays[index] = [startTime, endTime];
    });
    tryHTTP(async () => {
      const { data } = await httpService.post(
        "/admin/course",
        {
          days: formattedDays,
          paymentAmount: formData.paymentAmount,
          level: formData.level,
          userId,
        },
        authHeader
      );
      alert("دوره جدید اضافه شد");
      nav("/students");
    });
  }
  return (
    <div style={{ margin: "0 2rem" }}>
      <h2>دوره جدید</h2>
      <h3>
        {location.state.firstName} {location.state.lastName}
      </h3>
      <Form.Group controlId="level">
        <Form.Label>سطح</Form.Label>
        <Form.Control
          type="text"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="paymentAmount">
        <Form.Label>شهریه</Form.Label>
        <Form.Control
          type="number"
          value={formData.paymentAmount}
          onChange={(e) =>
            setFormData({ ...formData, paymentAmount: e.target.value })
          }
        />
      </Form.Group>
      <DaysInput formData={formData} setFormData={setFormData} />
      <Button className="m-2" variant="primary" onClick={submitForm}>
        ثبت دوره
      </Button>
    </div>
  );
}
