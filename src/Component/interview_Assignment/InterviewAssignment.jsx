import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InterviewAssignment() {
  const [applicantId, setApplicantId] = useState("");
  const [slotId, setSlotId] = useState("");
  const [assignmentStatus, setAssignmentStatus] = useState("");
  const [roundName, setRoundName] = useState("");
  const [description, setDescription] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    // Fetch applicants
    axios
      .get("https://localhost:7199/api/Applicant/Applicants ")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setApplicants(response.data.data);
        } else {
          console.error("Invalid data format for applicants:", response.data);
          toast.error("Error fetching applicants");
        }
      })
      .catch((error) => {
        console.error("Error fetching applicants:", error);
        toast.error("Error fetching applicants");
      });

    // Fetch interview slots
    axios
      .get("https://localhost:7199/InterviewSlot/getInterviewSlots")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setSlots(response.data.data);
        } else {
          console.error(
            "Invalid data format for interview slots:",
            response.data
          );
          toast.error("Error fetching interview slots");
        }
      })
      .catch((error) => {
        console.error("Error fetching interview slots:", error);
        toast.error("Error fetching interview slots");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !applicantId ||
      !slotId ||
      !assignmentStatus ||
      !roundName ||
      !description
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7199/InterviewAssignment ",
        {
          applicantId,
          slotId,
          assignmentStatus,
          roundName,
          description,
        }
      );
      console.log("Interview assignment added successfully:", response.data);
      toast.success("Interview assignment added successfully");
      // Clear form fields
      setApplicantId("");
      setSlotId("");
      setAssignmentStatus("");
      setRoundName("");
      setDescription("");
    } catch (error) {
      console.error("Error adding interview assignment:", error);
      toast.error("Error adding interview assignment");
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={2}
        style={{ height: "100vh" }}
      >
        <form onSubmit={handleSubmit} className="interview-assignment-form">
          <Grid
            container
            spacing={4}
            style={{ maxWidth: "700px", margin: "auto" }}
          >
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Interview Assignment Form
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Applicant</InputLabel>
                <Select
                  value={applicantId}
                  onChange={(e) => setApplicantId(e.target.value)}
                >
                  {applicants.map((applicant) => (
                    <MenuItem key={applicant.id} value={applicant.id}>
                      {applicant.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Interview Slot</InputLabel>
                <Select
                  value={slotId}
                  onChange={(e) => setSlotId(e.target.value)}
                >
                  {slots.map((slot) => (
                    <MenuItem key={slot.slotId} value={slot.slotId}>
                      {new Date(slot.startTime).toLocaleString()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Assignment Status</InputLabel>
                <Select
                  value={assignmentStatus}
                  onChange={(e) => setAssignmentStatus(e.target.value)}
                >
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Rescheduled">Rescheduled</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Round Name"
                name="roundName"
                value={roundName}
                variant="standard"
                onChange={(e) => setRoundName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
