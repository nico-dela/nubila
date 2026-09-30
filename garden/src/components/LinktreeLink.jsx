import { useLocale } from "../i18n/LocaleContext";
import { IconLinktree } from "./ChromeIcons";

const LINKTREE_URL = "https://linktr.ee/nubila";

export default function LinktreeLink() {
  const { tUi } = useLocale();
  const label = tUi("linktree");

  return (
    <a
      className="linktree-link chrome-icon-btn"
      href={LINKTREE_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
    >
      <IconLinktree />
    </a>
  );
}
