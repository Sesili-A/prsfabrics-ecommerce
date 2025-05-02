<<<<<<< HEAD
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
=======
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
<<<<<<< HEAD
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
=======
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product add successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

<<<<<<< HEAD
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

=======
  console.log(formData, "productList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
<<<<<<< HEAD
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
=======
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
            />
          </div>
        </SheetContent>
      </Sheet>
<<<<<<< HEAD
    </>
  );
}
=======
    </Fragment>
  );
}

export default AdminProducts;
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
