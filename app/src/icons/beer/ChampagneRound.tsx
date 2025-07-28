import * as React from "react";
import Svg, {
  ForeignObject,
  G,
  Rect,
  Path,
  Defs,
  ClipPath,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: div */
const ChampagneRound = (props) => (
  <Svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ForeignObject x={-4} y={-4} width={56} height={56}></ForeignObject>
    <G data-figma-bg-blur-radius={4}>
      <Rect width={48} height={48} rx={24} fill="#FFAD84" />
      <Path
        d="M20 38H26"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.2124 10H25.7874C25.7874 10 32.2874 30 22.9999 30C13.7124 30 20.2124 10 20.2124 10Z"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23 30V38"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M35.5 16C36.3284 16 37 15.3284 37 14.5C37 13.6716 36.3284 13 35.5 13C34.6716 13 34 13.6716 34 14.5C34 15.3284 34.6716 16 35.5 16Z"
        fill="white"
      />
      <Path
        d="M32.5 12C33.3284 12 34 11.3284 34 10.5C34 9.67157 33.3284 9 32.5 9C31.6716 9 31 9.67157 31 10.5C31 11.3284 31.6716 12 32.5 12Z"
        fill="white"
      />
      <Path
        d="M32.5 22C33.3284 22 34 21.3284 34 20.5C34 19.6716 33.3284 19 32.5 19C31.6716 19 31 19.6716 31 20.5C31 21.3284 31.6716 22 32.5 22Z"
        fill="white"
      />
      <Path
        d="M18.5254 17H27.4754"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="bgblur_0_718_5433_clip_path" transform="translate(4 4)">
        <Rect width={48} height={48} rx={24} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ChampagneRound;
