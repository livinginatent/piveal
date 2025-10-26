import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../interface";
const New = ({
  width = 24,
  height = 24,
  color = "",

  ...props
}: IconProps) => (
  <Svg width={width} height={height} color={color} viewBox="0 0 12 12" fill="none" {...props}>
    <Path
      d="M6 8.25C8.07107 8.25 9.75 6.57107 9.75 4.5C9.75 2.42893 8.07107 0.75 6 0.75C3.92893 0.75 2.25 2.42893 2.25 4.5C2.25 6.57107 3.92893 8.25 6 8.25Z"
      stroke="#673AB7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
    <Path
      d="M6 6.75C7.24264 6.75 8.25 5.74264 8.25 4.5C8.25 3.25736 7.24264 2.25 6 2.25C4.75736 2.25 3.75 3.25736 3.75 4.5C3.75 5.74264 4.75736 6.75 6 6.75Z"
      stroke="#673AB7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
    <Path
      d="M8.25 7.5V11.25L5.99953 10.125L3.75 11.25V7.50047"
      stroke="#673AB7"
      strokeLinecap="round"
      {...props}
      strokeLinejoin="round"
    />
  </Svg>
);
export default New;
