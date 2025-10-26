import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../interface";
const ArrowDown = ({
  width = 24,
  height = 24,
  color = "",

  ...props
}: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    color={color}
    {...props}
  >
    <Path
      d="M8 2.5V13.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.5 9L8 13.5L12.5 9"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ArrowDown;
