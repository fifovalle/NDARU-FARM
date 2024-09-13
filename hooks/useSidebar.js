import { useEffect, useRef, useState } from "react";

export const useSidebar = () => {
  const [sidebarTerbuka, setSidebarTerbuka] = useState(false);
  const refSidebar = useRef(null);

  const toggleSidebar = () => setSidebarTerbuka(!sidebarTerbuka);

  const tanganiKlikDiluar = (event) => {
    if (refSidebar.current && !refSidebar.current.contains(event.target)) {
      setSidebarTerbuka(false);
    }
  };

  useEffect(() => {
    if (sidebarTerbuka) {
      document.addEventListener("mousedown", tanganiKlikDiluar);
    } else {
      document.removeEventListener("mousedown", tanganiKlikDiluar);
    }
    return () => {
      document.removeEventListener("mousedown", tanganiKlikDiluar);
    };
  }, [sidebarTerbuka]);

  return { sidebarTerbuka, toggleSidebar, refSidebar };
};
