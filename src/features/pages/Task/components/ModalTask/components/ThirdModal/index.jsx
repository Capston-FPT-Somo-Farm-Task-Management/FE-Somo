import React from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import SpecificAnimal from "./components/specificAnimal";
import WholeBarn from "./components/wholeBarn";
import SpecificPlant from "./components/specificPlant";
import WholeGarden from "./components/wholeGarden";
import Other from "./components/other";

dayjs.extend(customParseFormat);

function ThirdModal({ option, onTaskAdded, onDateChange }) {
  if (option === "other") {
    return <Other />;
  } else if (option === "specificAnimal") {
    return <SpecificAnimal onTaskAdded={onTaskAdded} onDateChange={onDateChange} />;
  } else if (option === "wholeBarn") {
    return <WholeBarn onTaskAdded={onTaskAdded} onDateChange={onDateChange} />;
  } else if (option === "specificPlant") {
    return <SpecificPlant onTaskAdded={onTaskAdded} onDateChange={onDateChange} />;
  } else if (option === "wholeGarden") {
    return <WholeGarden onTaskAdded={onTaskAdded} onDateChange={onDateChange} />;
  }
  return null;
}

export default ThirdModal;
