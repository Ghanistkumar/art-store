"use client";
import useCart from "../utils/cart-store";
import useUserStore from "../utils/user-store";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Navbar } from "@/components";
import { TextField, Button, FormControl, FormHelperText } from "@mui/material";
import { placeOrder, sendOrderDetails } from "../lib/actions";
import Swal from "sweetalert2";
import { Suspense } from "react";
import { PaymentRes } from "../../../type";
import { useRouter } from "next/navigation";

type obj<E> = {
  value: E;
  error: boolean;
};

export default function Page() {
  const cart = useCart();
  const user = useUserStore();
  const router = useRouter();
  const [isRazorpayLoading, setIsRazorpayLoading] = useState<boolean>(true);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string>("");

  const DEFAULT_FORM_STATE = {
    firstName: { value: "", error: false },
    lastName: { value: "", error: false },
    phoneNumber: { value: "", error: false },
    email: { value: "", error: false },
    addressLine1: { value: "", error: false },
    addressLine2: { value: "", error: false },
    pincode: { value: "", error: false },
    state: { value: "", error: false },
  };

  const [formData, setFormData] = useState<{
    firstName: obj<string>;
    lastName: obj<string>;
    phoneNumber: obj<string>;
    email: obj<string>;
    addressLine1: obj<string>;
    addressLine2: obj<string>;
    pincode: obj<string>;
    state: obj<string>;
  }>(DEFAULT_FORM_STATE);

  const totalPayment = cart.items.reduce(
    (total: number, item: any) => total + parseInt(item.price),
    0
  );
  useEffect(() => {
    const loadScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        setIsRazorpayLoading(false);
      };
      document.body.appendChild(script);
    };

    if (!window.Razorpay) {
      loadScript();
    } else {
      setIsRazorpayLoading(false);
    }
  }, []);
  const onCheckout = async (e: any) => {
    if (formData.firstName.value === "") {
      setFormData({
        ...formData,
        firstName: {
          value: "",
          error: true,
        },
      });
      return;
    } else if (formData.lastName.value === "") {
      setFormData({
        ...formData,
        lastName: {
          value: "",
          error: true,
        },
      });
      return;
    } else if (formData.phoneNumber.value === "") {
      setFormData({
        ...formData,
        phoneNumber: {
          value: "",
          error: true,
        },
      });
      return;
    } else if (formData.email.value === "") {
      setFormData({
        ...formData,
        email: {
          value: "",
          error: true,
        },
      });
      return;
    } else if (formData.addressLine1.value === "") {
      setFormData({
        ...formData,
        addressLine1: {
          value: "",
          error: true,
        },
      });
      return;
    } else if (formData.pincode.value === "") {
      setFormData({
        ...formData,
        pincode: {
          value: "",
          error: true,
        },
      });
      return;
    } else if (formData.state.value === "") {
      setFormData({
        ...formData,
        state: {
          value: "",
          error: true,
        },
      });
      return;
    }

    const response = await fetch("https://art-store-ju16.onrender.com/order", {
      method: "POST",
      body: JSON.stringify({
        amount: totalPayment * 100,
        currency: "INR",
        receipt: "rec#1",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    var options = {
      key: "rzp_test_wWb6Mi28PgLWik",
      amount: totalPayment * 100,
      currency: "INR",
      name: "RachanaSutraa",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: async function (response: any) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "https://art-store-ju16.onrender.com/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const paymentValid = await validateRes.json();
        const shippingAddress =
          formData.addressLine1.value +
          ", " +
          formData.addressLine2.value +
          ", " +
          formData.pincode.value +
          ", " +
          formData.state.value;
        if (paymentValid.msg === "success") {
          //saves current user order details with shipping add
          const currentOrder = await placeOrder(
            shippingAddress,
            user.user_id === ""
              ? "42e2f02c-0dcb-4b05-bfad-4c224adcceaf" //guest user
              : user.user_id,
            totalPayment
          );

          if (currentOrder?.order_id) {
            const products = cart.items;
            for (var i = 0; i < products.length; i++) {
              console.log(products[0].product_id);
              const res = await sendOrderDetails(
                currentOrder.order_id,
                products[`${i}`].product_id.toString(),
                0,
                products[`${i}`].price,
                paymentValid.paymentId
              );
            }
          }
          Swal.fire({
            title: "Thank You!",
            text: "Order Details Sent on Mail!!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              cart.removeAll();
              router.push("/");
            }
          });
        }
      },
      prefill: {
        name: `${formData.firstName.value}`,
        email: `${formData.email.value}`,
        contact: `${formData.phoneNumber.value}`,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response: PaymentRes) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      Swal.fire({
        title: "Error!",
        text: `${response.error.reason}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    });

    rzp1.open();
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <Suspense fallback={<p>Loading...</p>}>
        {cart?.items && cart.items.length === 0 ? (
          <div className="flex justify-center m-24">
            <div className="flex flex-1 justify-center md:w-1/3 bg-slate-100 rounded-xl p-5 m-5 shadow-lg">
              No Items in Cart :(
            </div>
          </div>
        ) : (
          <div className="container mx-auto flex flex-col md:flex-row justify-between mt-5 p-4 md:p-8">
            <div className="flex flex-col justify-evenly md:w-2/3 bg-slate-100 rounded-xl p-5 m-5 shadow-lg gap-y-4">
              <h2 className="font-bold text-xl mb-4">Shipping Details</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <FormControl fullWidth className="md:flex-1">
                  <TextField
                    error={formData.firstName.error}
                    id="outlined-error"
                    label="First Name"
                    value={formData.firstName.value}
                    fullWidth
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        firstName: {
                          value: e.target.value.trim(),
                          error: false,
                        },
                      });
                    }}
                    required
                    className="text-black"
                  />
                  {formData.firstName.error && (
                    <FormHelperText className="text-red-500">
                      Please Enter First Name
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth className="md:flex-1">
                  <TextField
                    error={formData.lastName.error}
                    id="outlined-error"
                    label="Last Name"
                    value={formData.lastName.value}
                    fullWidth
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        lastName: {
                          value: e.target.value.trim(),
                          error: false,
                        },
                      });
                    }}
                    required
                  />
                  {formData.lastName.error && (
                    <FormHelperText className="text-red-500">
                      Please Enter Last Name
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <FormControl fullWidth className="md:flex-1">
                  <TextField
                    error={formData.phoneNumber.error}
                    id="outlined-error"
                    label="Phone Number"
                    value={formData.phoneNumber.value}
                    fullWidth
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        phoneNumber: {
                          value: e.target.value.trim(),
                          error: false,
                        },
                      });
                    }}
                    required
                  />
                  {formData.phoneNumber.error && (
                    <FormHelperText className="text-red-500">
                      Please Enter Phone Number
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth className="md:flex-1">
                  <TextField
                    error={formData.email.error}
                    id="outlined-error"
                    label="Email"
                    value={formData.email.value}
                    fullWidth
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        email: {
                          value: e.target.value.trim(),
                          error: false,
                        },
                      });
                    }}
                    required
                  />
                  {formData.email.error && (
                    <FormHelperText className="text-red-500">
                      Please Enter Email
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <FormControl fullWidth className="md:flex-1">
                <TextField
                  error={formData.addressLine1.error}
                  id="outlined-error"
                  label="Address Line 1"
                  value={formData.addressLine1.value}
                  fullWidth
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      addressLine1: {
                        value: e.target.value,
                        error: false,
                      },
                    });
                  }}
                  required
                />
                {formData.addressLine1.error && (
                  <FormHelperText className="text-red-500">
                    Please Enter Address Line 1
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="md:flex-1">
                <TextField
                  error={formData.addressLine2.error}
                  id="outlined-error"
                  label="Address Line 2"
                  value={formData.addressLine2.value}
                  fullWidth
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      addressLine2: {
                        value: e.target.value,
                        error: false,
                      },
                    });
                  }}
                  required
                />
                {formData.addressLine2.error && (
                  <FormHelperText className="text-red-500">
                    Please Enter Address Line 2
                  </FormHelperText>
                )}
              </FormControl>
              <div className="flex flex-col md:flex-row gap-4">
                <FormControl fullWidth className="md:flex-1">
                  <TextField
                    error={formData.pincode.error}
                    id="outlined-error"
                    label="Pincode"
                    value={formData.pincode.value}
                    fullWidth
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        pincode: {
                          value: e.target.value,
                          error: false,
                        },
                      });
                    }}
                    required
                  />
                  {formData.pincode.error && (
                    <FormHelperText className="text-red-500">
                      Please Enter Pincode
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth className="md:flex-1">
                  <TextField
                    error={formData.state.error}
                    id="outlined-error"
                    label="State"
                    value={formData.state.value}
                    fullWidth
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        state: {
                          value: e.target.value.trim(),
                          error: false,
                        },
                      });
                    }}
                    required
                  />
                  {formData.state.error && (
                    <FormHelperText className="text-red-500">
                      Please Enter State
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>
            <div className="md:w-1/3 bg-slate-100 rounded-xl p-5 m-5 shadow-lg flex flex-col md:items-start">
              <h2 className="font-bold text-xl mb-4">Order Summary</h2>
              {cart.items.length === 0 ? (
                <p>No Items in cart</p>
              ) : (
                cart.items.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex flex-row sm:flex-row items-start gap-3 justify-between text-black mb-4 p-2 hover:bg-slate-200 rounded"
                  >
                    <Image
                      height={100}
                      width={100}
                      className="aspect-square rounded-md object-cover"
                      src={item.img}
                      alt={item.product_name}
                    />
                    <div className="md:text-left md:ml-4">
                      <p className="text-lg md:text-sm font-semibold">
                        {item.product_name}
                      </p>
                      <p>Price: &#8377;{item.price}</p>
                    </div>
                  </div>
                ))
              )}
              <h2 className="font-bold text-xl mb-4">Price Summary</h2>
              {/* <p className="text-2xl">&#8377;{totalPayment.toFixed(2)}</p> */}

              <button
                type="button"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                onClick={onCheckout}
                disabled={isRazorpayLoading}
              >
                &#8377;{totalPayment.toFixed(2)} Proceed to Pay!!
              </button>
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}
