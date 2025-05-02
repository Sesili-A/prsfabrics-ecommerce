import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
<<<<<<< HEAD
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
=======
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
  email: "",
  password: "",
};

<<<<<<< HEAD
function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
=======
function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
<<<<<<< HEAD
    dispatch(registerUser(formData)).then((data) => {
=======

    dispatch(loginUser(formData)).then((data) => {
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
<<<<<<< HEAD
        navigate("/auth/login");
=======
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

<<<<<<< HEAD
  console.log(formData);

=======
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
<<<<<<< HEAD
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
=======
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
          </Link>
        </p>
      </div>
      <CommonForm
<<<<<<< HEAD
        formControls={registerFormControls}
        buttonText={"Sign Up"}
=======
        formControls={loginFormControls}
        buttonText={"Sign In"}
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

<<<<<<< HEAD
export default AuthRegister;
=======
export default AuthLogin;
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
