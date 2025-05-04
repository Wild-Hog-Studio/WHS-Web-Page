import React, { type FC } from "react";

interface LeagueSubscriptionBannerProps {
  bannerConfig: {
    mainTitle: string;
    subTitle: string;
    btnTitle: string;
    onBtnPress: () => void;
  };
}

const LeagueSubscriptionBanner: FC<LeagueSubscriptionBannerProps> = ({
  bannerConfig,
}) => {
  return (
    <div
      className="flex w-full h-[30vh] justify-center items-center px-8"
      style={{
        backgroundImage: "url('./assets/banner-bg.jpg')",
      }}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-white text-4xl font-bold">
          {bannerConfig.mainTitle}
        </div>
        <div className="text-white text-xl font-bold">
          {bannerConfig.subTitle}
        </div>
<button
  className="bg-gray-300 rounded-3xl text-black font-bold text-2xl h-12 px-10 flex items-center justify-center cursor-pointer hover:opacity-70"
  onClick={bannerConfig.onBtnPress}
>
  {bannerConfig.btnTitle}
</button>
      </div>
    </div>
  );
};

export default LeagueSubscriptionBanner;
