import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../interface";
const Wine = ({
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
      d="M9.45797 1.875C9.86287 2.49756 10.0922 3.21788 10.1217 3.95994C10.1513 4.702 9.97994 5.43828 9.6258 6.09105C9.27166 6.74382 8.74787 7.28888 8.1097 7.66871C7.47152 8.04853 6.74265 8.24902 6 8.24902C5.25735 8.24902 4.52848 8.04853 3.89031 7.66871C3.25214 7.28888 2.72834 6.74382 2.3742 6.09105C2.02007 5.43828 1.84873 4.702 1.87827 3.95994C1.9078 3.21788 2.13713 2.49756 2.54203 1.875H9.45797Z"
      stroke="#F42525"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
    <Path
      d="M6 8.25V10.5"
      stroke="#F42525"
      strokeLinecap="round"
      strokeLinejoin="round"
       {...props}
    />
    <Path
      d="M4.125 10.5H7.875"
      stroke="#F42525"
      strokeLinecap="round"
      strokeLinejoin="round"
       {...props}
    />
    <Path
      d="M1.875 4.125H10.125"
      stroke="#F42525"
      strokeLinecap="round"
      strokeLinejoin="round"
       {...props}
    />
  </Svg>
);
export default Wine;
