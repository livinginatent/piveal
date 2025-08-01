import * as React from "react";
import Svg, { Path } from "react-native-svg";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Connect = (props: any) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15.6211 10.6213H19.3711"
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.4961 8.74634V12.4963"
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.43359 12.4963C11.0224 12.4963 13.1211 10.3977 13.1211 7.80884C13.1211 5.22 11.0224 3.12134 8.43359 3.12134C5.84476 3.12134 3.74609 5.22 3.74609 7.80884C3.74609 10.3977 5.84476 12.4963 8.43359 12.4963Z"
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.87109 15.6213C3.47656 13.7112 5.74297 12.4963 8.43359 12.4963C11.1242 12.4963 13.3906 13.7112 14.9961 15.6213"
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Connect;
