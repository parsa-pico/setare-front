import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { persianDays } from "../Common/commonFuncs";

export default function DaysInput({ formData, setFormData }) {
  const handleAddEntry = () => {
    setFormData({
      ...formData,
      days: [...formData.days, { index: "", startTime: "", endTime: "" }],
    });
  };
  const handleDaysChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData.days];

    updatedFormData[index][name] = value;
    setFormData({ ...formData, days: updatedFormData });
  };
  function handleRemoveDay(index) {
    const updatedFormData = [...formData.days];

    updatedFormData.splice(index, 1);
    setFormData({ ...formData, days: updatedFormData });
  }
  return (
    <div>
      <Button className="mt-4" variant="primary" onClick={handleAddEntry}>
        روز جدید+
      </Button>
      <h3>:روزها </h3>
      {formData.days &&
        formData.days.map((entry, index) => (
          <div className="mt-4" key={index}>
            <Row>
              <Button
                onClick={() => handleRemoveDay(index)}
                variant="danger"
                className="w-25 "
              >
                X
              </Button>
              <Form.Group as={Col} controlId={`dayIndex${index}`}>
                <Form.Control
                  dir="rtl"
                  as="select"
                  name="index"
                  value={entry.index}
                  onChange={(e) => handleDaysChange(index, e)}
                >
                  <option value="">یک روز را انتخاب کنید</option>
                  {persianDays.map((day, index) => {
                    return (
                      <option key={index} value={index}>
                        {day}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId={`startTime${index}`}>
              <Form.Label>شروع</Form.Label>
              <Form.Control
                type="text"
                placeholder="HH:mm"
                name="startTime"
                value={entry.startTime}
                onChange={(e) => handleDaysChange(index, e)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId={`endTime${index}`}>
              <Form.Label>پایان</Form.Label>
              <Form.Control
                type="text"
                placeholder="HH:mm"
                name="endTime"
                value={entry.endTime}
                onChange={(e) => handleDaysChange(index, e)}
              />
            </Form.Group>
          </div>
        ))}
    </div>
  );
}
