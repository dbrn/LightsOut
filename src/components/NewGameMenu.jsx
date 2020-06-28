import React from "react";
import { Form, Button } from "react-bootstrap";

const NewGameMenu = (props) => {
  return (
    <div className="d-flex flex-column justify-content-center my-5">
      <Form.Group className="d-block mb-3">
        <Form.Label>Seed</Form.Label>
        <Form.Control
          size="sm"
          type="number"
          min={1}
          max={props.maxNumber}
          required
          value={props.seed}
          onChange={(e) => {
            props.setSeed(e.target.value);
          }}
        />
      </Form.Group>
      <Button
        onClick={() => props.refreshSeed()}
        variant="dark"
        className="mb-3"
      >
        Random Seed
      </Button>
      <Button variant="dark" onClick={() => props.onStart()}>
        New Game
      </Button>
    </div>
  );
};

export default NewGameMenu;
