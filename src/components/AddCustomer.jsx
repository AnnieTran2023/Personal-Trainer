import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { saveCustomer } from "../CustomerAPI";

export default function AddCustomer({ handleFetch }) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    saveCustomer(customer)
      .then(() => {
        handleFetch();
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button>
        <PersonAddIcon
          sx={{ marginRight: "8px", fontSize: 38, color: "#fb6f92" }}
          onClick={handleClickOpen}
        />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h5" sx={{ color: "#6c757d", fontWeight: "bold" }}>
          New Customer
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="firstname"
            label="First name"
            value={customer.firstname}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="lastname"
            label="Last name"
            value={customer.lastname}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="streetaddress"
            label="Street address"
            value={customer.streetaddress}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="postcode"
            label="Postcode"
            value={customer.postcode}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            value={customer.city}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            value={customer.email}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone number"
            value={customer.phone}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 3 }}>
          <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            size="medium"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
