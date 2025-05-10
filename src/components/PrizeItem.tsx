import type { FC } from "react";

const imgArray = ["GoldCup.png", "SilverCup.png", "BronceCup.png"];
const placeText = ["1er Lugar", "2° Lugar", "3er Lugar"];
const prizeArray = ["$1000", "$300", "$200"];
const bgColorArray = ["text-yellow-400", "text-gray-300", "text-orange-400"];

interface PrizeItemProps {
  position?: number;
}

const PrizeItem: FC<PrizeItemProps> = ({ position }) => {
  if (position === undefined) {
    return (
      <section className="flex flex-col items-center mt-10 mb-8  relative z-0 overflow-visible">
        <h2 className="text-white text-[5rem] font-extrabold tracking-wide z-10 mb-5">
          PREMIOS
        </h2>

        <div className="flex justify-center items-end gap-32 relative z-10">
          <PrizeItem position={1} />
          <PrizeItem position={0} />
          <PrizeItem position={2} />
        </div>
      </section>
    );
  }

  const imgUri = `/assets/${imgArray[position]}`;
  const place = placeText[position];
  const prize = prizeArray[position];
  const textColor = bgColorArray[position];

  // ✅ Tamaños doblados
  const imgSize = position === 0 ? "w-54 h-54" : "w-48 h-48";
  const prizeTextSize = position === 0 ? "text-[6rem]" : "text-[4.5rem]";
  const placeTextSize = position === 0 ? "text-5xl" : "text-4xl";
  const width = position === 0 ? "w-[28rem]" : "w-[20rem]";
  const px = position === 0 ? "px-16" : "px-12";
  const py = position === 0 ? "py-15" : "py-12";
  const trophyOffset = "-mb-26";

  return (
    <div className="flex flex-col items-center relative">
      <img
        src={imgUri}
        alt="Trophy"
        className={`${imgSize} ${trophyOffset} z-10 relative`}
      />
      <div
        className={`bg-neutral-800 rounded-[100px] ${px} ${py} text-center ${width} shadow-lg z-0 translate-y-10`}
      >
        <div className={`text-white ${placeTextSize} font-bold mb-4`}>{place}</div>
        <div className={`${textColor} ${prizeTextSize} font-black`}>{prize}</div>
      </div>
    </div>
  );
};

export default PrizeItem;
