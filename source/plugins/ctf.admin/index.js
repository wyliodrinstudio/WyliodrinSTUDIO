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
    async getAvailableDatabases(path) {
        try {
            let files = await fs.readdir(path);
            return files
        } catch (err) {
            console.log(err);
        }
    },
    async getDbPath() {
        return await db.getDbDirPath(studio);
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