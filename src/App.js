import React, { useState, useEffect } from "react";
import { animateScroll as scroll, Events } from "react-scroll";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App2.css"; // import the CSS file

const TextAnimation = () => {
  const text =
    "In Chronicle everything is made with Blocks that come with pixel perfect design, interactivity and motion out of the box. Instead of designing from scratch, simply choose the right one from our library of blocks and see the magic unfold.";
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(0);

  useEffect(() => {
    Events.scrollEvent.register("begin", () => { });
    Events.scrollEvent.register("end", () => { });

    scroll.scrollMore(1);

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrolledPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      const newHighlightedWordIndex = Math.floor(
        (scrolledPercentage / 100) * text.split(" ").length
      );
      setHighlightedWordIndex(newHighlightedWordIndex);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [text]);

  const button = (
    <button className="joinBeta" onClick={() => {
      console.log("Button clicked!");
    }}>
      <span className="spanJoinBeta"> Join Beta </span>
    </button>
  );

  const icon = (
    <img src="https://i0.wp.com/blog.chroniclehq.com/wp-content/uploads/2023/01/Fav-icon.png?ssl=1" className="logo" alt="logo" />
  );

  return (
    <div className="text-container">
      <TransitionGroup className="text">
        {text.split(" ").map((word, index) => (
          <CSSTransition key={index} timeout={500} classNames="fade">
            <span className={index < highlightedWordIndex ? "past" : "future"}>
              {word}{" "}
            </span>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <div style={{ position: 'fixed', right: 40, top: 40 }}>
        {button}
      </div>
      <div style={{ position: 'fixed', left: 40, top: 40 }}>
        {icon}
      </div>
    </div>
  );
};

export default TextAnimation;
