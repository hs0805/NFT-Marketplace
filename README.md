# NFT-Marketplace

### Steps
- Initialise node project using 
 `$ npm init -y` 
It will create a package.json file which will contains project description and dependencies details.

- make app.js file, It is the entry point of our node application

- Installing and setting up express dependency
 `$ npm install express` 

- package-lock.json contains detailed description of dependencies

- listen on port 3000

- create config directory containing default.yaml file which contains our service configuration parameters

- install config dependency
 `$ npm i config`

- install js-yaml dependency to parse yaml file
 `$ npm i js-yaml`

- create a configuration directory under src and use [configurationManager.js](./src/configuration/configurationManager.js) to load config parameters 