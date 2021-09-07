# Top Github PHP Starred Repositories

To start, update the `config/db-connection.php` file with the database credentials. To start the application, go to the project root and open a console from there. If it is the first time running the application, you will need to run Composer and NPM in the console: `composer install`, then `npm install`. Also, run the database.sql file in MySQL.

Populate the database by running the script: `php updateDatabase.php`, this can be automated by a simple cronjob if data needs to be consistently updated.

Run `npm run build:js` to build the Javascript file.

Run the application by running: `php -S 127.0.0.1:8000 -t web`

Visit the app here `http://localhost:8000/` in your browser.

## Requirements

Will need PHP7, MySQL, and Node/NPM.

## To edit/make changes to JavaScript

Run `npm run builddev:js` and webpack will watch for changes and compile; then edit the `frontend/index.ts` file.