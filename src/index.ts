import fs from "fs";
import API, { JurisdictionListing, StandardSetListing } from "./api.js";

const jurisdictions = await API.getAllJurisdictions();
const standardSets = await API.getAllStandardSets()
const standard1 = await API.getStandardSet("83F29380C23C4AEB843733B243CB2243_D10003F7_grades-09-10-11-12");

fs.writeFileSync("jurisdictions.json", JSON.stringify(jurisdictions));
fs.writeFileSync("standardSets.json", JSON.stringify(standardSets));

const standardSetIds = standardSets.map(set => set.id)

// fs.writeFileSync('standards.json', JSON.stringify(await Promise.all(standardSetIds.slice(0,10).map(async(setId) => {
//   return await API.getStandardSet(setId)
// }))))


function prepStandardSetsJSON(){
  const buffer = fs.readFileSync('./standardSets.json').toString()
  const sets = JSON.parse(buffer)
  const updated = sets.map((set: {[index: string]: any}) => set.done = '')
  fs.writeFileSync('standardSets.json', updated)
}