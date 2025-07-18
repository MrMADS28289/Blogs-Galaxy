"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/app/jotaiAtoms";
import { loginUser, googleSignInUser } from "@/utils/authApi";
import { toast } from "sonner";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [, setUser] = useAtom(userAtom);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Attempt to log in the user with the provided email and password.
      const data = await loginUser(formData);
      setUser(data); // If successful, store the user data in our global state.
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const backendResponse = await googleSignInUser({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
      });
      setUser(backendResponse);
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="custom-bg w-full max-w-md space-y-8 rounded-lg p-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Sign in to your account
          </h2>
        </div>
        {error && (
          <div className="mb-4 text-center text-sm text-red-500">{error}</div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-orange-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-orange-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="custom-bg group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div>
          {/* The Google Sign-in button. */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="custom-bg group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Sign in with Google
          </button>
        </div>

        <div className="text-center text-sm">
          <Link
            href="/register"
            className="font-medium text-white hover:text-orange-500"
          >
            Don&apos;t have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
