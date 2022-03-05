import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { productListingStyle } from "./style";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import prodcutImage from "../../assets/images/levis.png";
import { defaultFilter, StatusCode } from "../../constant/constant";
import bookService from "../../service/book/book.service";
import { IListBook } from "../../service/book/book.model";
const BookList: React.FC = () => {
  const classes = productListingStyle();
  const materialClasses = materialCommonStyles();
  const filter = defaultFilter;
  filter.pageSize = 12;
  const [filters, setFilters] = useState(filter);
  const [bookRecords, setBookRecords] = useState<IListBook[]>([]);
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

  return (
    <div className={classes.productListWrapper}>
      <div className="container">
        <Typography variant="h1">Book Listing</Typography>
        <div className="title-wrapper">
          {bookRecords?.length && (
            <Typography variant="h2">
              Total Records
              <span> - {bookRecords[0].totalRecords} items</span>
            </Typography>
          )}
          <FormControl className="dropdown-wrapper" variant="outlined">
            <InputLabel htmlFor="select">Sort By</InputLabel>
            <Select
              className={materialClasses.customSelect}
              MenuProps={{
                classes: { paper: materialClasses.customSelect },
              }}
            >
              <MenuItem value="a-z">a - z</MenuItem>
              <MenuItem value="z-a">z - a</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="product-list-wrapper">
          <div className="product-list-inner-wrapper">
            {bookRecords?.map((book: any) => (
              <div className="product-list" key={book.id}>
                <div className="product-list-inner">
                  <em>
                    <img src={book.base64Image} alt={book.name} />
                  </em>
                  <div className="content-wrapper">
                    <Typography variant="h3">{book.name}</Typography>
                    <p className="description">{book.description}</p>
                    <p className="price">
                      <span className="discount-price">MRP</span>
                      &#8377; {book.price}
                    </p>
                    <button className="MuiButtonBase-root MuiButton-root MuiButton-contained btn pink-btn MuiButton-containedPrimary MuiButton-disableElevation">
                      <span className="MuiButton-label">ADD TO CART</span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {bookRecords?.length && (
          <div className="pagination-wrapper">
            <Pagination
              count={Math.ceil(bookRecords[0].totalRecords / 12)}
              onChange={(e, page) => {
                setFilters({ ...filter, page });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
