import { useEffect } from "react";
export function useKeys(key, action) {
  useEffect(() => {
    document.addEventListener("keydown", action);
    function callback(e) {
      if (e.key === key.toLowercase()) {
        action();
        cleanUp();
      }
    }
    function cleanUp() {
      document.removeEventListener("keydown", callback);
    }
  });
}
