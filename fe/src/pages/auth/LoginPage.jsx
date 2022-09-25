import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { client } from "../../app/api/client";
import { RegisterPageTitle } from "../../app/const";
import { login } from "../../features/auth/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeInput = (e) => {
    setFormData((dt) => {
      return { ...dt, [e.target.name]: e.target.value };
    });
  };

  const prosesLogin = async (e) => {
    e.preventDefault();
    if (formData.email.trim() === "" || formData.email === null) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Email harus diisi!",
      });
      return;
    }

    if (formData.password.trim() === "" || formData.password === null) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Password harus diisi!",
      });
      return;
    }

    await client()
      .post("/api/users", {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const dt = res.data;
          dispatch(
            login({
              email: dt.email,
              name: dt.name,
              token: dt.token,
            })
          );
          Swal.fire({
            icon: "success",
            text: "Berhasil Login!",
            title: "Success",
            showConfirmButton: false,
            timer: 1500,
          });
          setFormData(() => {
            return {
              email: "",
              password: "",
            };
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Gagal mendaftar. Silahkan hubungi Admin!",
            title: "Error!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      {/* begin::kotak */}
      <div className="bg-white rounded-3xl shadow-lg py-6 px-6">
        <div className="card-header py-2 px-4 border-b-2 border-slate-300 rounded-sm">
          <h1 className="font-bold text-2xl text-center">Login</h1>
        </div>
        <div className="card-body py-2 px-4">
          <form onSubmit={prosesLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={changeInput}
                value={formData.email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={changeInput}
                value={formData.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-none"
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              {/* <a
                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a> */}
            </div>
          </form>
          <p className="text-sm mt-3">
            Don't have any account? Please{" "}
            <Link className="text-blue-500" to={RegisterPageTitle}>
              Register
            </Link>
          </p>
        </div>
      </div>
      {/* end::kotak */}
    </div>
  );
};

export default LoginPage;
