# Currency Converter


This is an application that makes convertions between currencies.
In order to test it the user has to install both the backend and the frontend.


The backend was created using Node.js express and mongoDb database. 
In order to run , the user must run inside "backend" folder a command line : "npm install".
This will add all the necessary files for the server to work. 
After finishing the installation process the user can run the command line : "npm run dev" (in the same path again)
and this will make the server run at the adress : "htttp//localchost:80/"
The server then connects to a mongoDb database, where the user can register and login later using the UI.

This Api, uses protected endpoints  "/api/ratios/add" ,"/api/ratios/remove", "/api/ratios/update" , "/api/ratios/convert"
which by default respond : "Acess Denied".

There are also in use the endpoints "api/user/register" and "api/user/login" to make use for registration and 
login.

The front end was created in React. It can be used after running the command "npm install" inside the 
"frontend" folder. After the installation , the user can run the command: "npm run start" which by default
will open the App's interface in a new tab in the browser at http://localhost:3000.

The user can register with name, email , and password which are stored in the database (the password encrypted).
There is a guest login option where the user can only view the converter's layout but cannote make CRUD operations to the database , to change the rates.
The endpoints allowing CRUD operations are only reachable to registered users.

After choosing a base currency ( "From" selector) and a target currency ( "To" selector) the user has to enter an amount
that needs to be converted. 


-To add a new currency, the user can use the corresponding button which works like the above example.

-To remove a currency from the database, the user can click on the bottom right button and replace "CUR" with the currency he
would like to remove.


The user can add more converters as desired by pressing the corresponding button on the top left or remove some converters using the "-" button.
The logout button, returns to the starting point asking to login or register.

