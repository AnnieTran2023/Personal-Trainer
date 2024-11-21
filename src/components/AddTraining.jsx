import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { saveTraining } from "../TrainingAPI";
import { getCustomerById } from "../CustomerAPI";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function AddTraining({ handleFetch, customerLink }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: customerLink,
  });
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    if (customerLink) {
      getCustomerById(customerLink)
        .then((customer) =>
          setCustomerName(`${customer.firstname} ${customer.lastname}`)
        )
        .catch((err) => console.error("Error fetching customer name:", err));
    }
  }, [customerLink]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleDateChange = (newDate) => {
    if (newDate) {
      const formattedDate = dayjs(newDate).toISOString();
      setTraining((prev) => ({ ...prev, date: formattedDate }));
    }
  };

  const handleSave = () => {
    saveTraining(training)
      .then(() => {
        handleFetch();
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button
        sx={{
          color: "#ff8fab",
          backgroundColor: "white",
          padding: 0.8,
          "&:hover": {
            backgroundColor: "#ff8fab",
            color: "whitesmoke",
          },
        }}
        size="small"
        onClick={handleClickOpen}
      >
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h5" sx={{ color: "#6c757d", fontWeight: "bold" }}>
          New Training
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={handleDateChange} />
          </LocalizationProvider>
          <TextField
            margin="dense"
            name="activity"
            label="Activity"
            value={training.activity}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="duration"
            label="Duration (min)"
            value={training.duration}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            name="customer"
            label="Customer"
            value={customerName}
            onChange={handleChange}
            fullWidth
            variant="standard"
            disabled
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
