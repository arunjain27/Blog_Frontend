import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertDismissible() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>Welcome to the Blogging Platform!</Alert.Heading>

        <p>
          Ready to share your thoughts and ideas with the world? Dive into the
          world of blogging by <strong>signing up or signing in</strong>.
        </p>
        <hr />
      </Alert>
    </>
  );
}

export default AlertDismissible;
