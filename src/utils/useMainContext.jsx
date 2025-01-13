import { useContext } from "react";
import Context from "./Context";


const useMainContext = () => {
  const context = useContext(Context)
  return context;
};

export default useMainContext;