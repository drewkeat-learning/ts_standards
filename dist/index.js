import fs from "fs";
import API from "./api.js";
const jurisdictions = await API.getAllJurisdictions();
const standardSets = await API.getAllStandardSets();
fs.writeFileSync("jurisdictions.json", JSON.stringify(jurisdictions));
fs.writeFileSync("standardSets.json", JSON.stringify(standardSets));
//# sourceMappingURL=index.js.map