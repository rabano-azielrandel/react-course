import Login from "@/pages/Login";
import ThemeSwitcher from "./components/themeswitcher";

export default function App() {
  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <ThemeSwitcher />
        <Login />
      </section>
    </>
  );
}
