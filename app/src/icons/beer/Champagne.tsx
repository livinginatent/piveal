import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Champagne = (props) => (
  <Svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.5 22.5H14"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.65956 1.5H13.8408C13.8408 1.5 18.7158 16.5 11.7502 16.5C4.78456 16.5 9.65956 1.5 9.65956 1.5Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.75 16.5V22.5"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.125 5.8125C21.6428 5.8125 22.0625 5.39277 22.0625 4.875C22.0625 4.35723 21.6428 3.9375 21.125 3.9375C20.6072 3.9375 20.1875 4.35723 20.1875 4.875C20.1875 5.39277 20.6072 5.8125 21.125 5.8125Z"
      fill="#F46A25"
    />
    <Path
      d="M18.875 2.8125C19.3928 2.8125 19.8125 2.39277 19.8125 1.875C19.8125 1.35723 19.3928 0.9375 18.875 0.9375C18.3572 0.9375 17.9375 1.35723 17.9375 1.875C17.9375 2.39277 18.3572 2.8125 18.875 2.8125Z"
      fill="#F46A25"
    />
    <Path
      d="M18.875 10.3125C19.3928 10.3125 19.8125 9.89277 19.8125 9.375C19.8125 8.85723 19.3928 8.4375 18.875 8.4375C18.3572 8.4375 17.9375 8.85723 17.9375 9.375C17.9375 9.89277 18.3572 10.3125 18.875 10.3125Z"
      fill="#F46A25"
    />
    <Path
      d="M8.39355 6.75H15.1061"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Champagne;
