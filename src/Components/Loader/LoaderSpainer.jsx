import { Triangle } from "react-loader-spinner";

const LoaderSpainer = ({ size = 80 }) => {
  // Detect theme from HTML data attribute
  const theme = document.documentElement.getAttribute("data-theme") || "light";

  // Set colors based on theme
  const spinnerColor = theme === "light" ? "#4fa94d" : "#FBD536";
  const backdropColor = theme === "light" ? "bg-white/40" : "bg-black/40";

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center ${backdropColor} backdrop-blur-sm z-50`}
    >
      <Triangle
        visible={true}
        height={size}
        width={size}
        color={spinnerColor}
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoaderSpainer;
