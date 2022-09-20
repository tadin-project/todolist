import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { client } from "../../app/api/client";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitRegister = async (e) => {
    e.preventDefault();
    if (formData.username.trim() === "" || formData.username === null) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Username harus diisi!",
      });
      return;
    }

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

    if (
      formData.confirmPassword.trim() === "" ||
      formData.confirmPassword === null
    ) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Konfirmasi Password harus diisi!",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Konfirmasi Password harus sama dengan password!",
      });
      return;
    }

    await client()
      .post("/api/users/register", {
        email: formData.email,
        name: formData.username,
        password: formData.password,
      })
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            text: "Berhasil mendaftar. Silahkan Login!",
            title: "Success",
            showConfirmButton: false,
            timer: 1500,
          });
          setFormData(() => {
            return {
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
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
        Swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
        });
      });
  };

  const onChangeContent = (e) => {
    setFormData((d) => {
      return { ...d, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="flex justify-center items-center bg-slate-100">
      {/* begin::kotak */}
      <div className="bg-white rounded-3xl shadow-lg py-6 px-6 my-6">
        <div className="card-header py-2 px-4 border-b-2 border-slate-300 rounded-sm">
          <h1 className="font-bold text-2xl text-center">Register</h1>
        </div>
        <div className="card-body py-2 px-4">
          <form onSubmit={submitRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={onChangeContent}
                value={formData.username}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={onChangeContent}
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
                onChange={onChangeContent}
                value={formData.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={onChangeContent}
                value={formData.confirmPassword}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-none"
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-sm mt-3">
            Have an account? Please{" "}
            <Link className="text-blue-500" to="/">
              login
            </Link>
          </p>
        </div>
      </div>
      {/* end::kotak */}
    </div>
  );
};

export default RegisterPage;
