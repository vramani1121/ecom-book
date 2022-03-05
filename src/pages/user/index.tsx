import React, { useEffect, useState } from "react";
import { productStyle } from "./style";

import * as Yup from "yup";
import { ICreateUser } from "../../service/auth/auth.model";
import { Formik } from "formik";
import authService from "../../service/auth/auth.service";
import {
  defaultFilter,
  RecordsPerPage,
  StatusCode,
} from "../../constant/constant";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, Checkbox } from "@material-ui/core";
import userService from "../../service/user/user.service";
import { IListUser } from "../../service/user/user.model";
import { toast } from "react-toastify";

const User: React.FC = () => {
  const classes = productStyle();
  const [filters, setFilters] = useState(defaultFilter);
  const [userRecords, setUserRecords] = useState<IListUser[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(0);

  const history = useHistory();
  useEffect(() => {
    searchAllUsers();
  }, []);

  useEffect(() => {
    searchAllUsers();
  }, [filters]);

  const searchAllUsers = () => {
    userService.getAllUsers(filters).then((res) => {
      if (res && res.code === StatusCode.Success) {
        setUserRecords(res.data);
      }
    });
  };

  const columns = [
    { id: "id", label: "Id", minWidth: 80 },
    { id: "firstName", label: "First Name", minWidth: 100 },
    { id: "lastName", label: "Last Name", minWidth: 100 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "roleName",
      label: "Role",
      minWidth: 130,
    },
  ];

  const onConfirmDelete = () => {
    userService.delete(selectedId).then((res) => {
      if (res && res.code === StatusCode.Success) {
        toast.success(res.message);
        setOpen(false);
        setFilters({ ...filters, page: 1 });
      }
    });
  };
  return (
    <div className={classes.productWrapper}>
      <div className="container">
        <Typography variant="h1">User</Typography>
        <div className="btn-wrapper">
          <TextField
            id="text"
            name="text"
            placeholder="Search..."
            variant="outlined"
            inputProps={{ className: "small" }}
            onChange={(e) => {
              setFilters({ ...filters, keyword: e.target.value, page: 1 });
            }}
          />
        </div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userRecords?.map((row: IListUser, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.roleName}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      className="green-btn btn"
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        history.push(`/edit-user/${row.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      className="btn pink-btn"
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        setOpen(true);
                        setSelectedId(row.id ?? 0);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={RecordsPerPage}
          component="div"
          count={userRecords?.length ? userRecords[0].totalRecords : 0}
          rowsPerPage={filters.pageSize}
          page={filters.page - 1}
          onPageChange={(e, newPage) => {
            setFilters({ ...filters, page: newPage + 1 });
          }}
          onRowsPerPageChange={(e) => {
            setFilters({ ...filters, page: 1, pageSize: +e.target.value });
          }}
        />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="cancel-popup"
        >
          <DialogTitle id="alert-dialog-title">Delete user</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="btn pink-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onConfirmDelete();
              }}
              autoFocus
              className="btn green-btn"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default User;
