import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../features/auth/authSlice";
import Sidebar from "./navigator/Sidebar";

const CorePage = ({ children }) => {
  const dispatch = useDispatch();

  const prosesLogout = async () => {
    Swal.fire({
      title: "Warning?",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        Swal.fire("Success!", "Anda berhasil logout!", "success");
      }
    });
  };
  return (
    <div className="h-screen flex flex-row">
      <Sidebar logoutFunction={prosesLogout} />
      <div>{children}</div>
    </div>
  );
};

export default CorePage;
