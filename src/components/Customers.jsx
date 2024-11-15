import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useState } from "react";
import { fetchCustomers } from "../CustomerAPI";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Box, Typography } from "@mui/material";
import "../Styles.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const [colDefs, setColDefs] = useState([
    { field: "firstname", filter: "true" },
    { field: "lastname", filter: "true" },
    { field: "streetaddress", filter: "true" },
    { field: "postcode", filter: "true" },
    { field: "city", filter: "true" },
    { field: "email", filter: "true" },
    { field: "phone", filter: "true" },
  ]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  return (
    <Box sx={{ width: "100%", marginTop: 10 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, ml: 1, color: "#6c757d" }}
      >
        Customers
      </Typography>
      <div className="ag-theme-material custom-ag-grid" style={{ height: 500 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
          suppressCellFocus={true}
        />
      </div>
    </Box>
  );
}
