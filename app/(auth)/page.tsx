"use client";
import { Button, Divider, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorType, FormType } from "../../types";
import { loginUser } from "@/serverActions/userActions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { register, handleSubmit } = useForm<FormType>();
  const router = useRouter();
  const [error, setError] = useState<ErrorType>({
    isError: false,
    message: null,
    status: null,
  });

  const loginHandler: SubmitHandler<FormType> = async (data) => {
    const result = await loginUser(data);
    if (result.status === 200) {
      console.log("User logged in successfully");
      router.push(`/posts`);
    } else if (result.status === 404) {
      console.log("User not found");
      setError({
        isError: true,
        message: result.message,
        status: result.status,
      });
    }
  };

  const removeError = () => {
    setError({
      isError: false,
      message: null,
      status: null,
    });
  };

  return (
    <section className="flex flex-col gap-10 justify-center items-center p-3 h-screen bg-white dark:bg-gray-800">
      <div className="flex flex-col justify-center items-center py-8 px-10 w-96 border-black dark:border-white border-[0.1px]">
        <div>
          <Image
            className="hidden dark:block"
            src="/Instagram-dark.png"
            alt="instagram writing image"
            width={200}
            height={100}
          />
          <Image
            className="block dark:hidden"
            src="/Instagram.png"
            alt="instagram writing image"
            width={200}
            height={100}
          />
        </div>
        {/* Input sections */}
        <div className="flex flex-col gap-3 justify-center items-center mt-10">
          <TextField
            label="Phone number, username, or email"
            variant="outlined"
            className="placeholder-black bg-white border dark:placeholder-white dark:text-white dark:bg-transparent"
            size="small"
            type={"text" || "number" || "email"}
            fullWidth
            InputLabelProps={{ style: { color: "gray", fontSize: "14px" } }}
            inputProps={{ style: { color: "gray" } }}
            {...register("email", { required: true })}
            onFocus={removeError}
          />
          <TextField
            label="password"
            variant="outlined"
            className="placeholder-black bg-white border dark:placeholder-white dark:text-white dark:bg-transparent"
            size="small"
            type="password"
            fullWidth
            InputLabelProps={{ style: { color: "gray", fontSize: "14px" } }}
            inputProps={{ style: { color: "gray" } }}
            {...register("password", { required: true })}
            onFocus={removeError}
          />
        </div>

        {error.isError && (
          <span className="mt-1 text-xs text-red-500">
            Username and password are wrong!
          </span>
        )}

        <div className="mt-8">
          <Button
            variant="contained"
            color="primary"
            className="font-bold bg-blue-500"
            onClick={handleSubmit(loginHandler)}
          >
            Login
          </Button>
        </div>
        <Divider
          flexItem
          orientation="horizontal"
          className="mt-4 bg-gray-400"
        />

        <div className="flex justify-center items-center">
          <Image
            src="/facebook.png"
            alt="facebook logo"
            width={18}
            height={18}
          />
          <div className="inline-flex justify-center items-center pt-1 pl-2">
            <Link href="/404">
              <Typography
                variant="subtitle1"
                gutterBottom={false}
                className="text-black dark:text-white"
              >
                Login with facebook
              </Typography>
            </Link>
          </div>
        </div>
        <Typography
          variant="subtitle2"
          style={{ marginTop: "10px" }}
          className="text-black dark:text-white"
        >
          forgot password?
        </Typography>
      </div>

      <div className="flex flex-col justify-center items-center py-8 px-10 w-96 border-black dark:border-white border-[0.1px]">
        <Typography
          variant="subtitle1"
          style={{ marginTop: "10px" }}
          className="text-black dark:text-white"
        >
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </Typography>
      </div>
    </section>
  );
}
