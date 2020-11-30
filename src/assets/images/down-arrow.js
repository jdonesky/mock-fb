import React from 'react';
import classes from '../../components/Profile/ProfileHeader/ProfileHeader.css'

const downArrowSvg = (props) => (
   <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet">

   <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
   fill={props.fill || "#000000"} stroke="none">
   <path className={classes.Arrow} d="M156 3715 c-53 -19 -85 -44 -121 -94 -28 -40 -30 -49 -30 -129 0 -75
   3 -93 24 -126 18 -28 369 -315 1205 -984 650 -519 1199 -953 1221 -965 55 -29
   155 -29 210 0 22 12 571 446 1221 965 836 669 1187 956 1205 984 21 33 24 51
   24 126 0 80 -2 89 -30 129 -35 50 -82 84 -134 99 -24 6 -845 10 -2396 10
   -2000 -1 -2366 -3 -2399 -15z"/>
   </g>
   </svg>
);

export default downArrowSvg;