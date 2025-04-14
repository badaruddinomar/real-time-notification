"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form action="" onSubmit={formSubmitHandler}>
        <input
          type="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-black"
        />
        <input
          type="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-black"
        />
        <Button>Signin</Button>
      </form>
    </div>
  );
};

export default Signin;
