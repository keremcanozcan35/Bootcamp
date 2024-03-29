#!/usr/bin/env node

import yargs from 'yargs'
import fs from 'fs'
import { exec } from 'child_process';

const argv = yargs
.command("create", "Create a new file", {
    "name":{
        describe: "Name of the file",
        demandOption: true,
        type: "string",
        alias: "n"
    }
})
.command("build", "Build the project")
.command("new", "Create a new project", {
    "name":{
        describe: "Name of the project",
        demandOption: true,
        type: "string",
        alias: "n"
    }

})
.help()
.argv as { [key: string] : unknown , _: string[]}

if (argv._.includes("create")) {
    let fileName = argv.name as string;

    if(!fileName) fileName ="style";

   const example = `*{
    margin:0;
    padding:0;
   }`

   fs.writeFileSync(fileName + ".css", example);
    console.log("Style.css file created successfully!");
}

if (argv._.includes("build")) {
   exec("npm run build", (err, stdout, stderr) => {
         if(err) console.error(err);
        
         console.log(`stdout: ${stdout}`);
         console.log(`stderr: ${stderr}`);
    });
}

if (argv._.includes("new")) {
    const projectName = argv.name;
    exec(`git clone https://github.com/TanerSaydam/SmartEnum.git ${projectName}`, (err, stdout, stderr) => {
        if(err) console.error(err);
       
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
   });
}


