import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect to homepage or specific path
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // Handle login form submission
  const onSubmit = (data) => {
    const { email, password } = data;
    
    login(email, password)
      .then((result) => {
        alert("Başarıyla giriş yaptınız!");
        document.getElementById("my_modal_5").close();
        navigate(from, { replace: true });
      })
      .catch(() => {
        setErrorMessage("Lütfen geçerli bir e-posta ve şifre girin!");
      });
  };

  // Google sign-in
  const handleGoogleSignIn = () => {
    signUpWithGmail()
      .then((result) => {
        alert("Google ile başarılı bir şekilde giriş yaptınız!");
        navigate(from, { replace: true });
      })
      .catch((error) => console.error("Google giriş hatası:", error));
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
            <h3 className="font-bold text-lg">Lütfen Giriş Yapın!</h3>

            {/* Email input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">E-posta</span>
              </label>
              <input
                type="email"
                placeholder="E-posta adresinizi girin"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-red-500 text-xs">E-posta gerekli</span>}
            </div>

            {/* Password input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Şifre</span>
              </label>
              <input
                type="password"
                placeholder="Şifrenizi girin"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              {errors.password && <span className="text-red-500 text-xs">Şifre gerekli</span>}
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Şifrenizi mi unuttunuz?
                </a>
              </label>
            </div>

            {/* Error message */}
            {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}

            {/* Submit button */}
            <div className="form-control mt-4">
              <input type="submit" value="Giriş Yap" className="btn bg-green text-white" />
            </div>

            {/* Signup link */}
            <p className="text-center my-2 text-drkGreen">
              Hesabınız yok mu?{" "}
              <Link to="/signup" className="underline  ml-1">
                Kayıt Ol
              </Link>
            </p>

            {/* Close button */}
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          {/* Social sign-in */}
          <div className="text-center space-x-3 mb-5">
            <button
              className="btn btn-circle hover:bg-green hover:text-white"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
