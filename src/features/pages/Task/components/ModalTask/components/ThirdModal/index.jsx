import React from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import SpecificAnimal from "./components/specificAnimal";
import WholeBarn from "./components/wholeBarn";
import SpecificPlant from "./components/specificPlant";
import WholeGarden from "./components/wholeGarden";

dayjs.extend(customParseFormat);

function ThirdModal({ option }) {
  if (option === "specificAnimal") {
    return <SpecificAnimal />;
  } else if (option === "wholeBarn") {
    return <WholeBarn />;
  } else if (option === "specificPlant") {
    return <SpecificPlant />;
  } else if (option === "wholeGarden") {
    return <WholeGarden />;
  }
  return null;
}

export default ThirdModal;
