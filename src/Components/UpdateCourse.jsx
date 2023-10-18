import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { persianDays, tryHTTP } from "../Common/commonFuncs";
import httpService from "../Services/httpService";
import { authHeader } from "../Services/authService";
import DaysInput from "./DaysInput";

const UpdateCourse = () => {
  const nav = useNavigate();
  const loc = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    days: [{ index: "", startTime: "", endTime: "" }],
    level: "",
    paymentAmount: "",
    isFinished: false,
    payedAmount: "",
    midTerm: "",
    final: "",
    extra: "",
    activity: "",
  });
  useEffect(() => {
    if (!loc.state) return;
    const { scores, payedAmount, paymentAmount, level, isFinished, days } =
      loc.state;
    const revertFormattedDays = [];
    for (let key in days) {
      revertFormattedDays.push({
        index: key,
        startTime: days[key][0],
        endTime: days[key][1],
      });
    }
    const data = {
      payedAmount,
      paymentAmount,
      level,
      isFinished,
      days: revertFormattedDays,
    };
    for (let key in scores) {
      const d = scores[key];
      if (d !== null) data[key] = d;
    }

    setFormData({ ...formData, ...data });
  }, []);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    tryHTTP(async () => {
      const { midTerm, final, extra, activity, days, ...rest } = formData;
      const formattedDays = {};
      formData.days.forEach(({ index, startTime, endTime }) => {
        formattedDays[index] = [startTime, endTime];
      });
      const scores = {
        midTerm,
        final,
        extra,
        activity,
      };
      for (let key in scores) {
        const parsedScore = parseInt(scores[key], 10);
        scores[key] = isNaN(parsedScore) ? null : parsedScore;
      }
      const obj = {
        ...rest,
        scores,
        _id: loc.state.courseId,
        days: formattedDays,
      };

      const { data } = await httpService.put("/admin/course", obj, authHeader);
      alert("تغییرات با موفقیت انجام شد");
      window.location = "/courses";
    });
  };
  function deleteCourse() {
    tryHTTP(async () => {
      const { data } = await httpService.delete(
        "/admin/course/" + loc.state.courseId,
        authHeader
      );
      alert("تغییرات با موفقیت انجام شد");
      window.location = "/courses";
    });
  }
  return (
    <div style={{ margin: "0 2rem" }}>
      <h1 className="mb-3 col">تغییر دوره</h1>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title dir="rtl" className="w-100 ">
            آیا از حذف دوره اطمینان دارید؟
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button
            className="w-50"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            خیر
          </Button>
          <Button onClick={deleteCourse} className="w-25" variant="danger">
            بله
          </Button>
        </Modal.Footer>
      </Modal>
      <Button onClick={() => setShowModal(true)} variant="danger col mt-1 mb-3">
        حذف دوره
      </Button>
      <h3>{loc.state && loc.state.firstName + " " + loc.state.lastName}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="level">
          <Form.Label>سطح</Form.Label>
          <Form.Control
            type="text"
            // placeholder="Enter level"
            name="level"
            value={formData.level}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="paymentAmount">
          <Form.Label>شهریه</Form.Label>
          <Form.Control
            type="text"
            // placeholder="Enter payment amount"
            name="paymentAmount"
            value={formData.paymentAmount}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="payedAmount">
          <Form.Label>پرداختی</Form.Label>
          <Form.Control
            type="text"
            // placeholder="Enter payed amount"
            name="payedAmount"
            value={formData.payedAmount}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="midTerm">
          <Form.Label>Midterm</Form.Label>
          <Form.Control
            type="number"
            // placeholder="Enter midterm score"
            name="midTerm"
            value={formData.midTerm}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="final">
          <Form.Label>Final</Form.Label>
          <Form.Control
            type="number"
            // placeholder="Enter final score"
            name="final"
            value={formData.final}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="extra">
          <Form.Label>Extra</Form.Label>
          <Form.Control
            type="number"
            // placeholder="Enter extra score"
            name="extra"
            value={formData.extra}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="activity">
          <Form.Label>Activity</Form.Label>
          <Form.Control
            type="number"
            // placeholder="Enter activity score"
            name="activity"
            value={formData.activity}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="isFinished">
          <Form.Check
            type="checkbox"
            label="دوره تمام شده؟"
            name="isFinished"
            checked={formData.isFinished}
            onChange={handleInputChange}
            className="mt-2"
            style={{
              textAlign: "start",
              marginLeft: "2rem",
            }}
          />
        </Form.Group>
        <DaysInput formData={formData} setFormData={setFormData} />
        <Button className="mt-5 w-50" variant="primary" type="submit">
          ثبت
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCourse;
