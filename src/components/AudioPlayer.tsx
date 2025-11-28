import type { JSX } from "solid-js";
import styles from "./AudioPlayer.module.css";

interface AudioPlayerProps {
  title: string;
  src: string;
  type?: string;
}

type Component<P = {}> = (props: P) => JSX.Element;

const AudioPlayer: Component<AudioPlayerProps> = (props) => {
  let audioRef: HTMLAudioElement;

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

  return (
    <div class="audio-player">
      <button onClick={playAudio} class={styles["audio-button"]} type="button">
        <span class={styles["audio-button__a11y-text"]}>Play sound:</span>
        <span class={styles["audio-button__text"]}>{props.title}</span>
      </button>
      <audio ref={audioRef} preload="none">
        <source src={props.src} type={props.type || "audio/mpeg"} />
      </audio>
    </div>
  );
};

export default AudioPlayer;
