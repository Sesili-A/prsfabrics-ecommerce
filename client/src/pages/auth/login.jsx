import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link, useNavigate } from "react-router-dom";
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
<<<<<<< HEAD
  const { toast } = useToast();
=======
  const toast = useToast(); // ✅ Toast
  const navigate = useNavigate(); // ✅ Navigation hook
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
<<<<<<< HEAD
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
=======
        toast.toast({
          title: data.payload.message,
        });

        // ✅ Redirect based on user role
        const role = data.payload.user?.role;
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/shop");
        }
      } else {
        toast.toast({
          title: data.payload.message || "Login failed",
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
<<<<<<< HEAD
          Don't have an account
=======
          Don't have an account?
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
<<<<<<< HEAD
=======

>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
