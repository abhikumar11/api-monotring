"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useLogin } from "@/hooks/auth/useAuth";
import { useRegister } from "@/hooks/auth/useAuth";
import { setUser } from "@/store/slices/authSlice";
import { toast } from "react-toastify";

interface AuthFormInputs {
  name?: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  mode: "login" | "register";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>();

  const onSubmit: SubmitHandler<AuthFormInputs> = (
    data
  ) => {
    if (isLogin) {
      loginMutation.mutate(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: (response) => {
            toast.success("Login successful");
            dispatch(setUser(response.user));

            router.push("/dashboard");
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message ||
                "Login failed. Please try again."
            );
          }
        }
      );

      return;
    }

    registerMutation.mutate(
      {
        name: data.name!,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          toast.success("Registration successful");
          dispatch(setUser(response.user));
          router.push("/dashboard");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              "Registration failed. Please try again."
          );
        }
      }
    );
  };

  const isPending =
    loginMutation.isPending ||
    registerMutation.isPending;

  const errorMessage =
    loginMutation.error ||
    registerMutation.error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">

         
          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-600/20">
              {isLogin ? "L" : "R"}
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {isLogin
                ? "Welcome back"
                : "Create your account"}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {isLogin
                ? "Sign in to your account to continue"
                : "Create an account to get started"}
            </p>

          </div>

          
          <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >

            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                  {...register("name", {
                    required:
                      "Name is required",
                  })}
                />

                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
                {...register("email", {
                  required:
                    "Email is required",
                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:
                      "Enter a valid email address",
                  },
                })}
              />

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                {isLogin && (
                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "/forgot-password"
                      )
                    }
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                )}

              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full rounded-lg border bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                  {...register("password", {
                    required:
                      "Password is required",
                    minLength: !isLogin
                      ? {
                          value: 8,
                          message:
                            "Password must be at least 8 characters",
                        }
                      : undefined,
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m7.538-1.15a3.375 3.375 0 01-3.957 3.957m4.37-8.457a10.03 10.03 0 015.801 16.72m-15.148-5.441a10.054 10.054 0 0011.783-4.733M9.172 16.172a4 4 0 015.656 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7C7.523 19 3.732 16.057 2.458 12z" />
                    </svg>
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me - Login only */}
            {isLogin && (
              <div className="flex items-center">

                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-slate-600"
                >
                  Remember me
                </label>

              </div>
            )}

        
            {errorMessage && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {(
                  errorMessage as any
                )?.response?.data?.message ||
                  "Something went wrong. Please try again."}
              </div>
            )}

           
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? isLogin
                  ? "Logging in..."
                  : "Creating account..."
                : isLogin
                  ? "Login"
                  : "Create account"}
            </button>

          </form>

          
          <p className="mt-6 text-center text-sm text-slate-500">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}

            <button
              type="button"
              onClick={() =>
                router.push(
                  isLogin
                    ? "/register"
                    : "/"
                )
              }
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              {isLogin
                ? "Create account"
                : "Login"}
            </button>

          </p>

        </div>
      </div>
    </div>
  );
};

export default AuthForm;