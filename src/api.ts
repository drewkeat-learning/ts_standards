import { JurisdictionListing, Jurisdiction, StandardSet, Standard, Prisma } from "@prisma/client";

const URLS = {
  jurisdiction: "http://commonstandardsproject.com/api/v1/jurisdictions/",
  standardSet: "http://commonstandardsproject.com/api/v1/standard_sets/",
};
/* returns data value from fetch request */
async function fetchData(url: string, opts?: object) {
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

// export type JurisdictionListing = {
//   cached: boolean;
//   id: string;
//   title: string;
//   type: ["school", "organization", "state", "country", "corporation", "nation"];
// };

async function fetchAllJurisdictions(): Promise<JurisdictionListing[]> {
  return await fetchData(URLS.jurisdiction);
}

// export type Jurisdiction = {
//   cached: boolean;
//   id: string;
//   title: string;
//   type: string;
//   standardSets: StandardSetListing[];
// };

interface JurisdictionWithStandardSets extends Jurisdiction {
  standardSets: {
    id: string;
    title: string;
    subject: string;
    educationLevels: string[];
    document: { [index: string]: string };
  }[]
}
async function fetchJurisdiction(
  jurisdictionId: string
): Promise<JurisdictionWithStandardSets> {
  return await fetchData(URLS.jurisdiction + jurisdictionId);
}

export type StandardSetListing = {
  done: boolean;
  id: string;
  title: string;
  subject: string;
  educationLevels: string[];
  document: { [index: string]: any };
};

// export type StandardSet = {
//   id: string;
//   title: string;
//   subject: string;
//   educationLevels: string[];
//   cspStatus: {};
//   license: {
//     title: string;
//     URL: string;
//     rightsHolder: string;
//   };
//   document: {
//     title: string;
//   };
//   jurisdiction: {
//     id: string;
//     title: string;
//   };
//   standards: {[index: string]: Standard}
// };

// export type Standard = {
//   id: string;
//   asnIdentifier: null;
//   position: number;
//   depth: number;
//   listId: string;
//   statementNotation: string;
//   statementLabel: string;
//   description: string;
//   ancestorIds: string[];
// };


type StandardSetImport = {
  id: string;
  title: string;
  subject: string;
  educationLevels: string[];
  cspStatus: Prisma.JsonObject;
  license: Prisma.JsonObject;
  document: Prisma.JsonObject;
  jurisdictionId: string;
  standards: Standard[]
}

async function fetchStandardSet(standardsetId: string): Promise<StandardSetImport> {
  let init = await fetchData(URLS.standardSet + standardsetId);
  const {jurisdiction, standards, ...set} = init
  return {...set, standards: Object.values(standards), jurisdictionId: jurisdiction.id}
}

export default {
  fetchData,
  fetchAllJurisdictions,
  fetchJurisdiction,
  fetchStandardSet,
};
