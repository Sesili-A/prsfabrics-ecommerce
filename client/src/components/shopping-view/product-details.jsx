import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";  // now exported above
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  // close + clear current productDetails
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails(null));    // clear it out in your slice
    setRating(0);
    setReviewMsg("");
  }

  // …rest of your handlers (add to cart, add review, etc)

  useEffect(() => {
    if (productDetails?._id) {
      dispatch(getReviews(productDetails._id));
    }
  }, [dispatch, productDetails?._id]);

  const averageReview =
    reviews?.length > 0
      ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 …">
        {/* left: product image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* right: details, price, reviews, add-to-cart… */}
        <div>
          <h1 className="text-3xl font-extrabold">
            {productDetails?.title}
          </h1>
          <p className="text-muted-foreground text-2xl mb-5 mt-4">
            {productDetails?.description}
          </p>

          {/* price & salePrice */}
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails.salePrice}
              </p>
            )}
          </div>

          {/* average rating */}
          <div className="flex items-center gap-2 mt-2">
            <StarRatingComponent rating={averageReview} />
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>

          {/* add to cart */}
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  dispatch(
                    addToCart({
                      userId: user?.id,
                      productId: productDetails._id,
                      quantity: 1,
                    })
                  ).then((res) => {
                    if (res.payload.success) {
                      dispatch(fetchCartItems(user.id));
                      toast({ title: "Added to cart!" });
                    }
                  })
                }
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator />

          {/* reviews list + form */}
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            {reviews?.length > 0 ? (
              reviews.map((r) => (
                <div key={r._id} className="flex gap-4 mb-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>
                      {r.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{r.userName}</h3>
                    </div>
                    <StarRatingComponent rating={r.reviewValue} />
                    <p className="text-muted-foreground mt-1">
                      {r.reviewMessage}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}

            {/* write a review */}
            <div className="mt-6 flex flex-col gap-2">
              <Label>Write a review</Label>
              <StarRatingComponent
                rating={rating}
                handleRatingChange={(val) => setRating(val)}
              />
              <Input
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Your thoughts…"
              />
              <Button
                disabled={!reviewMsg.trim()}
                onClick={() =>
                  dispatch(
                    addReview({
                      productId: productDetails._id,
                      userId: user.id,
                      userName: user.userName,
                      reviewMessage: reviewMsg,
                      reviewValue: rating,
                    })
                  ).then((res) => {
                    if (res.payload.success) {
                      setRating(0);
                      setReviewMsg("");
                      dispatch(getReviews(productDetails._id));
                      toast({ title: "Review submitted" });
                    }
                  })
                }
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
