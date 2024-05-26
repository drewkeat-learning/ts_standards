const URLS = {
  jurisdiction: "http://commonstandardsproject.com/api/v1/jurisdictions/",
  standardSet: "http://commonstandardsproject.com/api/v1/standard_sets/",
};
/* returns data value from fetch request */
async function getData(url: string, opts?: object) {
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

export type JurisdictionListing = {
  id: string;
  title: string;
  type: ["school", "organization", "state", "country", "corporation", "nation"];
};

async function getAllJurisdictions(): Promise<JurisdictionListing[]> {
  return await getData(URLS.jurisdiction);
}

export type Jurisdiction = {
  id: string;
  title: string;
  type: string;
  standardSets: StandardSetListing[];
};

async function getJurisdiction(jurisdictionId: string): Promise<Jurisdiction> {
  return await getData(URLS.jurisdiction + jurisdictionId);
}

export type StandardSetListing = {
  id: string;
  title: string;
  subject: string;
  educationLevels: string[];
  document: { [index: string]: any };
};

export type StandardSet = {
  id: string;
  title: string;
  subject: string;
  educationLevels: string[];
  cspStatus: {};
  license: {
    title: string;
    URL: string;
    rightsHolder: string;
  };
  document: {
    title: string;
  };
  jurisdiction: {
    id: string;
    title: string;
  };
  standards: {[index: string]: Standard}
};

export type Standard = {
  id: string;
  asnIdentifier: null;
  position: number;
  depth: number;
  listId: string;
  statementNotation: string;
  statementLabel: string;
  description: string;
  ancestorIds: string[];
};

async function getStandardSet(standardsetId: string): Promise<StandardSet> {
  return await getData(URLS.standardSet + standardsetId)
}

async function getAllStandardSets(): Promise<StandardSet[]> {
  const jurisdictions = await getAllJurisdictions();
  const standardSetIDs = await Promise.all(jurisdictions.map(async (jur) => {
    const jurisdiction =  await getJurisdiction(jur.id)
    return jurisdiction.standardSets.map(s => s.id).flat()
  }).flat())
  return await Promise.all(standardSetIDs.flat().map(async (set) => await getStandardSet(set)))
}


export default {getData, getAllJurisdictions, getJurisdiction, getStandardSet, getAllStandardSets}