import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../interface";
const Tea = ({
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
      d="M3.90469 10.125C3.18697 9.79567 2.57886 9.26726 2.1526 8.60252C1.72634 7.93779 1.49984 7.16467 1.5 6.375V4.125H9.75V6.375C9.75016 7.16467 9.52366 7.93779 9.0974 8.60252C8.67114 9.26726 8.06303 9.79567 7.34531 10.125"
      stroke="#103DB9"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
    <Path
      d="M4.125 1.125V2.625"
      stroke="#103DB9"
      strokeLinecap="round"
      strokeLinejoin="round"
       {...props}
    />
    <Path
      d="M5.625 1.125V2.625"
      stroke="#103DB9"
      strokeLinecap="round"
      strokeLinejoin="round"
       {...props}
    />
    <Path
      d="M7.125 1.125V2.625"
      stroke="#103DB9"
      strokeLinecap="round"
      strokeLinejoin="round"
       {...props}
    />
    <Path
      d="M1.5 10.125H9.75"
      stroke="#103DB9"
      strokeLinecap="round"
      strokeLinejoin="round"
       {...props}
    />
    <Path
      d="M9.75023 4.125C10.1481 4.125 10.5296 4.28304 10.8109 4.56434C11.0922 4.84564 11.2502 5.22718 11.2502 5.625V6C11.2502 6.39782 11.0922 6.77936 10.8109 7.06066C10.5296 7.34196 10.1481 7.5 9.75023 7.5H9.5918"
      stroke="#103DB9"
      strokeLinecap="round"
      strokeLinejoin="round"
       {...props}
    />
  </Svg>
);
export default Tea;
