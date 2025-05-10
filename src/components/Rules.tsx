import { useState, type FC } from "react";
import { rulesFile } from "../utils/rulesFile";



const Rules: FC = () => {
  const [show, setShow] = useState(false);

  return (
    <section className="w-full px-4 py-12 text-white text-center">
      <button
        onClick={() => setShow(!show)}
        className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold text-xl px-25 py-2 rounded-full shadow-md transition duration-300 ease-in-out"
      >
        {show ? "Ocultar reglas" : "Mostrar reglas"}
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          show ? "max-h-[4000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl p-6 shadow-md text-left space-y-2">
          <ol className="list-none space-y-1 text-sm leading-relaxed">
            {rulesFile.map((rule, idx) => {
              const isSectionTitle = /^\D*\d+\./.test(rule);
              return (
                <li
                  key={idx}
                  className={
                    isSectionTitle
                      ? "text-center font-bold text-cyan-300 text-2xl mt-6 mb-4"
                      : ""
                  }
                >
                  {rule}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Rules;
