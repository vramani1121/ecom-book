import React, { useEffect, useState } from "react";
import { editStyle } from "./style";
import * as Yup from "yup";
import {
  Typography,
  TextField,
  Button,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import bookService from "../../../service/book/book.service";
import { StatusCode } from "../../../constant/constant";
import { Formik } from "formik";
import { IAddOrEditBook } from "../../../service/book/book.model";
import ValidationErrorMessage from "../../../components/ValidationErrorMessage/ValidationErrorMessage";
import { toast } from "react-toastify";
import { materialCommonStyles } from "../../../utils/materialCommonStyles";
import categoryService from "../../../service/category/category.service";

const EditBook: React.FC = () => {
  const materialClasses = materialCommonStyles();
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const classes = editStyle();
  const history = useHistory();
  const initialValues: IAddOrEditBook = {
    id: 0,
    name: "",
    price: "",
    category: 0,
    description: "",
    imageSrc: "",
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) getBookById();
    categoryService.getAllOptions().then((res) => {
      if (res.code === StatusCode.Success) {
        setCategories(res.data);
      }
    });
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Book Name is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.number()
      .min(1, "Category is required")
      .required("Category is required"),
    price: Yup.number().required("Price is required"),
    imageSrc: Yup.string().required("Image is required"),
  });

  const getBookById = () => {
    bookService.getById(Number(id)).then((res) => {
      if (res && res.code === StatusCode.Success) {
        setInitialValueState({
          id: res.data.id,
          name: res.data.name,
          price: res.data.price,
          category: res.data.categoryId,
          description: res.data.description,
          imageSrc: res.data.base64image,
        });
      }
    });
  };

  const onSubmit = (values: IAddOrEditBook) => {
    bookService.save(values).then((res) => {
      if (res && res.code === StatusCode.Success) {
        toast.success(res.message);
        history.push("/book");
      }
    });
  };

  const onSelectFile = (e: any, setFieldValue: any, setFieldError: any) => {
    const files = e.target.files;
    if (files?.length) {
      const fileSelected = e.target.files[0];
      const fileNameArray = fileSelected.name.split(".");
      const extension = fileNameArray.pop();
      if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
        const reader = new FileReader();
        reader.readAsDataURL(fileSelected);
        reader.onload = function () {
          setFieldValue("imageSrc", reader.result);
        };
        reader.onerror = function (error) {
          throw error;
        };
      } else {
        toast.error("only jpg,jpeg and png files are allowed");
      }
    } else {
      setFieldValue("imageSrc", "");
    }
  };
  return (
    <div className={classes.editWrapper}>
      <div className="container">
        <Typography variant="h1">{id ? "Edit" : "Add"} Book</Typography>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setValues,
            setFieldError,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <TextField
                    id="first-name"
                    name="name"
                    label="Book Name *"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.name}
                    touched={touched.name}
                  />
                </div>

                <div className="form-col">
                  <TextField
                    type={"number"}
                    id="price"
                    name="price"
                    label="Book Price (RS)*"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.price}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.price}
                    touched={touched.price}
                  />
                </div>

                <div className="form-col">
                  <FormControl className="dropdown-wrapper" variant="outlined">
                    <InputLabel htmlFor="select">Category *</InputLabel>
                    <Select
                      name={"category"}
                      id={"category"}
                      onChange={handleChange}
                      className={materialClasses.customSelect}
                      MenuProps={{
                        classes: { paper: materialClasses.customSelect },
                      }}
                      value={values.category}
                    >
                      {categories?.map((rl: any) => (
                        <MenuItem value={rl.value} key={"category" + rl.value}>
                          {rl.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <ValidationErrorMessage
                    message={errors.category}
                    touched={touched.category}
                  />
                </div>
                {/* <img src={values.imageSrc} alt="asa" /> */}
                <div className="form-col">
                  {!values.imageSrc && (
                    <>
                      {" "}
                      <label
                        htmlFor="contained-button-file"
                        className="file-upload-btn"
                      >
                        <Input
                          id="contained-button-file"
                          type="file"
                          inputProps={{ className: "small" }}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            onSelectFile(e, setFieldValue, setFieldError);
                          }}
                        />
                        <Button
                          variant="contained"
                          component="span"
                          className="btn pink-btn"
                        >
                          Upload
                        </Button>
                      </label>
                      <ValidationErrorMessage
                        message={errors.imageSrc}
                        touched={touched.imageSrc}
                      />
                    </>
                  )}
                  {values.imageSrc && (
                    <div className="uploaded-file-name">
                      <em>
                        <img src={values.imageSrc} alt="" />
                      </em>
                      image{" "}
                      <span
                        onClick={() => {
                          setFieldValue("imageSrc", "");
                        }}
                      >
                        x
                      </span>
                    </div>
                  )}
                </div>
                <div className="form-col full-width description">
                  <TextField
                    id="description"
                    name="description"
                    label="Description *"
                    variant="outlined"
                    value={values.description}
                    multiline
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.description}
                    touched={touched.description}
                  />
                </div>
              </div>
              <div className="btn-wrapper">
                <Button
                  className="green-btn btn"
                  variant="contained"
                  type="submit"
                  color="primary"
                  disableElevation
                >
                  Save
                </Button>
                <Button
                  className="pink-btn btn"
                  variant="contained"
                  type="button"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    history.push("/book");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditBook;
