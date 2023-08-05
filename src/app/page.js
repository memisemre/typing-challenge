"use client";
import { useState, useEffect } from "react";
import CSS from "./page.module.scss";

const Home = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [trueWordsPice, setTrueWordsPice] = useState(0);
  const [falseWordsPice, setFalseWordsPice] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [emptyAns, setEmptyAns] = useState(0);
  const [timerValue, setTimerValue] = useState(10);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const endGame = () => {
    setPlaying(false);
    setTimerRunning(false);
  };
  const createWord = () => {
    const CHARACTERS =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
      result += CHARACTERS.charAt(randomIndex);
    }
    return result;
  };

  const updateWord = () => {
    const newWord = createWord();
    setCurrentWord(newWord);
    setInputValue("");
    setTimerValue(10);
  };

  const checkAns = () => {
    setTotalAnswers(totalAnswers + 1);
    if (inputValue.length !== 0) {
      if (currentWord === inputValue) {
        setTrueWordsPice((prevValue) => prevValue + 1);
      } else {
        setFalseWordsPice((prevValue) => prevValue + 1);
      }
    } else {
      setEmptyAns((prevValue) => prevValue + 1);
    }
  };

  const handleInputChange = (event) => {
    const inputCurrentValue = event.target.value;
    const checkSpace = inputCurrentValue.includes(" ");
    setInputValue(inputCurrentValue);
    if (checkSpace) {
      checkAns();
      updateWord();
    }
  };

  useEffect(() => {
    let timerInterval;
    if (isTimerRunning && timerValue > 0) {
      timerInterval = setInterval(() => {
        setTimerValue((prevValue) => prevValue - 1);
      }, 1000);
    } else if (timerValue === 0) {
      clearInterval(timerInterval);
      checkAns();
      updateWord();
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [isTimerRunning, timerValue]);

  const startGame = () => {
    setCurrentWord(createWord());
    setTimerValue(10);
    setTimerRunning(true);
    setPlaying(true);
  };
  useEffect(() => {
    if (totalAnswers === 30) {
      endGame();
    }
  }, [totalAnswers]);
  const resetGame = () => {
    endGame();
    startGame();
  };
  return (
    <main className={CSS.main}>
      {!isPlaying && <button onClick={startGame}>Start Game</button>}

      {currentWord && (
        <div>
          <p>{currentWord}</p>
        </div>
      )}
      <div>
        <div>
          <p>Time {timerValue}</p>
        </div>
        <p>True : {trueWordsPice}</p>
        <p>False : {falseWordsPice}</p>
        <p>Empty : {emptyAns}</p>
      </div>
      <input
        type="text"
        onChange={handleInputChange}
        value={inputValue}
        disabled={!isPlaying}
      />
      {isPlaying && <button onClick={resetGame}>Reset Game</button>}
    </main>
  );
};

export default Home;
