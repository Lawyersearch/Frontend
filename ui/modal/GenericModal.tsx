import React from "react";
import { Fade, Modal, Container, ModalProps, SxProps } from "@mui/material";

const modalStyle: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  backgroundColor: "background.default",
  width: { md: "fit-content", xs: "min(90vw, 600px)" },
  maxWidth: "min(90vw, auto) !important",
};

const GenericModal = (props: ModalProps) => {
  const { open, children } = props;
  return (
    <Modal closeAfterTransition {...props}>
      <Fade in={open} mountOnEnter unmountOnExit>
        <Container sx={modalStyle}>{children}</Container>
      </Fade>
    </Modal>
  );
};

export default GenericModal;
