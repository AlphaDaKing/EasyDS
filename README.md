<img src="https://readme-typing-svg.herokuapp.com?font=Oxygen&size=100&duration=1000&pause=1000&color=F7E400&background=000000&center=true&vCenter=true&repeat=false&random=false&width=750&height=500&lines=%E2%9C%A8+EasyDS+%E2%9C%A8" alt="Typing SVG" />

> **By phantom_raja2**

# Introduction:
EasyDS is a basic database implementation. This database **DOESNT** Require a server to save stuff! but it requires the code to be hosted

# Installation:
```
npm i easyds@latest 
```

# Key Features:
- Very simple to use
- You can **BACK UP** Data!

# Setup:

To setup the database you need to write the following code:
> **NOTE: THE OPTIONS ARE NOT REQUIRED! IF OPTIONS NOT GIVEN, IT WILL USE THE DEFAULT SETTINGS**
```js
const EasyDS = require('easyds');
const Database = new EasyDS({  // This contains the default settings. If you want, you can change it to something else. If you want the default settings, just dont put this Json data
    units: 0, // Units: The maximum amount of entries the database will store. If left or entered 0, It will store infinite amount of data
    withTimestamps: false // withTimestamps: If used, it will save the data along with the timestamp when the data was created
});

// Setup your backup file (Optional but recommended):
Database.SetupBackupFile("backup.json") // If you already have an existing .json file for backup, enter its name. If you dont, Just enter a name and put .json at end

```

# Functions and their uses:

> **NOTE: THIS SECTION EXCLUDES .SetupBackupFile() FUNCTION AS IT HAS BEEN ALREADY MENTIONED**

```js
// Backup functions
// NOTE: THESE FUNCTIONS CAN ONLY BE USED IF A BACKUP FILE IS SETUP
Database.BackupData(); // This function updates the backup file
Database.RecoverData(); // This function recovers data loss caused by outage

// General functions
Database.CreateEntry('Key', 'Value'); // Note: The Value Arguement can be in any time i.e It can be in number type, json or any other type!
Database.GetEntry('Key'); // Gets the data assigned to the given key
Database.DeleteEntry('Key'); // Deletes the data assigned to the given key
Database.ListAll(); // Fetches all the data inside the main database
Database.GetSize(); // Returns the size of the database
Database.Zap(); // Deletes all the data inside the main database (Can be recovered if the data has not been backed up after a Zap)
```

# Important:
If you have a backup file setup, Donot forget to use
```js
Database.BackupData();
```
As it adds the change made to the main database.

# Recommended:
It is recommended to add a backup file because if the code stops running, the data in the main database will get wiped. 

**Peace ✌! Made by phantom_raja2!**