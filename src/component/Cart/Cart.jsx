import React, { useState, useEffect, Fragment } from "react";
import { Button, Card, Divider, IconButton, Snackbar } from "@mui/material";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Box, Modal, Grid, TextField } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { findCart } from "./../State/Cart/cart.action";
import { isValid } from "./../util/ValidToOrder";
import { createOrder } from "./../State/Order/Action";
import { cartTotal } from "./totalPay";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const items = [1, 1];

export const style = {
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
  const createOrderUsingSelectedAddress = (deliveryAddress) => {
    const data = {
      token: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food.restaurant.id,
        deliveryAddress: {
          fullName: "ashok",
          streetAddress: "gujrat",
          city: "gujrat",
          state: "gujrat",
          postalCode: "599000",
          country: "India",
        },
      },
    };
    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data));
    } else setOpenSnakbar(true);
  };

  const [openSnackbar, setOpenSnakbar] = useState();
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((store) => store);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  console.log("cart ", cart);

  const handleCloseAddressModal = () => {
    setOpenAddressModal(false);
  };

  const handleCloseSankBar = () => setOpenSnakbar(false);

  const handleOpenAddressModal = () => setOpenAddressModal(!openAddressModal);

  useEffect(() => {
    dispatch(findCart(localStorage.getItem("jwt")));
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: "India",
        },
      },
    };
    console.log("data", data);
    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data));
    } else setOpenSnakbar(true);
  };

  return (
    <Fragment>
      {cart.cartItems.length > 0 ? (
        <main className="lg:flex justify-between">
          <section className="lg:w[30%] space-y-6 lg:min-h-screen pt-10">
            {cart.cartItems.map((item, index) => (
              <CartItem item={item} />
            ))}
            <Divider />
            <div className="billDetails px-5 text-sm">
              <p className="font-extralight py-5">Bill Details</p>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <p>Item Total</p>
                  <p>₹{cartTotal(cart.cartItems)}</p>
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
                  <p>₹{cartTotal(cart.cartItems) + 33}</p>
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
              {auth.user?.addresses.map((item, index) => (
                <AddressCard
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
      ) : (
        <div className="flex h-[90vh] justify-center items-center">
          <div className="text-center space-y-5">
            <RemoveShoppingCartIcon sx={{ width: "10rem", height: "10rem" }} />
            <p className="font-bold text-3xl">Your Cart Is Empty</p>
          </div>
        </div>
      )}

      <Modal open={openAddressModal} onClose={handleCloseAddressModal}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="streetAddress"
                    as={TextField}
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("streetAddress")}
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
                    error={!ErrorMessage("state")}
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
                    error={!ErrorMessage("pincode")}
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
                    error={!ErrorMessage("city")}
                    helperText={
                      <ErrorMessage name="city">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
      <Snackbar
        severity="success"
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSankBar}
        message="Please Add Items Only From One Restaurants At time"
      />
    </Fragment>
  );
};

export default Cart;
