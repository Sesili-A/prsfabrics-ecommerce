import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";

import {
  addNewProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct
} from "@/store/admin/products-slice";

const initialFormData = {
  image: "",
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { productList, isLoading } = useSelector((s) => s.adminProducts);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imgLoading, setImgLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // load products on mount
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // when you choose to edit, prefill
  useEffect(() => {
    if (editingId) {
      const prod = productList.find(p => p._id === editingId);
      if (prod) setFormData(prod);
    }
  }, [editingId, productList]);

  function resetForm() {
    setFormData(initialFormData);
    setUploadedImageUrl("");
    setImageFile(null);
    setEditingId(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const payloadData = { ...formData, image: uploadedImageUrl || formData.image };
  
    const thunk = editingId
      ? editProduct({ id: editingId, productData: payloadData })
      : addNewProduct(payloadData);
  
    dispatch(thunk).then(res => {
      const payload = res?.payload;
  
      if (payload && payload.success) {
        toast({ title: editingId ? "Product updated" : "Product added" });
        dispatch(fetchAllProducts());
        resetForm();
        setOpen(false);
      } else {
        toast({
          title: payload?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    });
  };
  

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then(res => {
      const payload = res?.payload;
      if (payload && payload.success) {
        toast({ title: "Deleted" });
        dispatch(fetchAllProducts());
      } else {
        toast({ title: payload?.message || "Delete failed", variant: "destructive" });
      }
    });
  };
  

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => { resetForm(); setOpen(true); }}>
          Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productList.map(prod => (
          <AdminProductTile
            key={prod._id}
            product={prod}
            setFormData={setFormData}
            setCurrentEditedId={setEditingId}
            setOpenCreateProductsDialog={setOpen}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <Sheet open={open} onOpenChange={o => { if (!o) resetForm(); setOpen(o); }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{editingId ? "Edit Product" : "Add Product"}</SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImgLoading}
            imageLoadingState={imgLoading}
            isEditMode={Boolean(editingId)}
          />

          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              buttonText={editingId ? "Save Changes" : "Add Product"}
              isBtnDisabled={!formData.title || imgLoading}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
