import React from 'react';
import { useTransition, animated } from '@react-spring/web';

// interface AlertItem {
//   color: string,
//   header: string,
//   text: string
// }

// interface props {
//   items: AlertItem[],
//   setter: any,
//   messageDelayMs: number
// }

const AlertStyles = {
  width: "400px",
  height: "130px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "20px",
  boxShadow: "1px 1px 15px grey",
  margin: "15px"
};
const AlertHandler = ({ items, setter, messageDelayMs }) => {
  const transitions = useTransition(items, {
    from: { opacity: 0, transform: "translateY(-100px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(100px)" },
    delay: 200,
    onRest: () => {
      setTimeout(() => { setter(prev => ([...prev.filter((p, i) => i != prev.filter.length - 1)])); }, messageDelayMs);
    },
  });
  return (
    React.createElement("div", { style: { display: 'flex', flexDirection: "column-reverse", alignItems: "center", position: "fixed", zIndex: 999, bottom: 0, left: 0, right: 0 } },
      transitions(({ opacity, transform }, item) => (React.createElement(animated.div, { style: Object.assign(Object.assign({}, AlertStyles), { backgroundColor: item.color, opacity: opacity.to(y => y), transform: transform.to(z => z) }) },
        React.createElement("div", { style: { width: "100%", height: "30px", backgroundColor: item.color, borderRadius: "0 15px" } },
          React.createElement("p", { style: { textAlign: "center", fontFamily: "Martel", fontWeight: 800, fontSize: "1.8em", marginTop: "2px" } }, item.header)),
        React.createElement("div", { style: { width: "100%", height: "100px", display: "flex", justifyContent: "center" } },
          React.createElement("p", { style: { margin: "25px 10px 0 10px", textAlign: "justify", fontFamily: "Martel", fontSize: ".9em", lineHeight: "1.4em" } }, item.text)))))));
};
export default AlertHandler;
