import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto flex flex-col justify-between h-[500px] shadow-md rounded-xl overflow-hidden">
      <div className="w-full h-[250px]">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover"
        />
      </div>
<CardContent className="flex flex-col flex-grow-0 px-4 pt-1 pb-2">
  <h2 className="text-xl font-bold mb-1 line-clamp-2">{product?.title}</h2>

  <div className="flex justify-between items-center mb-1">
    <span
      className={`${
        product?.salePrice > 0 ? "line-through" : ""
      } text-lg font-semibold text-primary`}
    >
      ₹{product?.price}
    </span>
    {product?.salePrice > 0 && (
      <span className="text-lg font-bold">
        ₹{product?.salePrice}
      </span>
    )}
  </div>
</CardContent>

      <CardFooter className="flex justify-between px-4 pb-14">
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
          className="w-[48%]"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(product?._id)}
          className="w-[48%]"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
