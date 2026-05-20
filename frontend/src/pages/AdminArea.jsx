import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-red-600">Admin Area</h1>
          <p className="mt-3 text-gray-700">
            Only Admins can access this highly protected route.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function AdminArea() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Page />
    </ProtectedRoute>
  );
}
