import fs from "fs"
import DB from "./db.js"
import API from "./api.js"



export default class Logger {
  logFile: string
  timeString: string
  constructor(){
    this.timeString = new Date().toLocaleString().replaceAll(/[,\s]+/g, "_").replaceAll("/",".")
    this.logFile = `logs/${this.timeString}.txt`
  }
  
  beginLogs(){
    const msg = `Beginning logs ${new Date().toLocaleTimeString()}\n`
    console.log(msg)
    fs.appendFile(this.logFile, msg+"\n", e => console.error(e))
  }
  
  log(msg: string){
    console.log(msg)
    const currTime = new Date().toLocaleTimeString().replaceAll(/[,\s]+/g, "_").replaceAll("/",".")
    fs.appendFile(this.logFile, msg+"\n", e => console.error(e))
  }

}
