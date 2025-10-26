import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../interface";
const HeartOutlined = ({
  width = 24,
  height = 24,
  color = "",

  ...props
}: IconProps) => (
  <Svg
    width={width}
    height={height}
    color={color}
    viewBox="0 0 15 13"
    fill="none"
    {...props}
  >
    <Path
      d="M7.25 11.75C7.25 11.75 0.75 8.25 0.75 4.125C0.75 3.22989 1.10558 2.37145 1.73851 1.73851C2.37145 1.10558 3.22989 0.75 4.125 0.75C5.53688 0.75 6.74625 1.51937 7.25 2.75C7.75375 1.51937 8.96312 0.75 10.375 0.75C11.2701 0.75 12.1285 1.10558 12.7615 1.73851C13.3944 2.37145 13.75 3.22989 13.75 4.125C13.75 8.25 7.25 11.75 7.25 11.75Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default HeartOutlined;
