import React, {ChangeEventHandler, MouseEventHandler, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import {getNumberStringRepresentation} from "./helpers";
import {ValidationError} from "yup";

const MIN_NUMBER_VALUE = 0;
const MAX_NUMBER_VALUE = 99999;

const userNumberValidationSchema = Yup.number()
  .required()
  .positive("Value must be positive")
  .integer("Value must be an integer")
  .min(MIN_NUMBER_VALUE, `Value must be greater than or equal ${MIN_NUMBER_VALUE}`)
  .max(MAX_NUMBER_VALUE, `Value must be less than or equal ${MAX_NUMBER_VALUE}`);

const ConvertForm = () => {
  const [userNumber, setUserNumber] = useState(MIN_NUMBER_VALUE);
  const [error, setError] = useState("");
  const [numberByWords, setNumberByWords] = useState("");

  const submitForm: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      await userNumberValidationSchema.validate(userNumber);
      setNumberByWords(getNumberStringRepresentation(userNumber));
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.errors[0]);
        setNumberByWords("");
      }
    }
  }

  const changeNumber: ChangeEventHandler<HTMLInputElement> = (e) => {
    setError("");
    setUserNumber(Number(e.target.value))
  }

  return (
    <section>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Your number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your number"
            min={MIN_NUMBER_VALUE}
            max={MAX_NUMBER_VALUE}
            step={1}
            value={userNumber}
            onChange={changeNumber}
            isInvalid={!!error}
          />
          {error && <Form.Text className="invalid-feedback">{error}</Form.Text>}
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitForm}>
          Submit
        </Button>

        <div className="mt-4 fs-4">
          <span>Your result: </span>
          <span>{numberByWords}</span>
        </div>
      </Form>
    </section>
  );
};

export default ConvertForm;