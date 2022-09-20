import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      {/* begin::kotak */}
      <div className="bg-white rounded-3xl shadow-lg py-6 px-6">
        <div className="card-header py-2 px-4 border-b-2 border-slate-300 rounded-sm">
          <h1 className="font-bold text-2xl text-center">Login</h1>
        </div>
        <div className="card-body py-2 px-4">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-none"
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
              <a
                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-sm mt-3">
            Don't have any account? Please{" "}
            <Link className="text-blue-500" to="/register">
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
