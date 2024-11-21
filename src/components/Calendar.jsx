import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { fetchTrainings } from "../TrainingAPI";
import Box from "@mui/material/Box";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTrainings().then((trainings) => {
      const calendarEvents = trainings.map((training) => ({
        title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
        start: new Date(training.date),
        end: new Date(
          new Date(training.date).getTime() + training.duration * 60000
        ),
      }));
      setEvents(calendarEvents);
      console.log(trainings)
    });
  }, []);

  return (
    <Box sx={{ width: "100%", marginTop: 10 }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week", "day"]}
      />
    </Box>
  );
}
