import { useEffect, useRef, useState } from "react";
import { TIMEOUTS, AUTO_SAVE_STATUS } from "../constants";

type AutoSaveStatus = typeof AUTO_SAVE_STATUS[keyof typeof AUTO_SAVE_STATUS];

export default function useAutoSave<T>(
  key: string,
  data: T,
  enabled: boolean = true
): AutoSaveStatus {
  const [status, setStatus] = useState<AutoSaveStatus>(AUTO_SAVE_STATUS.IDLE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip auto-save on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!enabled) {
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set saving status
    setStatus(AUTO_SAVE_STATUS.SAVING);

    // Debounce the save operation
    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        setStatus(AUTO_SAVE_STATUS.SAVED);

        // Reset to idle after 2 seconds
        setTimeout(() => {
          setStatus(AUTO_SAVE_STATUS.IDLE);
        }, 2000);
      } catch (error) {
        console.error("Auto-save error:", error);
        setStatus(AUTO_SAVE_STATUS.ERROR);

        // Reset to idle after 3 seconds
        setTimeout(() => {
          setStatus(AUTO_SAVE_STATUS.IDLE);
        }, 3000);
      }
    }, TIMEOUTS.AUTO_SAVE_DEBOUNCE);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, key, enabled]);

  return status;
}
