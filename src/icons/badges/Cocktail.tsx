import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../interface";
const Cocktail = ({
  width = 24,
  height = 24,
  color = "",

  ...props
}: IconProps) => (
  <Svg
    width={width}
    height={height}
    color={color}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <Path
      d="M1.125 1.875H10.875L6 6.75L1.125 1.875Z"
      stroke="#10B981"
      strokeLinecap="round"
      strokeLinejoin="round"
       {...props}
    />
    <Path
      d="M6 6.75V10.125"
      stroke="#10B981"
      strokeLinecap="round"
      strokeLinejoin="round"
       {...props}
    />
    <Path
      d="M4.125 10.125H7.875"
      stroke="#10B981"
      strokeLinecap="round"
      strokeLinejoin="round"
       {...props}
    />
    <Path
      d="M2.625 3.375H9.375"
      stroke="#10B981"
      strokeLinecap="round"
      strokeLinejoin="round"
       {...props}
    />
  </Svg>
);
export default Cocktail;
