import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchTrainings } from "../TrainingAPI";
import _ from "lodash";
import { CircularProgress, Typography, Box } from "@mui/material";

export default function Statistics() {
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrainings()
      .then((data) => {
        const groupedData = _(data)
          .groupBy("activity")
          .map((trainings, activity) => ({
            activity,
            totalDuration: _.sumBy(trainings, "duration"),
          }))
          .value();

        setTrainingData(groupedData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, ml: 1, color: "#6c757d" }}
      >
        Activity Statistics
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={trainingData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis
            dataKey="activity"
            label={{
              value: "Activities",
              position: "insideBottom",
              offset: -15,
            }}
          />
          <YAxis
            label={{
              value: "Duration (min)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip />
          <Legend payload={[]} />
          <Bar dataKey="totalDuration" fill="#fb6f92" name="totalDuration" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
