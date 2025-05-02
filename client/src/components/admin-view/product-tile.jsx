import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const fallbackImage = "/no-image-available.png"; // You can replace this with a proper placeholder path

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image || fallbackImage}
            alt={product?.title || "Product Image"}
            className="w-full h-[300px] object-cover rounded-t-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
        </div>

        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">
            {product?.title || "Untitled Product"}
          </h2>

          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price?.toFixed(2) || "0.00"}
            </span>

            {product?.salePrice > 0 && (
              <span className="text-lg font-bold">
                ${product.salePrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(product._id)}>
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
