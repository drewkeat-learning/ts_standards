import API, { JurisdictionListing } from "./api.js";

// const jurisdictions = await API.getAllJurisdictions();
// const jurisdictionsWithTheatre = jurisdictions.filter(
//   async (jur: JurisdictionListing) => {
//     const jurisdiction = await API.getJurisdiction(jur.id);
//     const standardSets = jurisdiction.standardSets
//     return false
//   }
// );

// const validStandardSets = await Promise.all(jurisdictions.data.map(async (j: {id: string}) => await getData(URLS.jurisdiction+j.id)))
console.log(await API.getAllStandardSets())
