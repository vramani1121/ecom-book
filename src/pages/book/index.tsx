import React, { useEffect, useState } from "react";
import { productStyle } from "./style";
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
import { Button } from "@material-ui/core";
import bookService from "../../service/book/book.service";
import { IListBook } from "../../service/book/book.model";
import { toast } from "react-toastify";

const Book: React.FC = () => {
  const classes = productStyle();
  const [filters, setFilters] = useState(defaultFilter);
  const [bookRecords, setBookRecords] = useState<IListBook[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(0);

  const history = useHistory();
  useEffect(() => {
    searchAllBooks();
  }, []);

  useEffect(() => {
    searchAllBooks();
  }, [filters]);

  const searchAllBooks = () => {
    bookService.getAll(filters).then((res) => {
      if (res && res.code === StatusCode.Success) {
        setBookRecords(res.data);
      }
    });
  };

  const columns = [
    { id: "id", label: "Id", minWidth: 80 },
    { id: "name", label: "Book Name", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "category", label: "Category", minWidth: 100 },
  ];

  const onConfirmDelete = () => {
    bookService.delete(selectedId).then((res) => {
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
        <Typography variant="h1">Book Page</Typography>
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
          <Button
            type="button"
            className="btn pink-btn"
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => history.push("/add-book")}
          >
            Add
          </Button>
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
              {bookRecords?.map((row: IListBook, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      className="green-btn btn"
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        history.push(`/edit-book/${row.id}`);
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
          count={bookRecords?.length ? bookRecords[0].totalRecords : 0}
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
          <DialogTitle id="alert-dialog-title">Delete book</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this book?
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

export default Book;
