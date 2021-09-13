# Currency Converter


This is an application that makes convertions between currencies. Registered users, can add more currencies to the database , update the currencies' rates or remove currencies.
Guest users, can also make convertions via interface but they are not allowed to make changes to the database. 

# Backend Installation

In order to test it locally the user has to install both the backend and the frontend.

In order to run , the user must run inside "backend" folder a command line :

### 'npm install'.

This will add all the necessary files for the server to work. 
After finishing the installation process the user can run the command line :
### 'npm run dev' 
(in the same path again),
and this will make the server run at the adress : "htttp//localchost:80/"
The server then connects to a mongoDb database, where the user can register and login later using the UI.

Registered users , have access to the protected endpoints  "/api/ratios/add" ,"/api/ratios/remove", "/api/ratios/update" , "/api/ratios/convert" 

There are also in use the endpoints "api/user/register" and "api/user/login" to make use for registration and 
login.

# Frontend Installation

The front end was created in React. It can be used after running the command:
### 'npm install'
inside the "frontend" folder. After the installation , the user can run the command:
### 'npm run start'
which by default will open the App's interface in a new tab in the browser at http://localhost:3000.

# The Interface 
The user can register with name, email , and password which are stored in the database (the password encrypted).
There is a guest login option where the user can only view the converter's layout but cannote make CRUD operations to the database , to change the rates.
The endpoints allowing CRUD operations are only reachable to registered users.

After choosing a base currency ( "From" selector) and a target currency ( "To" selector) the user has to enter an amount that needs to be converted. 


-To add a new currency, the user can use the ADD button and use the add rates form.

-To remove a currency from the database, the user can click on the DELETE button and choose which currency to be removed.

-To update the rates the user can hit the UPDATE button and make the nessesary changes to the currecies' rates.



The user can add more converters as desired by pressing the corresponding button on the top left or remove some converters using the "-" button.
The logout button, returns to the starting point asking to login or register.

