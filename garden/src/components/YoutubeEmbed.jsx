import { useEffect, useId, useRef } from "react";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/YoutubeEmbed.css";

let ytApiPromise = null;

function loadYouTubeApi() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("no window"));
  }
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === "function") prev();
      resolve(window.YT);
    };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });
  return ytApiPromise;
}

function buildEmbedSrc(videoId, listId) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    enablejsapi: "1",
  });
  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }
  if (listId) params.set("list", listId);
  const path = videoId || (listId ? "videoseries" : "");
  return `https://www.youtube.com/embed/${path}?${params.toString()}`;
}

export default function YoutubeEmbed({ tracks, onPlaybackChange }) {
  const { t, tUi } = useLocale();
  const reactId = useId().replace(/:/g, "");
  const playingIds = useRef(new Set());
  const playersRef = useRef([]);
  const onPlaybackChangeRef = useRef(onPlaybackChange);
  onPlaybackChangeRef.current = onPlaybackChange;

  useEffect(() => {
    if (!tracks?.length) return undefined;

    let cancelled = false;
    playingIds.current = new Set();

    const notify = () => {
      onPlaybackChangeRef.current?.(playingIds.current.size > 0);
    };

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        tracks.forEach((track, index) => {
          const el = document.getElementById(`${reactId}-${index}`);
          if (!el) return;
          const playerId = `${reactId}-${index}`;
          const player = new YT.Player(el, {
            events: {
              onStateChange: (event) => {
                if (event.data === YT.PlayerState.PLAYING) {
                  playingIds.current.add(playerId);
                } else {
                  playingIds.current.delete(playerId);
                }
                notify();
              },
            },
          });
          playersRef.current.push(player);
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      playingIds.current.clear();
      onPlaybackChangeRef.current?.(false);
      playersRef.current.forEach((player) => {
        try {
          player.destroy?.();
        } catch {
          /* iframe already gone */
        }
      });
      playersRef.current = [];
    };
  }, [tracks, reactId]);

  if (!tracks?.length) return null;

  return (
    <section className="youtube-embed" aria-label={tUi("listen")}>
      <h3 className="youtube-embed__heading">{tUi("listen")}</h3>
      <ul className="youtube-embed__list">
        {tracks.map((track, index) => {
          const title = t(track.title);
          return (
            <li
              key={`${track.videoId ?? "list"}-${track.listId ?? ""}`}
              className="youtube-embed__item"
            >
              {title && <p className="youtube-embed__title">{title}</p>}
              <div className="youtube-embed__frame">
                <iframe
                  id={`${reactId}-${index}`}
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
