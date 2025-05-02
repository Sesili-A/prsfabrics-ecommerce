<<<<<<< HEAD
// src/pages/shopping-view/paypal-return.jsx
=======
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

<<<<<<< HEAD
export default function PaypalReturnPage() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
=======
function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
<<<<<<< HEAD
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((res) => {
        if (res.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        } else {
          console.error("Payment capture failed", res.payload);
=======

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
<<<<<<< HEAD
        <CardTitle>Processing Payment... Please wait!</CardTitle>
=======
        <CardTitle>Processing Payment...Please wait!</CardTitle>
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
      </CardHeader>
    </Card>
  );
}
<<<<<<< HEAD
=======

export default PaypalReturnPage;
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
