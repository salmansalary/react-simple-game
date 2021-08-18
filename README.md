# Catch The FOXiii !

Screen 1                  |  Screen 2
:-------------------------:|:-------------------------:
![Alt Text](https://myapolo.web.app/static/media/gameScreen1.png)  |  ![Alt Text](https://myapolo.web.app/static/media/gameScreen2.png)

----------------------------

## Installation

### 1 - Simply run `yarn install` to install node_modules packages
### 2 - Simply run `yarn start` to start the game locally on http://localhost:3000

----------------------------

## Testing

#### Running tests `yarn test`
#### Running tests with coverage `yarn test:coverage` 

----------------------------

## Build and deploy

If you wish to deploy the code simply run `yarn build` and upload the build folder content to your web host

----------------------------

## Game Features and Logic

* To start the game key-in your Alias/Name, the game will not start with an empty name input and show input warning with shake effect.

* After Starting Game you have 30 Seconds.
    * Only Click on the Foxiii to get 5+ points, 
    * If you click on any other animals you may get [-1,-2,-3] points depend on the point assign to the wrong animal.

* The favourable possibility of showing Foxiii is 3/10 which will generated randomly.
    * There are 10 Character to be chosen from randomly in every iteration every 500 milliseconds,  3 character out of 10 are fox.
    * There are 9 Placeholder to be chosen from randomly in every iteration every 500 milliseconds

* After the 30 second you will be redirect to Home Screen with Showing the ScoreBoard.
    * You can try again just to beat your own Score. "Have Fun"

* There are few test cases written in Jest & Enzyme to cover the journey including.
    * Starting, check for valid name
    * clicking on animals check the points changes,...




