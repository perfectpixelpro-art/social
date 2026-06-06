const LightGradientBG = ({ className = "" }) => {
  return (
    <img
      className={`absolute top-[0px] left-[0px] w-full h-full object-cover ${className}`}
      alt=""
      src="/Light-Gradient-BG.svg"
    />
  );
};

export default LightGradientBG;
