import Login from "@/pages/Login";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <>
      <section className="h-screen flex flex-col justify-center items-center">
        <Navbar />
        <Login />
      </section>
    </>
  );
}
