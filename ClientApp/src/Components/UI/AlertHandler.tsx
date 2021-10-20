import React, { useEffect, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import CSS from 'csstype';
import { AlertItem } from '../../Types/alertItem';

const AlertStyles: CSS.Properties = {
  width: "400px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "3px",
  border: "1px dotted lightgrey",
  margin: "15px"
}

/*
Alert handler är intrument för att kommunicera viktiga meddelanden till användaren. Detta
görs med notiser som animeras på skärmen med hjälp av reactSpring. 

För att använda Alerthandler globalt krävs att komponenterna som vill använda sig av tjänsten 
wrappas med AlertProvider. Alert handler stödjer för tillfället bara function components.

AlertHandler tar följande props:
  items: AlertItem[],
  setter: React.Dispatch<React.SetStateAction<AlertItem[]>>,
  messageDelayMs: number

När tillståndet i "items" förändras så animeras dessa automatiskt på skärmen. Det
är viktigt att när man uppdaterar listan att inte ta bort eller ändra tillståndet i
andra AlertItem-objekt som ligger i listan. På så sätt lägger sig alla alerts i kö, 
och animeras efter förhållandet till andra element i listan.

Detta paket är beroende av react-spring för animeringarna och vissa event.
*/


interface alertProps {
  items: AlertItem[],
  setter: React.Dispatch<React.SetStateAction<AlertItem[]>>,
  messageDelayMs: number
}

const AlertHandler = ({ items, setter, messageDelayMs }: alertProps) => {
  const transitions = useTransition(items, {
    from: { opacity: 0, transform: "translateY(-100px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(100px)" },
    delay: 200,
    onRest: () => {
      setTimeout(
        () => { setter(prev => ([...prev.filter((p, i) => i != prev.filter.length - 1)])) }, messageDelayMs)
    },
  })


  return (
    <div style={{ display: 'flex', flexDirection: "column-reverse", alignItems: "center", position: "fixed", zIndex: 999, bottom: 0, left: 0, right: 0 }}>
      {transitions(({ opacity, transform }, item) => (
        <animated.div
          style={{
            ...AlertStyles,
            opacity: opacity.to(y => y),
            transform: transform.to(z => z)
          }}>
          <div style={{ width: "10px", height: "10px", backgroundColor: item.color, position: "absolute", left: "10px" }} />
          <div>
            <p style={{ textAlign: "justify", }}>{item.text}</p>
          </div>
        </animated.div>
      ))}
    </div>
  )
}

export default AlertHandler;