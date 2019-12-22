import express from 'express';
import path from 'path';
import fs from 'fs-extra';

import CTF from './views/CTF.vue';
import mainRoutes from './routes/main';
import db from './functions/database';

let studio = null;

const app = express();
let server = undefined;



let ctf_admin = {
    async startServer(port, dbName) {
        await db.setup(dbName, studio);
        
        // Express body parser
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        //Main Routes
        app.use('/api/v1', mainRoutes);

        const PORT = parseInt(port) || 5000;
        server = app.listen(PORT, console.log(`Server started on port ${PORT}`));
    },
    async stopServer() {
        if (server) {
            server.close();
            await db.close();

            console.log('Server closed');
            
            server = undefined;
        }
    },
    async getAvailableDatabases() {
        let path = await db.getDbDirPath(studio);
        try {
            let files = await fs.readdir(path);
            return files
        } catch (err) {
            console.log(err);
        }
    },
    async getAllQuestions(activeDb) {
        await db.setup(activeDb, studio);
        let questions = db.getAll('Questions');
        await db.close();

        return questions;
    },
    async updateDbQuestions(questions, deletedQuestions, activeDb) {
        await db.setup(activeDb, studio);

        let cmd = '';

        deletedQuestions.forEach (async (ID) => {
            await db.runSQLCMD("DELETE FROM `Questions` WHERE `ID`='" + ID + "';")
        })

        questions.forEach(async ({ID, Question, Answer, Score, LockedBy, newQuestion}, idx) => {
            

            if (newQuestion) {           
                cmd = "INSERT INTO `Questions`(`ID`,`Question`,`Answer`,`Score`,`LockedBy`) VALUES (" + idx + ",'" 
                        + Question + "','" + Answer + "'," + Score + ", " + LockedBy +");";
            } else {
                cmd = "UPDATE `Questions` SET `Question`='" + Question + "', `Answer`='" + Answer 
                        + "', `Score`='" + Score + "', `LockedBy`='" + LockedBy + "', `ID`='" + idx + "' WHERE ID='" + ID + "';";
            }

            console.log(cmd);

            await db.runSQLCMD(cmd)
        })
        await db.close();
    }
}

export function setup(options, imports, register) {
    /* Collect the objects exported by the consumed plugins */
    studio = imports;

    /* Create a toolbar button that will display a notification */
    studio.workspace.registerTab("CTF ADMIN", 300, CTF);

    /* Register the object that this plugin will provide */
    register(null, {
        ctf_admin: ctf_admin
    })
}