/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Notification = (props:any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9 21H15"
      stroke="#F46A25"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.25037 9.75C5.25037 7.95979 5.96153 6.2429 7.2274 4.97703C8.49327 3.71116 10.2102 3 12.0004 3C13.7906 3 15.5075 3.71116 16.7733 4.97703C18.0392 6.2429 18.7504 7.95979 18.7504 9.75C18.7504 13.1081 19.5285 15.8063 20.1472 16.875C20.213 16.9888 20.2476 17.1179 20.2477 17.2493C20.2478 17.3808 20.2134 17.5099 20.1479 17.6239C20.0824 17.7378 19.9881 17.8325 19.8744 17.8985C19.7608 17.9645 19.6318 17.9995 19.5004 18H4.50037C4.3691 17.9992 4.24034 17.964 4.12695 17.8978C4.01357 17.8317 3.91953 17.7369 3.85423 17.6231C3.78894 17.5092 3.75468 17.3801 3.75488 17.2489C3.75508 17.1176 3.78973 16.9887 3.85537 16.875C4.47318 15.8063 5.25037 13.1072 5.25037 9.75Z"
      stroke="#F46A25"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Notification;
