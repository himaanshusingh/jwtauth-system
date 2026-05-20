import React from "react";
import { Link } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

function DashboardContent() {
  const { user, role } = useAuth();

  const cards = [
    { title: "User Area", to: "/user", roles: ["user", "manager", "admin"], color: "bg-blue-500" },
    { title: "Manager Area", to: "/manager", roles: ["manager", "admin"], color: "bg-purple-500" },
    { title: "Admin Area", to: "/admin", roles: ["admin"], color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.fullName || user?.email}</h1>
          <p className="mt-2 text-gray-600">
            Your role: <span className="font-semibold uppercase">{role}</span>
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {cards.map((c) => {
            const allowed = role && c.roles.includes(role);
            return (
              <Link
                key={c.to}
                to={allowed ? c.to : "/unauthorized"}
                className={`block rounded-xl p-6 text-white shadow transition ${c.color} ${
                  allowed ? "hover:opacity-90 cursor-pointer" : "opacity-50"
                }`}
              >
                <h3 className="text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-white/90">
                  {allowed ? "Access granted" : "Restricted"}
                </p>
                <p className="mt-3 text-xs uppercase tracking-wide text-white/80">
                  Allowed: {c.roles.join(", ")}
                </p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
