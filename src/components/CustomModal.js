import React from "react";
import Button from "@mui/material/Button";
import { Box, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomModal = (props) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height:150,
            width: 400,
            bgcolor: "white",
            boxShadow: 10,
            borderRadius: 4,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent:"space-between",
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom sx={{ marginX: "auto" }}>
            User Has Been Added
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              size="small"
              fullWidth
              color="secondary"
              onClick={props.onClose}
            >
              Add a New User
            </Button>
            <Button
              variant="contained"
              size="small"
              fullWidth
              color="warning"
              onClick={() => navigate("/read")}
            >
              View List of Users
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default CustomModal;
