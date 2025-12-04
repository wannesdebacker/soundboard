import { createSignal, type JSX } from "solid-js";
import styles from "./AudioPlayer.module.css";

interface AudioPlayerProps {
  title: string;
  src: string;
  type?: string;
  folder?: string;
}

type Component<P = {}> = (props: P) => JSX.Element;

const AudioPlayer: Component<AudioPlayerProps> = (props) => {
  let audioRef: HTMLAudioElement;
  const [copySuccess, setCopySuccess] = createSignal<boolean>(false);

  const playAudio = () => {
    document.querySelectorAll("audio").forEach((audio) => {
      if (audio !== audioRef) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    audioRef.currentTime = 0;
    audioRef.play();
  };

  const shareSound = async () => {
    const fileName = props.src.split("/").pop();
    const currentPath = window.location.pathname;
    const basePath = currentPath.includes('/soundboard') ? '/soundboard' : '';
    const shareUrl = `${window.location.origin}${basePath}/share/${props.folder}/${fileName}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div class={styles["audio-player-container"]}>
      <button onClick={playAudio} class={styles["audio-button"]} type="button">
        <span class={styles["audio-button__a11y-text"]}>Play sound:</span>
        <span class={styles["audio-button__text"]}>{props.title}</span>
      </button>
      <button
        onClick={shareSound}
        class={styles['audio-share-button']}
        type="button"
        title="Copy share link"
      >
        {copySuccess() ? "✓" : "Share"}
      </button>
      <audio ref={audioRef} preload="none">
        <source src={props.src} type={props.type || "audio/mpeg"} />
      </audio>
    </div>
  );
};

export default AudioPlayer;
