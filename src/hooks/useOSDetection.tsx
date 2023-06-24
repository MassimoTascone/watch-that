const useOSDetection = () => {
  const isMac =
    typeof window !== "undefined"
      ? navigator.userAgent.toUpperCase().indexOf("MAC") >= 0
      : false;

  return isMac;
};

export default useOSDetection;
