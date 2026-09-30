import { useLocale } from "../i18n/LocaleContext";
import { IconSpeaker, IconSpeakerMuted } from "./ChromeIcons";

export default function AmbientMute({ muted, onToggle }) {
  const { tUi } = useLocale();
  const label = muted ? tUi("ambientUnmute") : tUi("ambientMute");

  return (
    <div className="ambient-mute" role="group" aria-label={tUi("ambient")}>
      <button
        type="button"
        className={`ambient-mute__btn chrome-icon-btn${
          muted ? " is-muted" : " is-active"
        }`}
        aria-pressed={muted}
        aria-label={label}
        title={label}
        onClick={onToggle}
      >
        {muted ? <IconSpeakerMuted /> : <IconSpeaker />}
      </button>
    </div>
  );
}
