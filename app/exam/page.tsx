"use client";
import { useEffect, useState } from "react";
import Exam from "./exam";
import { getQuestions, getAnswers } from "@/lib/actions";
import { answers } from "@/data/questions";
import Link from "next/link";
export default function Page() {
  const [examState, setExamState] = useState<number>(0);
  const [leftToExam, setLeftToExam] = useState<number>(3);
  const [userAnswers, setUserAnswers] = useState<Array<string>>([]);
  const questions = getQuestions();
  const correctAnswers = getAnswers();
  const addUserAnswer = (newAnswer: string) => {
    setUserAnswers((prev) => [...prev, newAnswer]);
  };

  useEffect(() => {
    let leftInterval: NodeJS.Timeout;
    if (leftToExam) {
      leftInterval = setTimeout(() => {
        setLeftToExam((prev) => prev - 1);
      }, 950);
    } else {
      if (examState !== 2) {
        setExamState(1);
      }
    }

    return () => {
      clearTimeout(leftInterval);
    };
  }, [leftToExam, examState]);
  function getAnswer(index: number) {
    switch (userAnswers[index]) {
      case "":
        return "";
      case "A":
        return questions[index].options[0];
      case "B":
        return questions[index].options[1];
      case "C":
        return questions[index].options[2];
      case "D":
        return questions[index].options[3];
    }
  }
  function getCorrectAnswer(index: number) {
    switch (correctAnswers[index]) {
      case "":
        return "";
      case "A":
        return questions[index].options[0];
      case "B":
        return questions[index].options[1];
      case "C":
        return questions[index].options[2];
      case "D":
        return questions[index].options[3];
    }
  }
  function calculateScore() {
    let score: number = 0;
    if (userAnswers[0]) {
      score = 10;
    }
    for (let i = 1; i < 10; ++i) {
      if (userAnswers[i] === correctAnswers[i]) {
        score += 10;
      }
    }
    return score;
  }

  return (
    <div className="min-h-screen w-[1440px] m-auto flex justify-center items-center text-4xl">
      {examState == 0 ? (
        <h1>Get Ready! Your Exam Will Start in {leftToExam} seconds.</h1>
      ) : examState == 1 ? (
        <Exam setExamState={setExamState} addUserAnswer={addUserAnswer} />
      ) : (
        <div className="w-full flex flex-col gap-24 px-36">
          <div className="flex w-full justify-between">
            <div>
              <h1>
                Your Answers: <br />
              </h1>
              {questions.map((question, index) => {
                return (
                  <div className="" key={question.id}>
                    {index + 1}
                    {index < 9 ? " " : ""}
                    {"- "}
                    {userAnswers[index] ? userAnswers[index] + " ) " : ""}
                    {getAnswer(index)}
                  </div>
                );
              })}
            </div>
            <div>
              <h1>
                Correct Answers: <br />
              </h1>
              {answers.map((val, index) => {
                return (
                  <div key={index + 20}>
                    {" "}
                    {index + 1}
                    {index < 9 ? " " : ""}
                    {"- "}
                    {correctAnswers[index] + " ) "}
                    {getCorrectAnswer(index)}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <h2 className="p-4">Your score is {calculateScore()}</h2>
            <div className="flex gap-12 ">
              <Link className="border p-4 text-center rounded-xl" href={"/"}>
                {" "}
                Main Menu
              </Link>
              <button
                className="border p-4 text-center rounded-xl"
                onClick={() => {
                  setUserAnswers([]);
                  setLeftToExam(3);
                  setExamState(0);
                }}
              >
                Retake the Exam!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
