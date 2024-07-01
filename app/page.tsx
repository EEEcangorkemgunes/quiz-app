import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center text-4xl">
      <div className="flex flex-col items-center gap-8 text-center">
        <Link href={"/exam"}>Click on this to start the exam!</Link>
        <h2 className="text-2xl ">
          You have 30 seconds to answer each question! <br />
          You cannot go back to the previous question!
        </h2>{" "}
      </div>
    </div>
  );
}
