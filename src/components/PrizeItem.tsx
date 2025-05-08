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
        <section className="flex flex-col items-center mt-25 mb-40 gap-10 relative z-0 overflow-visible">

          <h2 className="text-white text-8xl font-extrabold tracking-wide z-10 mb-24">
  PREMIOS
</h2>
      

<div className="flex justify-center items-end gap-16 scale-[2] relative z-10">
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

  return (
    <div className="flex flex-col items-center relative">
      <img
        src={imgUri}
        alt="Trophy"
        className="w-32 h-32 -mb-15 z-10 relative"
      />
<div className="bg-neutral-800 rounded-[50px] px-8 py-10 text-center w-64 shadow-lg z-0 translate-y-5">
        <div className="text-white text-2xl font-bold mb-2">{place}</div>
        <div className={`${textColor} text-5xl font-black`}>{prize}</div>
      </div>
    </div>
  );
};

export default PrizeItem;
