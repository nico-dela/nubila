import { useLocale } from "../i18n/LocaleContext";
import "../styles/YoutubeEmbed.css";

function buildEmbedSrc(videoId, listId) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });
  if (listId) params.set("list", listId);
  const path = videoId || (listId ? "videoseries" : "");
  return `https://www.youtube.com/embed/${path}?${params.toString()}`;
}

export default function YoutubeEmbed({ tracks }) {
  const { t, tUi } = useLocale();
  if (!tracks?.length) return null;

  return (
    <section className="youtube-embed" aria-label={tUi("listen")}>
      <h3 className="youtube-embed__heading">{tUi("listen")}</h3>
      <ul className="youtube-embed__list">
        {tracks.map((track) => {
          const title = t(track.title);
          return (
            <li
              key={`${track.videoId ?? "list"}-${track.listId ?? ""}`}
              className="youtube-embed__item"
            >
              {title && <p className="youtube-embed__title">{title}</p>}
              <div className="youtube-embed__frame">
                <iframe
                  src={buildEmbedSrc(track.videoId, track.listId)}
                  title={title || tUi("listen")}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
