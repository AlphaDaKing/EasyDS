const fs = require('node:fs')

module.exports = class EasyDS {
    constructor(database_specs = {}) {
        if (!database_specs.units) database_specs.units = 0;
        if (!database_specs.withTimestamps) database_specs.withTimestamps = false;
        if (typeof database_specs.units !== 'number') throw new Error('EasyDS: units must be a valid number!');
        if (typeof database_specs.withTimestamps !== 'boolean') throw new Error('EasyDS: withTimestamps must be a valid boolean (true or false)');

        this.database_specs = database_specs;
        this.storage = new Map()
    } 

    /**
     * Setup a back up file! (RECOMMENDED)
     * @param {*} dir 
     * @returns 
     */

    SetupBackupFile(dir) {
        if (!dir) throw new Error('EasyDS: Please provide a valid dir!');
        if (typeof dir !== 'string') throw new Error('EasyDS: dir must be a valid string!')
        this.file = dir
        return this;
    }

    /**
     * Back up data to the backup file! (ONLY WORKS IF BACKUP FILE IS SETUP)
     * @returns 
     */

    BackupData() {
        if (!this.file) throw new Error('EasyDS: This function can only be used if you have setup a backup file!');
        var Array = [];
        this.storage.forEach(value => {
            Array.push(value);
        })
        var Data = { data: Array }
        fs.writeFileSync(this.file, JSON.stringify(Data), 'utf8')
        return;
    }

    /**
     * Recover data from the backup file! (ONLY WORKS IF BACKUP FILE IS SETUP)
     */

    RecoverBackup() {
        if (!this.file) throw new Error('EasyDS: This function can only be used if you have setup a backup file!');
        var rawData = fs.readFileSync(this.file, { encoding: 'utf8' });
        var json = JSON.parse(rawData);
        json.data.forEach(value => {
            this.storage.set(value.key, value)
        })
    }

    /**
     * Create a new entry!
     * @param {*} key 
     * @param {*} value 
     * @returns 
     */

    CreateEntry(key, value) {
        if (!key) throw new Error('EasyDS: key must be provided');
        if (!value) throw new Error('EasyDS: value must be provided');
        if (this.storage.get(key)) throw new Error('EasyDS: entry with the same name already exist!')
        if (typeof key !== 'string') throw new Error('EasyDS: key must be a valid string!');
        if (this.database_specs.units !== 0 && this.storage.size === this.database_specs.units) throw new Error('EasyDS: database has reached its maximum units!')
        var timestamp = {};
        var date = new Date()
        if (this.database_specs.withTimestamps) {timestamp.date = date.toDateString(); timestamp.time = date.toTimeString();} 
        this.storage.set(key, { key: key, data: value, timestamp: timestamp });
        return this;
    }

    /**
     * Delete an entry!
     * @param {*} key 
     * @returns 
     */

    DeleteEntry(key) {
        if (!key) throw new Error('EasyDS: key must be provided');
        if (typeof key !== 'string') throw new Error('EasyDS: key must be a valid string!');
        if (!this.storage.get(key)) throw new Error('EasyDS: entry doesnt exist!');
        this.storage.delete(key);
        return this;
    }
    
    /**
     * Get the data of an entry
     * @param {*} key 
     * @returns 
     */

    GetEntry(key) {
        if (!key) throw new Error('EasyDS: key must be provided');
        if (typeof key !== 'string') throw new Error('EasyDS: key must be a valid string!');
        if (!this.storage.get(key)) throw new Error('EasyDS: entry doesnt exist!');
        return this.storage.get(key);
    }

    /**
     * Returns all entries in the database
     * @returns 
     */

    ListAll() {
        var Array = [];
        this.storage.forEach(value => {
            Array.push(value);
        })
        return { size: this.storage.size, entries: Array }
    }

    /**
     * Returns the size of the database
     * @returns 
     */

    GetSize() {
        return this.storage.size;
    }

    /**
     * Clears all the data inside the database!
     * @returns 
     */

    Zap() {
        this.storage.clear()
        return this;
    }
}
