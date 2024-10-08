SLOT MACHINE MINI GAME

![image](https://github.com/user-attachments/assets/daece75f-e86d-42eb-af6d-8dc5cbfa1594)
![image](https://github.com/user-attachments/assets/e2d2b0ea-dcc0-4400-a3ea-e5565aa30c65)


The purpose of this minigame is to show off a small demo of how a online interactive game works

Made using React with Typescript, Pixi.js library for graphics and html/css for the purpose of faster presentation
and for automated tests Playwright/Jest

Instructions to run this:

1. Clone the repo with VCS (HTTPS)
2. Open it in IDE
3. In terminal type npm install to install needed dependencies and libraries for it to run
4. After installing is done, use npm start or npm run start for the specific script
5. For purpose of presentation both components are shown together so it looks more like a demo

Features of this Slots demo:
- The components are reusable, which means you can configurate how many reels (rows,columns) you want for the game
- The betting button is custom and reusable with configurations for its style, how many bet values there are (array),
  increment, current wager and function to change all of before
- Custom reels: the administrator can easily change the pictures of the game, it's reusable and easily customizable
- Automated tests that test the components
- Animations on the spin button, animations on the title of the game to be more flashy.

How to run the tests: 
1. npx playwright install
2. npx playwright test
- This should launch the automated tests

