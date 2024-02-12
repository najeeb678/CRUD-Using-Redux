import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUsers, deleteUser } from "../Redux/Slices/UserDetails";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Read = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, loading, searchedData } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(showUsers());
  }, [dispatch]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
          ALL Users List
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ width: "80%", margin: "10px auto" }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                fontWeight: "bold",
                background: "#6895D2",
                boxShadow: "none",
              }}
            >
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Age
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Phone No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Gender
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              users
                .filter((data) => {
                  if (searchedData.length === 0) {
                    return data;
                  } else {
                    return data.name
                      .toLowerCase()
                      .includes(searchedData.toLowerCase());
                  }
                })

                .map((rowData) => (
                  <TableRow key={rowData.id} sx={{ marginBottom: 10 }}>
                    <TableCell>{rowData.name}</TableCell>
                    <TableCell>{rowData.age} years</TableCell>
                    <TableCell>{rowData.email}</TableCell>
                    <TableCell>{rowData.phoneNo}</TableCell>
                    <TableCell>{rowData.gender}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="space-around">
                        <Button
                          variant="contained"
                          color="warning"
                          startIcon={<EditIcon />}
                          onClick={() => navigate(`/edit/${rowData.id}`)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                          sx={{ ml: 1 }}
                          onClick={() => dispatch(deleteUser(rowData.id))}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

{/*       
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" color="error" onClick={() => dispatch(deleteAllUsers())}>
          Delete All Users
        </Button>
      </Box> */}
    </>
  );
};

export default Read;
