"use client";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <div>
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString("Hello it is Landing Page")
            .pauseFor(1500)
            .deleteAll()
            .start();
        }}
      />
    </div>
  );
}
