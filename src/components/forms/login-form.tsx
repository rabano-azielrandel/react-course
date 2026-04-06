import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/card";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // store token
      localStorage.setItem("token", data.token);

      //redirect
      navigate("/dashboard");
    } catch (err: any) {
      console.log("Login Error: ", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-84 h-100 bg-primary">
        <CardHeader className="h-24 py-10 px-4">
          <CardTitle
            title="Login"
            className="text-background text-3xl font-semibold"
          />
        </CardHeader>

        <CardContent className="flex flex-col gap-7">
          <Input
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="placeholder:text-background text-background"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="placeholder:text-background text-background"
          />
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button type="submit" className="text-primary bg-tertiary">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
