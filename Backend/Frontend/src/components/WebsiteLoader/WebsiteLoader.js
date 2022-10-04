/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from "react";
import { motion } from "framer-motion";
import "./WebsiteLoader.css";
const svgVariants = {
  start: {
    opacity: 0,
    pathLength: 0,
  },
  finished: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 3,
      ease: "easeOut",
    },
  },
};

const WebsiteLoader = () => {
  return (
    <div className="app__Loader">
      <svg
        width="575"
        height="308"
        viewBox="0 0 575 308"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M543.701 203.9H492.301C490.101 203.9 488.301 202.1 488.301 199.9V108.9C488.301 106.7 490.101 104.9 492.301 104.9H543.701C545.901 104.9 547.701 106.7 547.701 108.9V199.9C547.701 202.1 545.901 203.9 543.701 203.9Z"
          fill="#F8F8F8"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          opacity="0.81"
          d="M504.401 187.8L521.701 204H543.601C545.801 204 547.601 202.2 547.601 200V169.8L531.801 160.5L504.401 187.8Z"
          fill="#C1C1C1"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          opacity="0.85"
          d="M527.901 149.4H507.301C505.101 149.4 503.301 147.6 503.301 145.4V124.8C503.301 122.6 505.101 120.8 507.301 120.8H527.901C530.101 120.8 531.901 122.6 531.901 124.8V145.4C531.901 147.6 530.101 149.4 527.901 149.4Z"
          fill="#DDDDDD"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M530.901 189H510.301C508.101 189 506.301 187.2 506.301 185V164.4C506.301 162.2 508.101 160.4 510.301 160.4H530.901C533.101 160.4 534.901 162.2 534.901 164.4V185C534.901 187.2 533.101 189 530.901 189Z"
          fill="#030303"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M519.901 180.1V221.2C519.901 227.7 525.201 233 531.701 233H545.401C551.901 233 557.201 238.3 557.201 244.8C557.201 251.3 551.901 256.6 545.401 256.6H395.801"
          stroke="black"
          stroke-width="8"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M563.6 307.4H10.9C4.89999 307.4 0 302.5 0 296.5V272C0 266 4.89999 261.1 10.9 261.1H563.7C569.7 261.1 574.6 266 574.6 272V296.5C574.5 302.5 569.6 307.4 563.6 307.4Z"
          fill="#D17F4D"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M563.6 307.4H10.9C4.89999 307.4 0 302.5 0 296.5V272C0 266 4.89999 261.1 10.9 261.1H563.7C569.7 261.1 574.6 266 574.6 272V296.5C574.5 302.5 569.6 307.4 563.6 307.4Z"
          fill="#D17F4D"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M362.502 106.9H164.602V46.1C164.602 40.6 169.102 36.1 174.602 36.1H352.402C357.902 36.1 362.402 40.6 362.402 46.1V106.9H362.502Z"
          fill="#B3B3B3"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M355.801 106.9H157.901V46.1C157.901 40.6 162.401 36.1 167.901 36.1H345.801C351.301 36.1 355.801 40.6 355.801 46.1V106.9Z"
          fill="#D7D7D7"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M355.801 88.8L337.701 76.3V119.1H355.801V88.8Z"
          fill="#C1C1C1"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M328.602 106.9H189.602V7C189.602 3.1 192.702 0 196.602 0H322.602C325.902 0 328.602 2.7 328.602 6V106.9Z"
          fill="#E7E7E7"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M324.701 106.9H183.801V7C183.801 3.1 186.901 0 190.801 0H318.701C322.001 0 324.701 2.7 324.701 6V106.9Z"
          fill="#F8F8F8"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M173.101 119.1H143.701V88.3C143.701 81.7 149.101 76.3 155.701 76.3H173.101V119.1Z"
          fill="#DFE1E0"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M183.301 119.1H153.901V88.3C153.901 81.7 159.301 76.3 165.901 76.3H183.301V119.1Z"
          fill="#B3B3B3"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M327.502 119.1H298.102V88.3C298.102 81.7 303.502 76.3 310.102 76.3H327.502V119.1Z"
          fill="#DFE1E0"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M337.701 119.1H308.301V88.3C308.301 81.7 313.701 76.3 320.301 76.3H337.701V119.1Z"
          fill="#B3B3B3"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M183.301 76.3L245.101 119.1H201.401H183.301V76.3Z"
          fill="#C1C1C1"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M453.402 202.3H72.602V235.8H453.402V202.3Z"
          fill="#030303"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M343.901 161.5H75.401V242.9H343.901V161.5Z"
          fill="#272727"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M304.101 258.5H138.301V192.4H292.201V228.2L304.101 235.6V258.5Z"
          fill="black"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M297.901 178.2H166.401C155.601 178.2 146.901 186.9 146.901 197.7V236.7H164.801V202.8C164.801 198 168.701 194.1 173.501 194.1H190.401C193.101 194.1 195.301 196.3 195.301 199V201.3H214.701C216.001 201.3 217.001 200.2 217.001 199C217.001 196.3 219.201 194.1 221.901 194.1H242.601C245.301 194.1 247.501 196.3 247.501 199V201.3H266.901C268.201 201.3 269.201 200.2 269.201 199C269.201 196.3 271.401 194.1 274.101 194.1H291.001C295.801 194.1 299.701 198 299.701 202.8V212.8H317.601V197.7C317.401 186.9 308.701 178.2 297.901 178.2Z"
          fill="#212121"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M282.102 178.2H150.602C139.802 178.2 131.102 186.9 131.102 197.7V236.7H149.002V202.8C149.002 198 152.902 194.1 157.702 194.1H174.602C177.302 194.1 179.502 196.3 179.502 199C179.502 200.3 180.602 201.3 181.802 201.3H198.802C200.102 201.3 201.102 200.2 201.102 199C201.102 196.3 203.302 194.1 206.002 194.1H226.702C229.402 194.1 231.602 196.3 231.602 199C231.602 200.3 232.702 201.3 233.902 201.3H250.902C252.202 201.3 253.202 200.2 253.202 199C253.202 196.3 255.402 194.1 258.102 194.1H275.002C279.802 194.1 283.702 198 283.702 202.8V212.8H301.602V197.7C301.602 186.9 292.802 178.2 282.102 178.2Z"
          fill="#4C4C4C"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M280.802 232.7H121.602V261.1H284.502H319.702C303.702 261.1 285.602 249.8 280.802 232.7Z"
          fill="#272727"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M278.5 236.9L280.7 232.7H256.1L253.5 238.5L278.5 236.9Z"
          fill="#212121"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M278.5 236.9H120.5V261.1H283.4H318.6C302.6 261.1 283.3 251.5 278.5 236.9Z"
          fill="#4C4C4C"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          opacity="0.2"
          d="M263.201 226.3H146.301C133.101 226.3 122.301 237 122.301 250.3V268.9V286.7C122.301 291.7 126.401 295.8 131.401 295.8H245.601C255.301 295.8 263.201 287.9 263.201 278.2V255.2C263.201 242 273.901 231.2 287.201 231.2H294.901V226.3H263.201Z"
          fill="#020202"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M427.001 107H99.001C79.601 107 63.801 122.8 63.801 142.2V215.9H120.701V196.1C120.701 186.4 128.601 178.5 138.301 178.5H266.001C275.701 178.5 283.601 186.4 283.601 196.1V215.9H462.201V142.2C462.201 122.8 446.401 107 427.001 107Z"
          fill="#3E3E3E"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M462.201 216V142.3C462.201 122.9 446.401 107.1 427.001 107.1H376.401C357.001 107.1 341.201 122.9 341.201 142.3V216H462.201Z"
          fill="#2C2C2C"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M454.5 216V142.3C454.5 128.9 443.6 118.1 430.3 118.1H379.7C366.3 118.1 355.5 129 355.5 142.3V216H454.5Z"
          fill="#3E3E3E"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M451.201 216V142.3C451.201 128.9 440.301 118.1 427.001 118.1H376.401C363.001 118.1 352.201 129 352.201 142.3V216H451.201Z"
          fill="#121212"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M563.602 307.4H411.502C405.502 307.4 400.602 302.5 400.602 296.5V272C400.602 266 405.502 261.1 411.502 261.1H563.602C569.602 261.1 574.502 266 574.502 272V296.5C574.502 302.5 569.602 307.4 563.602 307.4Z"
          fill="#A55137"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M197.601 210.3H182.701V218.6H197.601V210.3Z"
          fill="#212121"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M258.601 210.3H243.701V218.6H258.601V210.3Z"
          fill="#212121"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M184.4 210.3H169.5V218.6H184.4V210.3Z"
          fill="#4C4C4C"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M245.301 210.3H230.401V216H245.301V210.3Z"
          fill="#4C4C4C"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M245.301 215.5H184.401V218.6H245.301V215.5Z"
          fill="#4C4C4C"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M322.8 107H96.5V110.1C96.5 128.7 111.6 143.8 130.2 143.8H289C307.6 143.8 322.7 128.7 322.7 110.1V107H322.8Z"
          fill="#4C4C4C"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M130.201 136.2H289.001C306.101 136.2 320.201 123.5 322.401 107H96.801C99.001 123.5 113.101 136.2 130.201 136.2Z"
          fill="#0E0E0E"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M143.701 128.3H134.601C133.401 128.3 132.401 127.3 132.401 126.1V125.7C132.401 124.5 133.401 123.5 134.601 123.5H143.701C144.901 123.5 145.901 124.5 145.901 125.7V126.1C145.901 127.3 144.901 128.3 143.701 128.3Z"
          fill="#17E09C"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M153.801 128.3H151.501C150.301 128.3 149.301 127.3 149.301 126.1V125.7C149.301 124.5 150.301 123.5 151.501 123.5H153.801C155.001 123.5 156.001 124.5 156.001 125.7V126.1C156.001 127.3 155.001 128.3 153.801 128.3Z"
          fill="#932B3A"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M283.901 125.5H208.501C205.701 125.5 203.401 123.2 203.401 120.4V119.4C203.401 116.6 205.701 114.3 208.501 114.3H283.901C286.701 114.3 289.001 116.6 289.001 119.4V120.4C288.901 123.2 286.701 125.5 283.901 125.5Z"
          fill="#1F1F1F"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M223.801 125.5H208.501C205.701 125.5 203.401 123.2 203.401 120.4V119.4C203.401 116.6 205.701 114.3 208.501 114.3H223.801C226.601 114.3 228.901 116.6 228.901 119.4V120.4C228.901 123.2 226.601 125.5 223.801 125.5Z"
          fill="#313131"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M228.701 143.9H157.401C155.501 143.9 153.901 142.3 153.901 140.4V139.7C153.901 137.8 155.501 136.2 157.401 136.2H228.701C230.601 136.2 232.201 137.8 232.201 139.7V140.4C232.201 142.3 230.601 143.9 228.701 143.9Z"
          fill="#5A5A5A"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M185.001 143.9H167.401C165.501 143.9 163.901 142.3 163.901 140.4V139.7C163.901 137.8 165.501 136.2 167.401 136.2H185.001C186.901 136.2 188.501 137.8 188.501 139.7V140.4C188.501 142.3 186.901 143.9 185.001 143.9Z"
          fill="#676767"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M120.701 221.5H63.801V225.9C63.801 245.3 79.601 261.1 99.001 261.1H120.601V221.5H120.701Z"
          fill="#3E3E3E"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M111 232.5H73.5C71.6 232.5 70 230.9 70 229V228.3C70 226.4 71.6 224.8 73.5 224.8H111C112.9 224.8 114.5 226.4 114.5 228.3V229C114.5 230.9 112.9 232.5 111 232.5Z"
          fill="#4D4D4D"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M298.101 124C300.145 124 301.801 122.343 301.801 120.3C301.801 118.257 300.145 116.6 298.101 116.6C296.058 116.6 294.401 118.257 294.401 120.3C294.401 122.343 296.058 124 298.101 124Z"
          fill="#BA8F1C"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M252.201 218.5H135.301C122.101 218.5 111.301 229.2 111.301 242.5V261.1H182.701V288.1H234.501C244.201 288.1 252.101 280.2 252.101 270.5V247.5C252.101 234.3 262.801 223.5 276.101 223.5H292.301V218.6H252.201V218.5Z"
          fill="#F8F8F8"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          opacity="0.85"
          d="M171.501 231.4H138.401C137.001 231.4 135.901 230.3 135.901 228.9V228.4C135.901 227 137.001 225.9 138.401 225.9H171.501C172.901 225.9 174.001 227 174.001 228.4V228.9C174.001 230.3 172.901 231.4 171.501 231.4Z"
          fill="#DDDDDD"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          opacity="0.85"
          d="M195.9 231.4H179.5C178.1 231.4 177 230.3 177 228.9V228.4C177 227 178.1 225.9 179.5 225.9H195.9C197.3 225.9 198.4 227 198.4 228.4V228.9C198.4 230.3 197.3 231.4 195.9 231.4Z"
          fill="#DDDDDD"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          opacity="0.85"
          d="M224.601 231.4H208.201C206.801 231.4 205.701 230.3 205.701 228.9V228.4C205.701 227 206.801 225.9 208.201 225.9H224.601C226.001 225.9 227.101 227 227.101 228.4V228.9C227.101 230.3 225.901 231.4 224.601 231.4Z"
          fill="#DDDDDD"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          opacity="0.85"
          d="M181.601 242.9H132.401C131.001 242.9 129.901 241.8 129.901 240.4V239.9C129.901 238.5 131.001 237.4 132.401 237.4H181.601C183.001 237.4 184.101 238.5 184.101 239.9V240.4C184.101 241.8 183.001 242.9 181.601 242.9Z"
          fill="#DDDDDD"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          opacity="0.85"
          d="M218.201 242.9H196.801C195.401 242.9 194.301 241.8 194.301 240.4V239.9C194.301 238.5 195.401 237.4 196.801 237.4H218.201C219.601 237.4 220.701 238.5 220.701 239.9V240.4C220.701 241.8 219.601 242.9 218.201 242.9Z"
          fill="#DDDDDD"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M220.302 270.5V265.6C220.302 261.7 217.102 258.6 213.302 258.6H103.602C99.702 258.6 96.602 261.8 96.602 265.6V270.5C96.602 280.2 104.502 288.1 114.202 288.1H237.502C227.902 287.8 220.302 280 220.302 270.5Z"
          fill="#E7E7E7"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M563.602 307.4H411.502C405.502 307.4 400.602 302.5 400.602 296.5V272C400.602 266 405.502 261.1 411.502 261.1H563.602C569.602 261.1 574.502 266 574.502 272V296.5C574.502 302.5 569.602 307.4 563.602 307.4Z"
          fill="#A55137"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M283.5 221.5V225.9C283.5 245.3 299.3 261.1 318.7 261.1H426.9C446.3 261.1 462.1 245.3 462.1 225.9V221.5H283.5Z"
          fill="#3E3E3E"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M341.102 221.5V225.9C341.102 245.3 356.902 261.1 376.302 261.1H426.902C446.302 261.1 462.102 245.3 462.102 225.9V221.5H341.102Z"
          fill="#2C2C2C"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M355.401 221.5V225.9C355.401 239.3 366.301 250.1 379.601 250.1H430.201C443.601 250.1 454.401 239.2 454.401 225.9V221.5H355.401Z"
          fill="#3E3E3E"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M352.102 221.5V225.9C352.102 239.3 363.002 250.1 376.302 250.1H426.902C440.302 250.1 451.102 239.2 451.102 225.9V221.5H352.102Z"
          fill="#121212"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M330.301 232.5H292.801C290.901 232.5 289.301 230.9 289.301 229V228.3C289.301 226.4 290.901 224.8 292.801 224.8H330.301C332.201 224.8 333.801 226.4 333.801 228.3V229C333.801 230.9 332.201 232.5 330.301 232.5Z"
          fill="#4D4D4D"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M209.501 171H196.801C194.901 171 193.401 169.5 193.401 167.6V157.8C193.401 155.9 194.901 154.4 196.801 154.4H209.501C211.401 154.4 212.901 155.9 212.901 157.8V167.6C212.901 169.5 211.401 171 209.501 171Z"
          fill="#0E0E0E"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M206.202 171H193.502C191.602 171 190.102 169.5 190.102 167.6V157.8C190.102 155.9 191.602 154.4 193.502 154.4H206.202C208.102 154.4 209.602 155.9 209.602 157.8V167.6C209.602 169.5 208.102 171 206.202 171Z"
          fill="#B3B3B3"
        />
        <g opacity="0.54">
          <motion.path
            initial="start"
            animate="finished"
            variants={svgVariants}
            opacity="0.54"
            d="M514.601 140.1H511.201C510.701 140.1 510.401 139.7 510.401 139.3V137.9C510.401 137.4 510.801 137.1 511.201 137.1H514.601C515.101 137.1 515.401 137.5 515.401 137.9V139.3C515.401 139.8 515.001 140.1 514.601 140.1Z"
            fill="#0E0E0E"
          />
          <motion.path
            initial="start"
            animate="finished"
            variants={svgVariants}
            opacity="0.54"
            d="M524.001 140.1H520.601C520.101 140.1 519.801 139.7 519.801 139.3V137.9C519.801 137.4 520.201 137.1 520.601 137.1H524.001C524.501 137.1 524.801 137.5 524.801 137.9V139.3C524.901 139.8 524.501 140.1 524.001 140.1Z"
            fill="#0E0E0E"
          />
        </g>
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          opacity="0.54"
          d="M518.6 128.7H516.5V131.6H518.6V128.7Z"
          fill="#0E0E0E"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M527.901 189H507.301C505.101 189 503.301 187.2 503.301 185V164.4C503.301 162.2 505.101 160.4 507.301 160.4H527.901C530.101 160.4 531.901 162.2 531.901 164.4V185C531.901 187.2 530.101 189 527.901 189Z"
          fill="#121212"
        />
        <motion.path
          initial="start"
          animate="finished"
          variants={svgVariants}
          d="M212.426 30.0062C212.009 31.0791 211.369 31.8656 210.504 32.3656C209.64 32.8552 208.384 33.1 206.738 33.1H205.676V29.3187H205.942C206.66 29.3187 207.233 29.1833 207.66 28.9125C208.077 28.6416 208.374 28.2302 208.551 27.6781C208.728 27.1156 208.817 26.2666 208.817 25.1312V17.4906H205.848V13.7094H216.723C219.723 13.7094 221.874 14.3448 223.176 15.6156C224.488 16.876 225.145 18.9698 225.145 21.8969V33.1H220.91V21.9594C220.91 20.2927 220.572 19.1312 219.895 18.475C219.218 17.8187 218.077 17.4906 216.473 17.4906H213.035V25.6781C213.035 27.4802 212.832 28.9229 212.426 30.0062ZM243.629 23.7875C243.629 29.9958 240.462 33.1 234.129 33.1H228.942V29.3187H233.895C235.759 29.3187 237.14 28.85 238.035 27.9125C238.931 26.975 239.379 25.5479 239.379 23.6312V23.2094C239.379 21.2614 238.931 19.8239 238.035 18.8969C237.14 17.9594 235.78 17.4906 233.957 17.4906H228.942V13.7094H234.348C240.535 13.7094 243.629 16.8031 243.629 22.9906V23.7875ZM260.317 21.8656V33.1H256.082V21.8344C256.082 20.2198 255.733 19.0948 255.035 18.4594C254.348 17.8135 253.186 17.4906 251.551 17.4906H245.051V13.7094H251.801C253.853 13.7094 255.499 13.9854 256.738 14.5375C257.988 15.0791 258.895 15.9489 259.457 17.1469C260.03 18.3344 260.317 19.9073 260.317 21.8656ZM264.488 29.6781C267.186 29.626 269.275 29.3604 270.754 28.8812L265.223 13.7094H269.801L274.41 26.9906C275.202 26.3552 275.832 25.4906 276.301 24.3969C276.78 23.2927 277.129 21.8708 277.348 20.1312C277.567 18.3812 277.676 16.2406 277.676 13.7094H282.02C282.02 18.6989 281.468 22.5844 280.363 25.3656C279.624 27.2406 278.587 28.7823 277.254 29.9906C275.921 31.1885 274.212 32.0948 272.129 32.7094C270.046 33.3239 267.499 33.6989 264.488 33.8344V29.6781ZM296.379 13.6156C299.035 13.6156 300.968 14.3969 302.176 15.9594C303.384 17.5114 303.988 19.9385 303.988 23.2406V33.1H293.91V29.3187H299.738V23.5687C299.738 21.3708 299.473 19.7979 298.942 18.85C298.421 17.8916 297.499 17.4125 296.176 17.4125C294.957 17.4125 293.931 18.0219 293.098 19.2406C292.265 20.4906 291.488 22.5739 290.77 25.4906L288.879 33.1H284.379L286.488 25.0062C286.749 24.0271 286.999 23.1521 287.238 22.3812C287.488 21.6104 287.728 20.9489 287.957 20.3969L284.082 13.9281H288.754L290.223 16.6781C290.848 15.7198 291.702 14.9698 292.785 14.4281C293.879 13.8864 295.077 13.6156 296.379 13.6156ZM209.551 66.4437L208.582 72.1H204.207L205.52 65.6312C205.895 63.8396 206.238 62.5635 206.551 61.8031C206.863 61.0323 207.249 60.4229 207.707 59.975C208.176 59.5166 208.822 59.1104 209.645 58.7562L205.129 52.7094H210.254L216.582 61.475C217.238 60.8812 217.738 60.1833 218.082 59.3812C218.426 58.5791 218.671 57.4958 218.817 56.1312L219.145 52.7094H223.457L223.082 56.4125C222.968 57.4646 222.759 58.3969 222.457 59.2094C222.249 59.7614 221.994 60.2823 221.692 60.7719C221.39 61.251 220.994 61.7614 220.504 62.3031C220.025 62.8344 219.39 63.4541 218.598 64.1625L224.426 72.1H219.332L211.535 61.2875C210.983 61.6104 210.587 62.0791 210.348 62.6937C210.233 63.0062 210.108 63.475 209.973 64.1C209.837 64.725 209.697 65.5062 209.551 66.4437ZM231.792 48.8272V51.5545C231.792 52.2969 231.641 53.0394 231.338 53.7818C231.042 54.5166 230.664 55.2022 230.202 55.8386C229.747 56.4674 229.277 56.9939 228.792 57.4182L226.202 56.1C226.52 55.5545 226.804 54.9219 227.054 54.2022C227.304 53.4826 227.429 52.6 227.429 51.5545V48.8272H231.792ZM237.429 48.8272V51.5545C237.429 52.2969 237.277 53.0394 236.974 53.7818C236.679 54.5166 236.3 55.2022 235.838 55.8386C235.383 56.4674 234.914 56.9939 234.429 57.4182L231.838 56.1C232.156 55.5545 232.44 54.9219 232.69 54.2022C232.94 53.4826 233.065 52.6 233.065 51.5545V48.8272H237.429ZM242.348 68.4906C244.89 67.6573 246.942 66.6052 248.504 65.3344C249.587 64.4698 250.416 63.5271 250.988 62.5062C251.561 61.475 251.848 60.3969 251.848 59.2719C251.848 57.4177 250.686 56.4906 248.363 56.4906H240.426V46.0844H244.738V52.7094H249.067C253.754 52.7094 256.098 54.7562 256.098 58.85C256.098 60.8083 255.634 62.6416 254.707 64.35C253.791 66.0479 252.478 67.5635 250.77 68.8969C248.52 70.6469 245.712 72.0219 242.348 73.0219V68.4906ZM275.442 69.3812V72.1H259.051V68.3187H269.551L257.801 52.7094H262.863L268.785 60.7406C269.473 60.4073 269.968 59.9073 270.27 59.2406C270.582 58.5739 270.801 57.6 270.926 56.3187L271.27 52.7094H275.598L275.27 56.35C275.134 57.7875 274.905 58.9125 274.582 59.725C274.259 60.5166 273.796 61.1885 273.192 61.7406C272.587 62.2927 271.759 62.7823 270.707 63.2094L275.442 69.3812ZM284.082 52.7094V72.1H279.863V52.7094H284.082ZM305.879 60.8656V72.1H301.645V60.8344C301.645 59.2406 301.306 58.1208 300.629 57.475C299.952 56.8187 298.775 56.4906 297.098 56.4906H289.176V52.7094H297.363C299.416 52.7094 301.061 52.9854 302.301 53.5375C303.551 54.0896 304.457 54.9646 305.02 56.1625C305.593 57.35 305.879 58.9177 305.879 60.8656ZM293.707 60.3187V72.1H289.488V60.3187H293.707Z"
          fill="url(#paint0_radial_3_2)"
        />
        <defs>
          <radialGradient
            id="paint0_radial_3_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(204.801 33.1) rotate(22.4428) scale(99.5389 209.032)"
          >
            <stop stopColor="#FF1F01" />
            <stop offset="1" stopColor="#FFC700" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default WebsiteLoader;
