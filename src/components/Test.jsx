import React from "react";
import useSound from "use-sound";
import Button from "@material-ui/core/Button";
import soundSfx from "../assets/sound.mp3";

const Test = () => {

  const [play, { stop }] = useSound(soundSfx);

  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Button
      onMouseEnter={() => {
        console.log("mouse enter");
        setIsHovering(true);
        play();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}
    >
      Hover over me!
    </Button>
  );
};

export default Test;
