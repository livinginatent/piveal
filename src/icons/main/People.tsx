import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../interface";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const People = ({
  width = 24,
  height = 24,
  color = "",

  ...props
}: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    color={color}
    fill="none"
    {...props}
  >
    <Path
      d="M10.5 19.9963C14.0899 19.9963 17 17.0862 17 13.4963C17 9.90649 14.0899 6.99634 10.5 6.99634C6.91015 6.99634 4 9.90649 4 13.4963C4 17.0862 6.91015 19.9963 10.5 19.9963Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
    <Path
      d="M1.27832 24.9963C2.27718 23.4605 3.64382 22.1985 5.25415 21.3249C6.86449 20.4512 8.66752 19.9937 10.4996 19.9937C12.3316 19.9937 14.1347 20.4512 15.745 21.3249C17.3553 22.1985 18.722 23.4605 19.7208 24.9963"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
    <Path
      d="M21.5 19.9963C23.332 19.9953 25.1351 20.4521 26.7456 21.3253C28.356 22.1986 29.7227 23.4605 30.7213 24.9963"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
    <Path
      d="M19.0859 7.45884C19.9751 7.10421 20.9316 6.95034 21.8871 7.00824C22.8426 7.06613 23.7735 7.33436 24.6133 7.79375C25.4532 8.25315 26.1811 8.89236 26.7453 9.66573C27.3094 10.4391 27.6958 11.3275 27.8767 12.2675C28.0577 13.2075 28.0288 14.1759 27.7922 15.1034C27.5555 16.0309 27.1169 16.8948 26.5076 17.6331C25.8984 18.3715 25.1336 18.9662 24.2679 19.3747C23.4022 19.7832 22.4569 19.9955 21.4997 19.9963"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  </Svg>
);
export default People;
