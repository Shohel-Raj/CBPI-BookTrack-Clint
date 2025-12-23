import { useEffect } from "react";
import "./App.css";
import ThemeToggleButton from "./Buttons/ThemeToggleButton";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>

      <h1 className="text-accent">hello</h1>

      <div className="fixed bottom-6 right-6">
        <ThemeToggleButton />
      </div>
    </>
  );
}

export default App;
