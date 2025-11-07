import { useMemo } from "react";
import { useCounter } from "../hooks/useCounter";

const heavyStuff = (iterationNumber: number) => {
  console.time("heavy_started");

  for (let index = 0; index < iterationNumber; index++) {
    console.log("ahi vamos...");
  }

  console.timeEnd("heavy_started");

  return `${iterationNumber} iteraciones realizadas`;
};

export const MemoCounter = () => {
  const { counter, increment } = useCounter(40_000);
  const { counter: counter2, increment: increment2 } = useCounter(10);

  const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);
  // const myHeavyValue = heavyStuff(counter);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Memo - useMemo</h1>
      <hr />

      <h4>Counter: {counter}</h4>
      <h4>Counter: {counter2}</h4>

      <button
        className="bg-blue-500 text-white px-4 rounded-md py-2"
        onClick={increment}
      >
        +1
      </button>

      <button
        className="bg-blue-500 text-white px-4 rounded-md py-2"
        onClick={increment2}
      >
        +1 - Counter2
      </button>
    </div>
  );
};
