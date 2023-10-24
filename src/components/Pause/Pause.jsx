import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./Pause.module.css";

function Pause(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={styles.pause}>
        <Modal.Body>
          <h1>PAUSE</h1>
          <Button
            onClick={props.onHide}
            variant="dark"
            className={styles.pauseOfBtn}
          >
            Continue game
          </Button>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default Pause;
