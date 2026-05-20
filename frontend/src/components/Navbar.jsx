import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold">
          JWT Auth
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="rounded px-3 py-2 text-sm hover:bg-blue-700"
              >
                Dashboard
              </Link>
              <span className="hidden text-sm sm:inline">
                {user.email} <span className="ml-1 rounded bg-blue-800 px-2 py-0.5 text-xs uppercase">{role}</span>
              </span>
              <button
                onClick={handleLogout}
                className="rounded bg-red-500 px-4 py-2 text-sm font-medium hover:bg-red-600 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded bg-green-500 px-4 py-2 text-sm font-medium hover:bg-green-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
