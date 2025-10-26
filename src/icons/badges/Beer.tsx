import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../interface";

const Beer = ({
  width = 24,
  height = 24,
  color = "",

  ...props
}: IconProps) => (
  <Svg
    viewBox="0 0 12 12"
    fill="none"
    width={width}
    height={height}
    color={color}
    {...props}
  >
    <Path
      d="M2.25 3.375H9V9.75C9 9.84946 8.96049 9.94484 8.89017 10.0152C8.81984 10.0855 8.72446 10.125 8.625 10.125H2.625C2.52554 10.125 2.43016 10.0855 2.35984 10.0152C2.28951 9.94484 2.25 9.84946 2.25 9.75V3.375Z"
      stroke="#F46A25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
    <Path
      d="M9 4.5H10.125C10.3239 4.5 10.5147 4.57902 10.6553 4.71967C10.796 4.86032 10.875 5.05109 10.875 5.25V8.25C10.875 8.44891 10.796 8.63968 10.6553 8.78033C10.5147 8.92098 10.3239 9 10.125 9H9"
      stroke="#F46A25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
    <Path
      d="M4.5 4.875V8.625"
      stroke="#F46A25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
    <Path
      d="M6.75 4.875V8.625"
      stroke="#F46A25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
    <Path
      d="M2.25 3.375C2.25 2.13234 3.42516 1.125 4.875 1.125C5.65266 1.125 6.35109 1.41469 6.83156 1.875H7.5C7.89782 1.875 8.27936 2.03304 8.56066 2.31434C8.84196 2.59564 9 2.97718 9 3.375"
      stroke="#F46A25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  </Svg>
);
export default Beer;
