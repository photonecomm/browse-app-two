Local development build
1. npm install
2. npm run build-dev  (Process will not end. It will keep watching for the changes in the source code)
3. npm run start-dev

Build to higher environments
1. npm run build-prod
2. npm run pack
3. docker build --no-cache -f deployment/Dockerfile -t browse-app .

Run the docker image:
1. docker run -e ENV_SERVER=prod ENV_DEPLOYMENT_TYPE=ACS --name browse-app -p 0.0.0.0:8080:8080 -d browse-app

Possible values of ENV_SERVER are local, dev, staging, perf, prod

Run CSS lint:
1. npm install
2. npm run csslint-console (OR) npm run csslint

Run JS lint:
1. npm install
2. npm run jslint-console (OR) npm run jslint

Run Unit test:
1. npm install
2. npm run unit-test

Run Functional test(Headless):
1. npm install
2. npm run e2e-start (Will start the webdriver)
3. npm run e2e-test