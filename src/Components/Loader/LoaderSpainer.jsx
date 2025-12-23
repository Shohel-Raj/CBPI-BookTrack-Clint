import { Triangle } from "react-loader-spinner";

const LoaderSpainer = ({ size = 80, color = "#4fa94d" }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/60 backdrop-blur-sm z-50">
      <Triangle
        visible={true}
        height={size}
        width={size}
        color={color}
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoaderSpainer;
