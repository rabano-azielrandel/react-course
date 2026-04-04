import LoginForm from "@/components/forms/login-form";

export default function Login() {
  return (
    <div className="w-4xl h-full p-10 bg-background">
      <div className="h-full flex centerXY">
        <LoginForm />
      </div>
    </div>
  );
}
