import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs-extra';

import CTF from './views/CTF.vue';
import mainRoutes from './routes/main';
import frontRoutes from './routes/front';
import db from './functions/database';

let studio = null;

const app = express();
let server = undefined;



let ctf_admin = {
    async startServer(port, dbName) {
        await db.setup(dbName, studio);
        
        // Allow all cors
        app.use(cors());

        // Express body parser
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        //Main API Routes
        app.use('/api/v1', mainRoutes);
        //Frontend Routes
        // app.use('/', frontRoutes);
        app.use('/', express.static(path.join(__dirname, 'data' , 'frontend')));
        console.log(path.join(__dirname, 'frontend'));

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

        let sqlCMD = '';

        deletedQuestions.forEach (async (ID) => {
            await db.runSQLCMD("DELETE FROM `Questions` WHERE `ID`=$ID;", {
                $ID: ID
            })
        })

        questions.forEach(async ({ID, Question, Answer, AnswerType, Score, Parent, newQuestion}, idx) => {
            if (newQuestion) {           
                sqlCMD = "INSERT INTO `Questions` (`ID`,`Question`,`Answer`,`AnswerType`,`Score`,`Parent`)\
                            VALUES ($idx, $Question, $Answer, $AnswerType, $Score, $Parent);";
                try {
                    await db.runSQLCMD(sqlCMD, {
                        $idx: idx,
                        $Question: Question,
                        $Answer: Answer,
                        $AnswerType: AnswerType,
                        $Score: Score,
                        $Parent: Parent
                    })
                } catch (err) {
                    console.log(err);
                }
            } else {
                sqlCMD = "UPDATE `Questions` SET `Question`=$Question, `Answer`=$Answer, `AnswerType`=$AnswerType,\
                            `Score`=$Score, `Parent`=$Parent, `ID`=$idx WHERE ID=$ID;";
                try {
                    await db.runSQLCMD(sqlCMD, {
                        $ID: ID,
                        $idx: idx,
                        $Question: Question,
                        $Answer: Answer,
                        $AnswerType: AnswerType,
                        $Score: Score,
                        $Parent: Parent
                    })
                } catch (err) {
                    console.log(err);
                }
            }

            console.log(sqlCMD);
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