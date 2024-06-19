import API, { JurisdictionListing, StandardSetListing } from "./api.js";


//compare dbjurs w/ oljurs
//if dbjur not cached fetch jurstandardsets
//for each standardset, fetch standards
//for each standard write standard to db
//write standard as cached
//after mark standardset as cached
//after all standardset is fetched/cached mark jur as cached
