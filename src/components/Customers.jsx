import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useState, useRef } from "react";
import { fetchCustomers, deleteCustomer, updateCustomer } from "../CustomerAPI";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Box, Typography } from "@mui/material";
import "../Styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const gridApi = useRef(null);

  const colDefs = [
    {
      cellRenderer: (params) => {
        const isEditing = params.node.id === editRowId;
        const customerLink = params.data._links.self.href;
        return (
          <div>
            {isEditing ? (
              <>
                <Button
                  color="success"
                  size="small"
                  onClick={() => handleSave(params)}
                >
                  <CheckIcon />
                </Button>
                <Button
                  color="error"
                  size="small"
                  onClick={() => handleCancel()}
                >
                  <CloseIcon />
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="error"
                  size="small"
                  onClick={() => handleDelete(params.data._links.self.href)}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(params.node.id)}
                >
                  <ModeEditIcon />
                </Button>
              </>
            )}
            <AddTraining
              handleFetch={handleFetch}
              customerLink={customerLink}
            />
          </div>
        );
      },
      width: 270,
      headerName: "Actions",
    },
    {
      field: "firstname",
      filter: "true",
      width: 160,
      editable: (params) => params.node.id === editRowId,
      headerName: "First name",
    },
    {
      field: "lastname",
      filter: "true",
      width: 160,
      editable: (params) => params.node.id === editRowId,
      headerName: "Last name",
    },
    {
      field: "streetaddress",
      filter: "true",
      editable: (params) => params.node.id === editRowId,
      headerName: "Street address",
    },
    {
      field: "postcode",
      filter: "true",
      width: 160,
      editable: (params) => params.node.id === editRowId,
      headerName: "Postcode",
    },
    {
      field: "city",
      filter: "true",
      width: 160,
      editable: (params) => params.node.id === editRowId,
      headerName: "City",
    },
    {
      field: "email",
      filter: "true",
      editable: (params) => params.node.id === editRowId,
      headerName: "Email",
    },
    {
      field: "phone",
      filter: "true",
      editable: (params) => params.node.id === editRowId,
      headerName: "Phone",
    },
  ];

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  const handleDelete = (url) => {
    if (window.confirm("Are you sure?")) {
      deleteCustomer(url)
        .then(() => {
          handleFetch();
          setOpen(true);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (rowId) => {
    setEditRowId(rowId);
    // Refresh cells to re-render the editing UI
    if (gridApi.current) {
      gridApi.current.refreshCells({ force: true });
    }
  };

  const handleSave = (params) => {
    const updatedCustomer = params.data;
    updateCustomer(params.data._links.self.href, updatedCustomer)
      .then(() => {
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer._links.self.href === updatedCustomer._links.self.href
              ? updatedCustomer
              : customer
          )
        );
        setEditRowId(null);
        if (gridApi.current) {
          gridApi.current.refreshCells({ force: true });
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCancel = () => {
    setEditRowId(null);
    handleFetch();
    if (gridApi.current) {
      gridApi.current.refreshCells({ force: true });
    }
  };

  return (
    <Box sx={{ width: "100%", marginTop: 10 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ mb: 2, ml: 1, color: "#6c757d" }}
        >
          Customers
        </Typography>
        <AddCustomer handleFetch={handleFetch} />
      </Box>
      <div className="ag-theme-material custom-ag-grid" style={{ height: 500 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
          suppressCellFocus={true}
          onGridReady={(params) => (gridApi.current = params.api)}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Customer deleted!"
      />
    </Box>
  );
}
