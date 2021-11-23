import React from "react";
import ColorBox from "./components/ColorBox";
import { ColorProvider } from "./contexts/color";
import SelectColors from "./components/SelectColors";

const App = () => {
  return (
    // <ColorContext.Provider value={{ color: "red" }}>
    //   <div>
    //     <ColorBox />
    //   </div>
    // </ColorContext.Provider>
    <ColorProvider>
      <div>
        <SelectColors/>
        <ColorBox/>
      </div>
    </ColorProvider>
  );
};

export default App;
