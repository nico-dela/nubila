import { useLocale } from "../i18n/LocaleContext";
import { useReduceMotion } from "../motion/ReduceMotionContext";
import { IconMotion, IconMotionStill } from "./ChromeIcons";

export default function ReduceMotionToggle() {
  const { tUi } = useLocale();
  const { reduceMotion, osReduce, toggleReduceMotion } = useReduceMotion();
  const label = osReduce
    ? tUi("reduceMotionSystem")
    : reduceMotion
      ? tUi("reduceMotionOn")
      : tUi("reduceMotionOff");

  return (
    <div className="reduce-motion" role="group" aria-label={tUi("reduceMotion")}>
      <button
        type="button"
        className={`reduce-motion__btn chrome-icon-btn${
          reduceMotion ? " is-active" : ""
        }`}
        aria-pressed={reduceMotion}
        aria-label={label}
        title={label}
        disabled={osReduce}
        onClick={toggleReduceMotion}
      >
        {reduceMotion ? <IconMotionStill /> : <IconMotion />}
      </button>
    </div>
  );
}
