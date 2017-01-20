///
please follow the below steps to run.
///

- move to this folder in command line

- install dependencies by : npm install -or- npm i

- run the local server by : npm run dev

- then browse in your browser in http://localhost:8080/

///
To apply the git patch please follow the following setps
///

- create a new folder and navigate to it in command line
then run the following git command.

- copy 'challenges-card-styles.patch' file into this new folder.

- git init

- git remote add -t challenge-listings -f origin https://github.com/appirio-tech/react-components.git

- git checkout challenge-listings

- git apply --whitespace fix < challenges-card-styles.patch


VIDEO LINK
https://drive.google.com/file/d/0B04XXBjiFViYd29mRUZxZ1Y2OEE/view