import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-red-600">403</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Access denied</h2>
        <p className="mt-2 text-gray-600">
          Your role does not have permission to view this page.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 cursor-pointer"
        >
          Back to dashboard
        </Link>
      </main>
    </div>
  );
}
