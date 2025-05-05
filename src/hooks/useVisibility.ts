import { useState } from "react";

const useVisibility = () => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!isVisible);

  return { isVisible, toggleVisibility };
};

export default useVisibility;
