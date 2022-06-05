import React, { useState } from "react";
import * as p from "./auctionAdd.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import NavBar from "../../component/navbar/nav_bar.js";

let AuctionAdd = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      proof: "",
      category: "",
      price: "",
      end_date: "",
      end_time: "",
      contactNumber: "",
      minimum_bid: ""
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3, "Must be 3 characters").max(12, "max 12 characters long").required("Required"),
      proof: Yup.string().required("Required"),
      description: Yup.string()
        .min(20, "Must be 20 characters")
        .required("Required"),
      category: Yup.string().required("Required"),
      price: Yup.string()
        .matches(/^[0-9\b]+$/, "number only")
        .required("Required"),
      end_time: Yup.string().required("Required"),
      contactNumber: Yup.string()
        .min(10, "Phone number is not valids")
        .max(13, "Phone number is not valids")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        )
        .required("Required"),
      minimum_bid: Yup.string().matches(/^[0-9\b]+$/, "number only").required("minimum_bid is required")
    }),

    onSubmit: (values) => {
      sendToDatabase(values);
    },
  });

  const [pic, setPic] = useState(null);
  const [checkImage, setCheckImage] = useState("");

  const sendToDatabase = (values) => {
    if (pic != null) {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("image", pic);
      formData.append("description", values.description);
      formData.append("proof", values.proof);
      formData.append("category", values.category);
      formData.append("price", values.price);
      formData.append("end_date", values.end_date);
      formData.append("end_time", values.end_time);
      formData.append("contact_number", values.contactNumber);
      formData.append("minimum_bid", values.minimum_bid);

      axios
        .post("http://localhost:3301/product/addAuction",formData,{ withCredentials: true })
        .then((res) => {
          console.log("Data inserted");
          alert("Data succesfully Inserted");
        })
        .catch((err) => {
          console.log("error came")
        });
    } else {
      setCheckImage("image required");
    }
  };

  return (
    <>
    <NavBar/>
    <p.root>
      <p.div>
        <p.addSellForm>
          <p
            style={{
              marginBottom: "3rem",
              marginTop: "-0.9rem",
              color: "#10162f",
              fontSize: "2rem"
            }}
          >
            Add Auction
          </p>
          <p.part>
            <p>Title</p>
            {formik.touched.title && formik.errors.title ? (
              <TextField
                id="title"
                className="title"
                variant="outlined"
                error
                label={formik.errors.title}
                {...formik.getFieldProps("title")}
              />
            ) : (
              <TextField
                id="title"
                className="title"
                label="Title"
                variant="outlined"
                {...formik.getFieldProps("title")}
              />
            )}
          </p.part>

          <p.part>
            <p>Image</p>
            <input style={{marginRight: "21.7em", font: "1.5em"}} name="image" type="file" onChange={(e) => {
              setPic(e.target.files[0]);
            }} />
          </p.part>

          <p.part>
            <p>Proof of legitimacy</p>
            {formik.touched.title && formik.errors.title ? (
              <TextField
                id="proof"
                className="title"
                variant="outlined"
                error
                label={formik.errors.proof}
                {...formik.getFieldProps("proof")}
              />
            ) : (
              <TextField
                id="proof"
                className="title"
                label="proof"
                variant="outlined"
                {...formik.getFieldProps("proof")}
              />
            )}
          </p.part>

          <p.part>
            <p>Description</p>
            {formik.touched.description && formik.errors.description ? (
              <TextField
                id="description"
                className="Description"
                multiline
                rows={5}
                variant="outlined"
                error
                label={formik.errors.description}
                {...formik.getFieldProps("description")}
              />
            ) : (
              <TextField
                id="description"
                className="Description"
                label="Description"
                multiline
                rows={5}
                variant="outlined"
                {...formik.getFieldProps("description")}
              />
            )}
          </p.part>
          <p.part>
            <p style={{ marginRight: "11rem" }}>Category</p>
            <FormControl fullWidth>
              {formik.touched.category && formik.errors.category ? (
                <>
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ color: "#D32F2F" }}
                  >
                    Required
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    error
                    className="category"
                    label="Category"
                    {...formik.getFieldProps("category")}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Antiques">Antiques</MenuItem>
                    <MenuItem value="Currency">Currency</MenuItem>
                    <MenuItem value="Services">Services</MenuItem>
                    <MenuItem value="Watches">Watches</MenuItem>
                    <MenuItem value="Collectibles">Collectibles</MenuItem>
                    <MenuItem value="Phones">Phones</MenuItem>
                    <MenuItem value="Celebrity Ownings">Celebrity ownings</MenuItem>
                    <MenuItem value="Paintings">Painting</MenuItem>
                    <MenuItem value="Books">Books</MenuItem>
                    <MenuItem value="Instruments">Instruments</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </>
              ) : (
                <>
                  <InputLabel id="demo-simple-select-label">Select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-selecl"
                    className="category"
                    label="Category"
                    {...formik.getFieldProps("category")}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Antiques">Antiques</MenuItem>
                    <MenuItem value="Currency">Currency</MenuItem>
                    <MenuItem value="Services">Services</MenuItem>
                    <MenuItem value="Watches">Watches</MenuItem>
                    <MenuItem value="Collectibles">Collectibles</MenuItem>
                    <MenuItem value="Phones">Phones</MenuItem>
                    <MenuItem value="Celebrity Ownings">Celebrity ownings</MenuItem>
                    <MenuItem value="Paintings">Painting</MenuItem>
                    <MenuItem value="Books">Books</MenuItem>
                    <MenuItem value="Instruments">Instruments</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </>
              )}
            </FormControl>
          </p.part>

          <p.part>
            <p>Start Price</p>
            {formik.touched.price && formik.errors.price ? (
              <TextField
                id="price"
                className="Price"
                variant="outlined"
                error
                label={formik.errors.price}
                {...formik.getFieldProps("price")}
              />
            ) : (
              <TextField
                id="price"
                className="Price"
                label="(Rs) Price"
                variant="outlined"
                {...formik.getFieldProps("price")}
              />
            )}
          </p.part>
          <p.part>
            <p>Auction End date</p>
            {formik.touched.end_date && formik.errors.end_date ? (
              <input
                id="end_date"
                className="UsedDuration"
                type="date"
                variant="outlined"
                error
                label={formik.errors.end_date}
                {...formik.getFieldProps("end-date")}
              />
            ) : (
              <input
                id="end_date"
                className="UsedDuration"
                type="date"
                label="end_date"
                variant="outlined"
                {...formik.getFieldProps("end_date")}
              />
            )}
          </p.part>
          <p.part>
            <p>Auction End time</p>
            {formik.touched.end_time && formik.errors.end_time? (
              <TextField
                id="end_time"
                className="title"
                variant="outlined"
                error
                label={formik.errors.end_time}
                {...formik.getFieldProps("end_time")}
              />
            ) : (
              <TextField
                id="end_time"
                className="title"
                label="Time"
                variant="outlined"
                {...formik.getFieldProps("end_time")}
              />
            )}
          </p.part>
          <p.part>
            <p>Contact Number</p>
            {formik.touched.contactNumber && formik.errors.contactNumber ? (
              <TextField
                id="contactNumber"
                className="contactNumber"
                variant="outlined"
                error
                label={formik.errors.contactNumber}
                {...formik.getFieldProps("contactNumber")}
              />
            ) : (
              <TextField
                id="contactNumber"
                className="contactNumber"
                label="Contact Number"
                variant="outlined"
                {...formik.getFieldProps("contactNumber")}
              />
            )}
          </p.part>
          <p.part>
            <p>Minimum bid</p>
            {formik.touched.minimum_bid && formik.errors.minimum_bid ? (
              <TextField
                id="minimum_bid"
                className="location"
                variant="outlined"
                error
                label={formik.errors.minimum_bid}
                {...formik.getFieldProps("minimum_bid")}
              />
            ) : (
              <TextField
                id="minimum_bid"
                className="location"
                label="minimum bid"
                variant="outlined"
                {...formik.getFieldProps("minimum_bid")}
              />
            )}
          </p.part>
          <p.part>
            <Button
              className="addbutton"
              onClick={formik.handleSubmit}
              // onClick={()=>customAlert.current.success("good boy")}

              variant="outlined"
            >
              Add
            </Button>
          </p.part>
        </p.addSellForm>
      </p.div>
    </p.root>
    </>
    
  );
};

export default AuctionAdd;