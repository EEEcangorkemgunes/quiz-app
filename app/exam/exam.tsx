"use client";

import { getQuestions } from "@/lib/actions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
type Props = {
  setExamState: (examState: number) => void;
  addUserAnswer: (userAnswers: string) => void;
};
export default function Exam({ setExamState, addUserAnswer }: Props) {
  const [questions, setQuestions] = useState<Array<Question>>(getQuestions());
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (questionNumber === 11) {
      setQuestionNumber(1);
      setExamState(2);
    }
    if (timeLeft) {
      timeout = setTimeout(() => {
        setTimeLeft((prev) => {
          return prev - 1;
        });
      }, 1000);
    } else {
      addUserAnswer(currentAnswer);
      setCurrentAnswer("");
      setQuestionNumber((prev) => prev + 1);
      setTimeLeft(30);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [questionNumber, timeLeft, setExamState, currentAnswer, addUserAnswer]);

  return (
    <>
      {questionNumber < 11 ? (
        <div className="w-[1280px] pb-24 pt-16  flex flex-col  pl-12 items-center rounded-[40px] shadow-[-6px_6px_10px_0px_#00000012,20px_20px_25px_-5px_#0000001A]">
          <div className="h-[100px] w-full  flex justify-between items-center pr-12">
            <div className="text-3xl leading-[80px]">
              {questionNumber + ") " + questions[questionNumber - 1].question}
              <div className="h-[1px] w-full bg-white"></div>
            </div>
            <div>{timeLeft}</div>
          </div>
          <div className="w-full flex items-center justify-start h-[316px]">
            <div className="w-[600px] h-full flex flex-col gap-8 pl-4 pt-12 items-start text-xl">
              <button
                disabled={timeLeft > 20}
                onClick={() => {
                  setCurrentAnswer("A");
                }}
              >
                {"A) " + questions[questionNumber - 1].options[0]}
              </button>
              <button
                disabled={timeLeft > 20}
                onClick={() => {
                  setCurrentAnswer("B");
                }}
              >
                {"B) " + questions[questionNumber - 1].options[1]}
              </button>
              <button
                disabled={timeLeft > 20}
                onClick={() => {
                  setCurrentAnswer("C");
                }}
              >
                {"C) " + questions[questionNumber - 1].options[2]}
              </button>
              <button
                disabled={timeLeft > 20}
                onClick={() => {
                  setCurrentAnswer("D");
                }}
              >
                {"D) " + questions[questionNumber - 1].options[3]}
              </button>
              <button
                onClick={() => {
                  setCurrentAnswer("");
                }}
              >
                Click to clear
              </button>
            </div>
            <div className="flex flex-col gap-32 justify-end items-center h-full w-full pr-32 text-3xl">
              <div>
                {currentAnswer ? "Your answer is: " + currentAnswer : <></>}
              </div>
              <button
                disabled={timeLeft > 20}
                onClick={() => {
                  addUserAnswer(currentAnswer);
                  setCurrentAnswer("");
                  setQuestionNumber((prev) => prev + 1);
                  setTimeLeft(30);
                }}
              >
                Next!
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
