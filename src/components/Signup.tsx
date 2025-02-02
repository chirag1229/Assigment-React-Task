import { useState, ChangeEvent, FormEvent } from "react";
import { User, Mail, Lock } from "lucide-react";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router';

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [form, setForm] = useState<FormData>({ username: "", email: "", password: "" });
  const [error, setError] = useState<string>("");
  const navigation = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    if (existingUsers.some((user: { email: string }) => user.email === form.email)) {
      setError("Email already registered! Please use a different email.");
      return;
    }

    // Add new user to the list
    const updatedUsers = [...existingUsers, form];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    console.log("User registered:", form);
    alert("Signup successful! You can now log in.");
    navigation("/login");

    // Reset form after successful signup
    setForm({ username: "", email: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create an Account
        </h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Sign Up
          </Button>
        </form>

        {LoginRedirect()}
      </div>
    </div>
  );
}

const LoginRedirect = () => {
  const navigate = useNavigate();

  return (
    <p className="text-center text-gray-500 mt-4">
      Already have an account?{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-blue-500 hover:underline cursor-pointer"
      >
        Login
      </span>
    </p>
  );
};
