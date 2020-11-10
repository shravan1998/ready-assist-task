## How to Run Backend

## Install all Packages

`npm install --save`

## Install Nodemon

`npm install -g`

## Upload The database readyassist.sql (Configire accordingly in the code)

````
const connection = mysql.createConnection({
    host: 'localhost',
    username: 'root',
    password: 'password',
    database:"readyassist"
});
````

## Run the backend

`nodemon`