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
    const standards = Promise.all(jurisdictions.map(async (jur) => {
        const standards = await getJurisdiction(jur.id).then((j) => j.standardSets);
        return standards;
    })).then(r => r.flat());
    return standards;
}
export default { getData, getAllJurisdictions, getJurisdiction, getStandardSet, getAllStandardSets };
//# sourceMappingURL=api.js.map