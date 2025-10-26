import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../interface";
const Check = ({
  width = 24,
  height = 24,
  color = "",

  ...props
}: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    color={color}
    fill="none"
    {...props}
  >
    <Path
      d="M2.5 9L6 12.5L14 4.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Check;
