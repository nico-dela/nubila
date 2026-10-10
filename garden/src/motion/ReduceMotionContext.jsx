import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  applyReduceMotionToDocument,
  effectiveReduceMotion,
  readOsReduceMotion,
  readStoredReduceMotion,
  writeStoredReduceMotion,
} from "./reduceMotion";

const ReduceMotionContext = createContext(null);

export function ReduceMotionProvider({ children }) {
  const [osReduce, setOsReduce] = useState(readOsReduceMotion);
  const [userReduce, setUserReduce] = useState(readStoredReduceMotion);
  const reduceMotion = effectiveReduceMotion(osReduce, userReduce);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setOsReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    applyReduceMotionToDocument(reduceMotion);
  }, [reduceMotion]);

  const value = useMemo(() => {
    const toggleReduceMotion = () => {
      if (osReduce) return;
      setUserReduce((prev) => {
        const next = !prev;
        writeStoredReduceMotion(next);
        return next;
      });
    };
    return { reduceMotion, osReduce, userReduce, toggleReduceMotion };
  }, [reduceMotion, osReduce, userReduce]);

  return (
    <ReduceMotionContext.Provider value={value}>
      {children}
    </ReduceMotionContext.Provider>
  );
}

export function useReduceMotion() {
  const ctx = useContext(ReduceMotionContext);
  if (!ctx) {
    throw new Error("useReduceMotion must be used within ReduceMotionProvider");
  }
  return ctx;
}
