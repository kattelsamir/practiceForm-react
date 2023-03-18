import "./App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Form = () => {
  const notify = () => toast.success("Form Submitted Successfully");
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email().required("Email is required"),
    age: yup.number().positive().integer().min(18).required().typeError("Please enter your age"),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match")
      .required("This field is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    notify();
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Full Name..." {...register("fullName")} />
        {errors.fullName ? <p className="error">{errors.fullName.message}</p> : <></>}
        <input type="text" placeholder="Email..." {...register("email")} />
        {errors.email ? <p className="error">{errors.email.message}</p> : <></>}
        <input type="number" placeholder="Age..." {...register("age")} />
        {errors.age ? <p className="error">{errors.age.message}</p> : <></>}
        <input type="password" placeholder="Password..." {...register("password")} />
        {errors.password ? <p className="error">{errors.password.message}</p> : <></>}
        <input type="password" placeholder="Confirm Password..." {...register("confirmPassword")} />
        {errors.confirmPassword ? <p className="error">{errors.confirmPassword.message}</p> : <></>}
        <input type="submit" className="submit-btn" />
      </form>
    </div>
  );
};
