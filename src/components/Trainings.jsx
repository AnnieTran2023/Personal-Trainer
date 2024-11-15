import { useState, useEffect } from "react";
import { fetchTrainings } from "../TrainingAPI";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import "../Styles.css";

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "activity", headerName: "Activity", filter: true },
    {
      headerName: "Date",
      field: "date",
      filter: true,
      valueFormatter: (params) =>
        dayjs(params.value).format("DD.MM.YYYY HH:mm"),
    },
    { field: "duration", headerName: "Duration (min)", filter: true },
    {
      headerName: "Customer",
      valueGetter: (params) => {
        return `${params.data.customer?.firstname} ${params.data.customer?.lastname}`;
      },
      filter: true,
    },
  ]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetchTrainings()
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };
  return (
    <Box sx={{ width: "100%", marginTop: 10 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, ml: 1, color: "#6c757d" }}
      >
        Trainings
      </Typography>
      <div className="ag-theme-material custom-ag-grid" style={{ height: 500 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
          suppressCellFocus={true}
        />
      </div>
    </Box>
  );
}
