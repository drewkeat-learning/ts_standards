const URLS = {
    jurisdiction: "http://commonstandardsproject.com/api/v1/jurisdictions/",
    standardSet: "http://commonstandardsproject.com/api/v1/standard_sets/",
};
/* returns data value from fetch request */
async function getData(url, opts) {
    const options = {
        method: "GET",
        headers: {
            "Api-Key": "vZKoJwFB1PTJnozKBSANADc3",
        },
        ...opts,
    };
    return await fetch(url, opts)
        .then((r) => r.json())
        .then((d) => d.data);
}
async function getAllJurisdictions() {
    return await getData(URLS.jurisdiction);
}
async function getJurisdiction(jurisdictionId) {
    return await getData(URLS.jurisdiction + jurisdictionId);
}
async function getStandardSet(standardsetId) {
    return await getData(URLS.standardSet + standardsetId);
}
async function getAllStandardSets() {
    const jurisdictions = await getAllJurisdictions();
    const standardSetIDs = await Promise.all(jurisdictions.map(async (jur) => {
        const jurisdiction = await getJurisdiction(jur.id);
        return jurisdiction.standardSets.map(s => s.id).flat();
    }).flat());
    return await Promise.all(standardSetIDs.flat().map(async (set) => await getStandardSet(set)));
}
export default { getData, getAllJurisdictions, getJurisdiction, getStandardSet, getAllStandardSets };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLElBQUksR0FBRztJQUNYLFlBQVksRUFBRSx5REFBeUQ7SUFDdkUsV0FBVyxFQUFFLHlEQUF5RDtDQUN2RSxDQUFDO0FBQ0YsMkNBQTJDO0FBQzNDLEtBQUssVUFBVSxPQUFPLENBQUMsR0FBVyxFQUFFLElBQWE7SUFDL0MsTUFBTSxPQUFPLEdBQUc7UUFDZCxNQUFNLEVBQUUsS0FBSztRQUNiLE9BQU8sRUFBRTtZQUNQLFNBQVMsRUFBRSwwQkFBMEI7U0FDdEM7UUFDRCxHQUFHLElBQUk7S0FDUixDQUFDO0lBQ0YsT0FBTyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO1NBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFRRCxLQUFLLFVBQVUsbUJBQW1CO0lBQ2hDLE9BQU8sTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFTRCxLQUFLLFVBQVUsZUFBZSxDQUFDLGNBQXNCO0lBQ25ELE9BQU8sTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBMkNELEtBQUssVUFBVSxjQUFjLENBQUMsYUFBcUI7SUFDakQsT0FBTyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxDQUFBO0FBQ3hELENBQUM7QUFFRCxLQUFLLFVBQVUsa0JBQWtCO0lBQy9CLE1BQU0sYUFBYSxHQUFHLE1BQU0sbUJBQW1CLEVBQUUsQ0FBQztJQUNsRCxNQUFNLGNBQWMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDdkUsTUFBTSxZQUFZLEdBQUksTUFBTSxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ25ELE9BQU8sWUFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDeEQsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUNWLE9BQU8sTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsTUFBTSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQy9GLENBQUM7QUFHRCxlQUFlLEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQSJ9