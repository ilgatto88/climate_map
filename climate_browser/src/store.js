import { configureStore } from "@reduxjs/toolkit";
import sidebarHandler from "./features/sidebarSlice";
import municipalityIdHandler from "./features/variables/municipalityIdSlice";
import scenarioHandler from "./features/variables/scenarioSlice";
import futurePeriodHandler from "./features/variables/futurePeriodSlice";
import historicalPeriodHandler from "./features/variables/historicalPeriodSlice";
import parameterHandler from "./features/variables/parameterSlice";
import categoryHandler from "./features/categorySlice";
import historicalDataHandler from "./features/historicalDataSlice";
import infoHandler from "./features/infoSlice";
import aboutHandler from "./features/aboutSlice";
import scenarioBarHandler from "./features/scenarioBarSlice";

export default configureStore({
  reducer: {
    sidebarHandler,
    municipalityIdHandler,
    scenarioHandler,
    futurePeriodHandler,
    historicalPeriodHandler,
    parameterHandler,
    categoryHandler,
    historicalDataHandler,
    infoHandler,
    aboutHandler,
    scenarioBarHandler,
  },
});
