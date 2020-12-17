import React from 'react';

const bookmark = (props) => (
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill={props.fill || "#000000"} stroke="none">
<path d="M1342 5096 c-146 -55 -249 -182 -273 -338 -6 -39 -8 -936 -7 -2381
l3 -2319 33 -29 c25 -23 42 -29 77 -29 37 0 54 7 112 52 37 29 339 261 670
515 l603 464 603 -464 c331 -254 633 -486 670 -515 58 -45 75 -52 112 -52 35
0 52 6 77 29 l33 29 3 2319 c1 1445 -1 2342 -7 2381 -24 159 -134 291 -283
341 -62 21 -68 21 -1212 20 l-1151 0 -63 -23z"/>
</g>
</svg>
);

export default bookmark;