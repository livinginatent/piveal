import { normalize } from "@/src/theme/normalize";
import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const FacebookIcon = (props: any) => (
  <Svg width={normalize('height',44)}
      height={normalize('height',44)} fill="none" viewBox="0 0 44 44">
    <Rect x="0.5" y="0.5" fill="#fff" stroke="#EBE7F2" rx="21.5"></Rect>
    <Path
      fill="#3B65BF"
      d="M20.054 31.167v-8.363H17.24v-3.26h2.814v-2.403c0-2.789 1.704-4.308 4.192-4.308 1.192 0 2.216.09 2.515.129v2.915h-1.726c-1.353 0-1.616.643-1.616 1.587v2.08h3.228l-.42 3.26h-2.808v8.363z"
    ></Path>
  </Svg>
);

export default FacebookIcon;
