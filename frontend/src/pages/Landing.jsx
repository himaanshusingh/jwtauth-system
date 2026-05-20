import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600">
      <Navbar />
      <main className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-white sm:text-6xl">
          JWT Authentication System
        </h1>
        <p className="mt-4 text-xl text-white/90">
          Role-Based Access Control with MERN Stack
        </p>

        <div className="mt-12 w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900">Features</h2>
          <ul className="mt-6 space-y-3 text-left">
            {[
              "Secure JWT token-based authentication",
              "Three role levels: User, Manager, and Admin",
              "Protected routes with role-based authorization",
              "Responsive design with Tailwind CSS v4",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex gap-4">
          <Link
            to="/login"
            className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 shadow hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-green-500 px-8 py-3 font-semibold text-white shadow hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </main>
    </div>
  );
}
