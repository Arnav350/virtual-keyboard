import React, { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const input = useRef<HTMLInputElement>(null!);

  const [message, setMessage] = useState<string>("");
  const [shifted, setShifted] = useState<boolean>(false);
  const [lowerCase, setLowerCase] = useState<boolean>(true);

  function handlePress(event: any) {
    const keys = document.querySelectorAll<HTMLDivElement>(".key");

    const normal = document.querySelectorAll<HTMLDivElement>(".normal");
    const shift = document.querySelectorAll<HTMLDivElement>(".shift");
    const caps = document.querySelectorAll<HTMLDivElement>(".caps");

    if (lowerCase) {
      if (shifted) {
        for (let i = 0; i < keys.length; i++) {
          keys[i].style.backgroundColor = "#333";
          if (shift[i].innerHTML === event.key) {
            keys[i].style.backgroundColor = "#ddd";
            setShifted(false);
            if (event.key === "CapsLock") {
              setLowerCase(false);
              for (let j = 0; j < keys.length; j++) {
                shift[j].style.display = "none";
                caps[j].style.display = "block";
              }
            } else {
              for (let j = 0; j < keys.length; j++) {
                shift[j].style.display = "none";
                normal[j].style.display = "block";
              }
            }
          }
        }
      } else {
        for (let i = 0; i < keys.length; i++) {
          keys[i].style.backgroundColor = "#333";
          if (normal[i].innerHTML === event.key) {
            keys[i].style.backgroundColor = "#ddd";
            if (event.key === "CapsLock") {
              setLowerCase(false);
              for (let j = 0; j < keys.length; j++) {
                normal[j].style.display = "none";
                caps[j].style.display = "block";
              }
            } else if (event.key === "Shift") {
              setShifted(true);
              for (let j = 0; j < keys.length; j++) {
                normal[j].style.display = "none";
                shift[j].style.display = "block";
              }
            }
          }
        }
      }
    } else {
      for (let i = 0; i < keys.length; i++) {
        keys[i].style.backgroundColor = "#333";
        if (caps[i].innerHTML === event.key) {
          keys[i].style.backgroundColor = "#ddd";
          if (event.key === "CapsLock") {
            setLowerCase(true);
            for (let j = 0; j < keys.length; j++) {
              caps[j].style.display = "none";
              normal[j].style.display = "block";
            }
          } else if (event.key === "Shift") {
            setShifted(true);
            setLowerCase(true);
            for (let j = 0; j < keys.length; j++) {
              caps[j].style.display = "none";
              shift[j].style.display = "block";
            }
          }
        }
      }
    }

    // for (let i = 0; i < keys.length; i++) {
    //   keys[i].style.backgroundColor = "#333";
    //   if (keys[i].innerHTML === event.key) {
    //     keys[i].style.backgroundColor = "#ddd";
    //   }
    // }
  }

  function handleClick(key: any) {
    const keys = document.querySelectorAll<HTMLDivElement>(".key");
    for (let i = 0; i < keys.length; i++) {
      keys[i].style.backgroundColor = "#333";
      if (keys[i].innerHTML === key.innerHTML) {
        keys[i].style.backgroundColor = "#ddd";
        if (key.innerHTML === "Backspace") {
          setMessage(input.current.value.slice(0, -1));
        } else if (key.innerHTML === "CapsLock") {
          setLowerCase(!lowerCase);
        } else if (key.innerHTML === "Shift") {
          setShifted(!shifted);
        } else {
          setMessage(input.current.value + key.innerHTML);
        }
      }
    }
    input.current.focus();
  }

  useEffect(() => {
    const keys = document.querySelectorAll<HTMLDivElement>(".key");
    for (let i = 0; i < keys.length; i++) {
      keys[i].addEventListener("click", () => handleClick(keys[i]));
    }
    input.current.focus();
  }, []);

  return (
    <div className="container" onKeyDown={(event: any) => handlePress(event)}>
      <input
        type="text"
        value={message}
        className="input"
        ref={input}
        onChange={(event: any) => setMessage(event.target.value)}
      />
      <div className="keyboard">
        <div className="row">
          <div className="key">
            <div className="normal">`</div>
            <div className="shift">~</div>
            <div className="caps">`</div>
          </div>
          <div className="key">
            <div className="normal">1</div>
            <div className="shift">!</div>
            <div className="caps">1</div>
          </div>
          <div className="key">
            <div className="normal">2</div>
            <div className="shift">@</div>
            <div className="caps">2</div>
          </div>
          <div className="key">
            <div className="normal">3</div>
            <div className="shift">#</div>
            <div className="caps">3</div>
          </div>
          <div className="key">
            <div className="normal">4</div>
            <div className="shift">$</div>
            <div className="caps">4</div>
          </div>
          <div className="key">
            <div className="normal">5</div>
            <div className="shift">%</div>
            <div className="caps">5</div>
          </div>
          <div className="key">
            <div className="normal">6</div>
            <div className="shift">^</div>
            <div className="caps">6</div>
          </div>
          <div className="key">
            <div className="normal">7</div>
            <div className="shift">&</div>
            <div className="caps">7</div>
          </div>
          <div className="key">
            <div className="normal">8</div>
            <div className="shift">*</div>
            <div className="caps">8</div>
          </div>
          <div className="key">
            <div className="normal">9</div>
            <div className="shift">{"("}</div>
            <div className="caps">9</div>
          </div>
          <div className="key">
            <div className="normal">0</div>
            <div className="shift">{")"}</div>
            <div className="caps">0</div>
          </div>
          <div className="key">
            <div className="normal">-</div>
            <div className="shift">_</div>
            <div className="caps">-</div>
          </div>
          <div className="key">
            <div className="normal">=</div>
            <div className="shift">+</div>
            <div className="caps">=</div>
          </div>
          <div className="key key__backspace">
            <div className="normal">Backspace</div>
            <div className="shift">Backspace</div>
            <div className="caps">Backspace</div>
          </div>
        </div>
        <div className="row">
          <div className="key key__tab">
            <div className="normal">Tab</div>
            <div className="shift">Tab</div>
            <div className="caps">Tab</div>
          </div>
          <div className="key">
            <div className="normal">q</div>
            <div className="shift">Q</div>
            <div className="caps">Q</div>
          </div>
          <div className="key">
            <div className="normal">w</div>
            <div className="shift">W</div>
            <div className="caps">W</div>
          </div>
          <div className="key">
            <div className="normal">e</div>
            <div className="shift">E</div>
            <div className="caps">E</div>
          </div>
          <div className="key">
            <div className="normal">r</div>
            <div className="shift">R</div>
            <div className="caps">R</div>
          </div>
          <div className="key">
            <div className="normal">t</div>
            <div className="shift">T</div>
            <div className="caps">T</div>
          </div>
          <div className="key">
            <div className="normal">y</div>
            <div className="shift">Y</div>
            <div className="caps">Y</div>
          </div>
          <div className="key">
            <div className="normal">u</div>
            <div className="shift">U</div>
            <div className="caps">U</div>
          </div>
          <div className="key">
            <div className="normal">i</div>
            <div className="shift">I</div>
            <div className="caps">I</div>
          </div>
          <div className="key">
            <div className="normal">o</div>
            <div className="shift">O</div>
            <div className="caps">O</div>
          </div>
          <div className="key">
            <div className="normal">p</div>
            <div className="shift">P</div>
            <div className="caps">P</div>
          </div>
          <div className="key">
            <div className="normal">{"["}</div>
            <div className="shift">{"{"}</div>
            <div className="caps">{"["}</div>
          </div>
          <div className="key">
            <div className="normal">{"]"}</div>
            <div className="shift">{"}"}</div>
            <div className="caps">{"]"}</div>
          </div>
          <div className="key">
            <div className="normal">\</div>
            <div className="shift">|</div>
            <div className="caps">\</div>
          </div>
        </div>
        <div className="row">
          <div className="key key__caps">
            <div className="normal">CapsLock</div>
            <div className="shift">CapsLock</div>
            <div className="caps">CapsLock</div>
          </div>
          <div className="key">
            <div className="normal">a</div>
            <div className="shift">A</div>
            <div className="caps">A</div>
          </div>
          <div className="key">
            <div className="normal">s</div>
            <div className="shift">S</div>
            <div className="caps">S</div>
          </div>
          <div className="key">
            <div className="normal">d</div>
            <div className="shift">D</div>
            <div className="caps">D</div>
          </div>
          <div className="key">
            <div className="normal">f</div>
            <div className="shift">F</div>
            <div className="caps">F</div>
          </div>
          <div className="key">
            <div className="normal">g</div>
            <div className="shift">G</div>
            <div className="caps">G</div>
          </div>
          <div className="key">
            <div className="normal">h</div>
            <div className="shift">H</div>
            <div className="caps">H</div>
          </div>
          <div className="key">
            <div className="normal">j</div>
            <div className="shift">J</div>
            <div className="caps">J</div>
          </div>
          <div className="key">
            <div className="normal">k</div>
            <div className="shift">K</div>
            <div className="caps">K</div>
          </div>
          <div className="key">
            <div className="normal">l</div>
            <div className="shift">L</div>
            <div className="caps">L</div>
          </div>
          <div className="key">
            <div className="normal">;</div>
            <div className="shift">:</div>
            <div className="caps">;</div>
          </div>
          <div className="key">
            <div className="normal">'</div>
            <div className="shift">"</div>
            <div className="caps">'</div>
          </div>
          <div className="key key__enter">
            <div className="normal">Enter</div>
            <div className="shift">Enter</div>
            <div className="caps">Enter</div>
          </div>
        </div>
        <div className="row">
          <div className="key key__shift-left">
            <div className="normal">Shift</div>
            <div className="shift">Shift</div>
            <div className="caps">Shift</div>
          </div>
          <div className="key">
            <div className="normal">z</div>
            <div className="shift">Z</div>
            <div className="caps">Z</div>
          </div>
          <div className="key">
            <div className="normal">x</div>
            <div className="shift">X</div>
            <div className="caps">X</div>
          </div>
          <div className="key">
            <div className="normal">c</div>
            <div className="shift">C</div>
            <div className="caps">C</div>
          </div>
          <div className="key">
            <div className="normal">v</div>
            <div className="shift">V</div>
            <div className="caps">V</div>
          </div>
          <div className="key">
            <div className="normal">b</div>
            <div className="shift">B</div>
            <div className="caps">B</div>
          </div>
          <div className="key">
            <div className="normal">n</div>
            <div className="shift">N</div>
            <div className="caps">N</div>
          </div>
          <div className="key">
            <div className="normal">m</div>
            <div className="shift">M</div>
            <div className="caps">M</div>
          </div>
          <div className="key">
            <div className="normal">,</div>
            <div className="shift">{"<"}</div>
            <div className="caps">,</div>
          </div>
          <div className="key">
            <div className="normal">.</div>
            <div className="shift">{">"}</div>
            <div className="caps">.</div>
          </div>
          <div className="key">
            <div className="normal">/</div>
            <div className="shift">?</div>
            <div className="caps">/</div>
          </div>
          <div className="key key__shift-right">
            <div className="normal">Shift</div>
            <div className="shift">Shift</div>
            <div className="caps">Shift</div>
          </div>
        </div>
        <div className="row">
          <div className="key key__space"> </div>
        </div>
      </div>
    </div>
  );
}

export default App;
