import React, { useState } from "react";
import { Button, Card, Divider, IconButton, Snackbar } from "@mui/material";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Box, Modal, Grid, TextField } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const items = [1, 1];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be 6 digits"),
  city: Yup.string().required("City is required"),
});

const Cart = () => {
  const createOrderUsingSelectedAddress = () => {};

  const [open, setOpen] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const handleOpenAddressModal = () => setOpenAddressModal(!openAddressModal);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div>
      <main className="lg:flex justify-between">
        <section className="lg:w[30%] space-y-6 lg:min-h-screen pt-10">
          {items.map((item, index) => (
            <CartItem key={index} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Deliver Fee</p>
                <p>₹21</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Platform Fee</p>
                <p>₹5</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant Charges</p>
                <p>₹33</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Total Pay</p>
              </div>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section>
          <div className="text-center font-semibold text-2xl">
            <h1>Choose Delivery Address</h1>
          </div>
          <div className="flex gap-5 flex-wrap justify-center">
            {[1, 1, 1, 1].map((item, index) => (
              <AddressCard
                key={index}
                handleSelectAddress={createOrderUsingSelectedAddress}
                item={item}
                showButton={true}
              />
            ))}
            <Card className="flex space-x-5 w-64 p-5">
              <AddLocationAltIcon />
              <div className="space-y-3 text-gray-500">
                <h1>Add New Address</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Laborum quasi, molestiae vero porro delectus aliquid ex,
                </p>
                <Button
                  onClick={handleOpenAddressModal} // Appel de la fonction pour ouvrir le modal
                  variant="outlined"
                  className="w-full"
                >
                  Add
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Modal pour ajouter une nouvelle adresse */}
      <Modal open={openAddressModal} onClose={handleOpenAddressModal}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      name="streetAddress"
                      as={TextField}
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      error={!!touched.streetAddress && !!errors.streetAddress}
                      helperText={
                        <ErrorMessage name="streetAddress">
                          {(msg) => <span className="text-red-600">{msg}</span>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="state"
                      as={TextField}
                      label="State"
                      fullWidth
                      variant="outlined"
                      error={!!touched.state && !!errors.state}
                      helperText={
                        <ErrorMessage name="state">
                          {(msg) => <span className="text-red-600">{msg}</span>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="pincode"
                      as={TextField}
                      label="Pincode"
                      fullWidth
                      variant="outlined"
                      error={!!touched.pincode && !!errors.pincode}
                      helperText={
                        <ErrorMessage name="pincode">
                          {(msg) => <span className="text-red-600">{msg}</span>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="city"
                      as={TextField}
                      label="City"
                      fullWidth
                      variant="outlined"
                      error={!!touched.city && !!errors.city}
                      helperText={
                        <ErrorMessage name="city">
                          {(msg) => <span className="text-red-600">{msg}</span>}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Deliver Here
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
