import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
// You'll need to install these packages:
// npm install canvas-confetti react-confetti --save
import confetti from "canvas-confetti";
import ReactConfetti from "react-confetti";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity,
        0
      )
      : 0;

  function handlePlaceOrder() {
    if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "cash_on_delivery",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      setIsProcessing(false);
      if (data?.payload?.success) {
        toast({
          title: "Order placed successfully!",
          description: "Your order has been placed with Cash on Delivery.",
          variant: "success",
        });
        // Generate a random order number
        const randomOrderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
        setOrderNumber(randomOrderNumber);
        setOrderSuccess(true);

        // Trigger confetti animation
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });

          // Second burst for more celebration
          setTimeout(() => {
            confetti({
              particleCount: 50,
              angle: 60,
              spread: 55,
              origin: { x: 0 }
            });
            confetti({
              particleCount: 50,
              angle: 120,
              spread: 55,
              origin: { x: 1 }
            });
          }, 750);
        }, 300);
      } else {
        toast({
          title: "Failed to place order",
          description: data?.payload?.message || "Please try again later.",
          variant: "destructive",
        });
      }
    });
  }

  if (orderSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-5 text-center relative">
        {/* Full screen confetti */}
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
          colors={['#ffd700', '#ff0000', '#00ff00', '#0000ff', '#ff00ff']}
        />

        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden p-8 border-2 border-green-500 relative z-10">
          {/* Balloon animation */}
          <div className="absolute -top-16 -left-10">
            <div className="animate-bounce">
              <span className="text-6xl">🎈</span>
            </div>
          </div>
          <div className="absolute -top-16 -right-10">
            <div className="animate-bounce" style={{ animationDelay: "0.5s" }}>
              <span className="text-6xl">🎈</span>
            </div>
          </div>

          {/* Party popper emojis */}
          <div className="flex justify-between mb-4">
            <span className="text-4xl">🎉</span>
            <span className="text-4xl">🎊</span>
          </div>

          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-green-600 mb-2">Order Successful!</h1>
          <p className="text-xl font-semibold mb-1">Thank you for your order! 🎂</p>
          <p className="text-gray-600 mb-4">Your order has been placed and will be delivered soon.</p>

          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="text-gray-700">Order Number: <span className="font-bold">{orderNumber}</span></p>
            <p className="text-gray-700">Payment Method: <span className="font-medium">Cash on Delivery</span></p>
            <p className="text-gray-700">Total Amount: <span className="font-bold">${totalCartAmount}</span></p>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => window.location.href = "/orders"}
            >
              View My Orders
            </Button>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = "/"}
            >
              Continue Shopping
            </Button>
          </div>

          {/* Gift emojis */}
          <div className="flex justify-between mt-4">
            <span className="text-4xl">🎁</span>
            <span className="text-4xl">🎁</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" alt="Checkout banner" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
            <div className="border-t pt-4">
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-medium mb-2">Payment Method</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    checked={true}
                    readOnly
                  />
                  <label htmlFor="cod">Cash on Delivery</label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Pay with cash when your order is delivered.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handlePlaceOrder}
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing Order..." : "Place Order (Cash on Delivery)"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;