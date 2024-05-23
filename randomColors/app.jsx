import { useEffect, useState } from "react";

import "./App.css";



function randomHex() {
  var hexNumbers = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  const color=new Array(6).fill("").map(()=> hexNumbers[Math.floor(Math.random() * hexNumbers.length)]).join("")
return `#${color}`;
}

function App() {
  const [randomColors, setRandomColors] = useState([]);
  const [color, setColor] = useState();
  const [result, setResult] = useState("");



  function generateColors(){

    const actualColor=randomHex();
    setColor(actualColor);
    setRandomColors(
      [randomHex(), randomHex(), actualColor].sort(
        () => 0.5 - Math.random()
      )
    );

  }

  useEffect(() => {    
    generateColors()
  }, []);

  const handleClick = (item) => {
    if (item === color) {
      setResult("Correct!");
      generateColors();
    } else {
      setResult("Wrong!");
    }
  };

  return (
    <section className="bg-wrapper">
      <div className="bg-color" style={{ background: color }}></div>
      <section className="btns">
      {randomColors.map((item) => (
        <button onClick={() => handleClick(item)} key={item} >{item}</button>
      ))}
      </section>
      <p style={{ color: `${result === "Correct!" ? "green" : "red"}` }}>
        {result}
      </p>
    </section>
  );
}

export default App;