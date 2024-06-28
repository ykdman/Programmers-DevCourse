import React from "react";

type MyWeatherType = {
  weather: string;
  children: React.ReactNode;
};

function MyWeather({ children, weather }: MyWeatherType): JSX.Element {
  return (
    <div>
      <p>{children}</p>
      오늘의 날씨는 {weather} 입니다.
    </div>
  );
}
export default MyWeather;
