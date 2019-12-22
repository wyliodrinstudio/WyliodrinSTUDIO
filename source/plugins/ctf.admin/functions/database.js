
import sqlite3 from 'sqlite3';
import fs from 'fs-extra';
import path from 'path';

let db = undefined;
let dbDirPath = undefined;


async function ensureDirectory (dirPath) {
    try {
      await fs.ensureDir(dirPath);
    } catch (err) {
      console.error(err)
    }
}

function createDatabase(dbPath) {
    return new Promise((resolve, rejects) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
}

function runSQLCMD(cmd) {
    return new Promise((resolve, rejects) => {
		db = db.run(cmd, (err) => {
			if (err) {
				rejects(err);
			} else {
				resolve();
			}
		})
    })
}

function getFirstRow(table, column, value) {
	return new Promise((resolve, rejects) => {
		db.get("SELECT * FROM `" + table + "` WHERE `" + column + "` LIKE '" + value + "'", (err, row) => {
			if (err) {
				rejects(err);
			} else {
				resolve(row);
			}
		}) 
	})
}

function getAll(table) {
	return new Promise((resolve, rejects) => {
		db.all("SELECT * FROM `" + table + "`", (err, rows) => {
			if (err) {
				rejects(err);
			} else {
				resolve(rows);
			}
		}) 
	})
}

function close() {
    return new Promise((resolve, rejects) => {
		db.close((err) => {
			if (err) {
				rejects(err);
			} else {
				resolve();
			}  
		})
    })
}

async function setup(dbName, studio) {
	if (!dbDirPath) {
		dbDirPath = path.join(studio.filesystem.getSettingsFolder(), 'databases');
		await ensureDirectory(dbDirPath);
	}

	await createDatabase(path.join(dbDirPath, dbName));

	await runSQLCMD('\
		CREATE TABLE IF NOT EXISTS `Teams` ( \
			`ID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, \
			`Name`	TEXT NOT NULL \
		);\
	');

	await runSQLCMD('\
		CREATE TABLE IF NOT EXISTS `Questions` (\
			`ID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,\
			`Question`	TEXT NOT NULL,\
			`Answer`	TEXT NOT NULL,\
			`Score`	INTEGER NOT NULL,\
			`LockedBy`	INTEGER NOT NULL\
		);\
	');

	await runSQLCMD('\
		CREATE TABLE IF NOT EXISTS `Answers` (\
			`ID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,\
			`TeamID`	INTEGER NOT NULL,\
			`QuestionID`	NUMERIC NOT NULL,\
			`Started`	TEXT NOT NULL,\
			`Finished`	TEXT,\
			`Score`	INTEGER,\
			FOREIGN KEY(`TeamID`) REFERENCES `Teams`(`ID`),\
			FOREIGN KEY(`QuestionID`) REFERENCES `Questions`(`ID`)\
		);\
	');
}

async function getDbDirPath(studio) {
	if (!dbDirPath) {
		dbDirPath = path.join(studio.filesystem.getSettingsFolder(), 'databases');
		await ensureDirectory(dbDirPath);
	}

	return dbDirPath;
}

export default {
	runSQLCMD,
	getFirstRow,
	getAll,
	setup,
	close,
	getDbDirPath
}