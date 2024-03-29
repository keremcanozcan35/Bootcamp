#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const argv = yargs_1.default
    .command("create", "Create a new file", {
    "name": {
        describe: "Name of the file",
        demandOption: true,
        type: "string",
        alias: "n"
    }
})
    .command("build", "Build the project")
    .command("new", "Create a new project", {
    "name": {
        describe: "Name of the project",
        demandOption: true,
        type: "string",
        alias: "n"
    }
})
    .help()
    .argv;
if (argv._.includes("create")) {
    let fileName = argv.name;
    if (!fileName)
        fileName = "style";
    const example = `*{
    margin:0;
    padding:0;
   }`;
    fs_1.default.writeFileSync(fileName + ".css", example);
    console.log("Style.css file created successfully!");
}
if (argv._.includes("build")) {
    (0, child_process_1.exec)("npm run build", (err, stdout, stderr) => {
        if (err)
            console.error(err);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}
if (argv._.includes("new")) {
    const projectName = argv.name;
    (0, child_process_1.exec)(`git clone https://github.com/TanerSaydam/SmartEnum.git ${projectName}`, (err, stdout, stderr) => {
        if (err)
            console.error(err);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}
