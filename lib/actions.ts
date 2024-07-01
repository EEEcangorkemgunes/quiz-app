import { questions, answers } from "@/data/questions";
export function getQuestions(): Array<Question> {
  return questions;
}
export function getAnswers(): Array<string> {
  return answers;
}
