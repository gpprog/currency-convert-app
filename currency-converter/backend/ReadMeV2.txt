Currency Converter V2


This is an application that makes convertions between currencies.
In order to test it the user has to install both the backend and the frontend.


The backend was created using Node.js express and mongoDb database. 
In order to run , the user must run inside "currencies_node" folder a command line : "npm install".
This will add all the necessary files for the server to work. 
After finishing the installation process the user can run the command line : "npm run dev" (in the same path again)
and this will make the server run at the adress : "htttp//localchost:80/"
The server then connects to a mongoDb database, where the user can register and login later using the UI.

This Api, uses protected endpoints  "/api/ratios/add" ,"/api/ratios/remove", "/api/ratios/update" , "/api/ratios/convert"
which by default respond : "Acess Denied".

There are also in use the endpoints "api/user/register" and "api/user/login" to make use for registration and 
login.

The front end was created in React. It can be used after running the command "npm install" inside the 
"currencies-react" folder. After the installation , the user can run the command: "npm run start" which by default
will open the App's interface in a new tab in the browser at http://localhost:3000.

The user can register with name, email , and password which are stored in the database (the password encrypted).
There is a guest login option where the user can only view the converter's layout because the endpoints are onoy reachable to
registered users.

If the user logs in with valid credencials , the endpoints can be reached, and all the CRUD operations can be done in order to 
add new currencies modify rates or remove currencies.
(for test purposes you can use username: demo, email: demo@demo.com, password: demo123 ).

After choosing a base currency ( "From" selector) and a target currency ( "To" selector) the user has to enter an amount
that needs to be converted. 

-The user can modificate a currency and the realative rates, by clicking the bottom left button.This opens a new dialog box with
 a form to make the modifications. The user entry should follow a pattern.

E.g.    {"base": "CUR"  , "rates": {"CUR":1,"EUR":0.0075,"AUD":0.0114,"USD":0.0088,"CHF":0.8078} }

In the example above,  the user modifies the rates of the CUR currency.

-To add a new currency, the user can use the corresponding button which works like the above example.
The user has to replace "CUR" with the new currency and add the necessary rates.Inluding "CUR":1, to keep data integrity.

-To remove a currency from the database, the user can click on the bottom right button and replace "CUR" with the currency he
would like to remove.


The user can add more converters as desired by pressing the corresponding button on the top left or remove some converters using the remove button.
The logout button, returns to the starting point asking to login or register.


# Next version:  The CRUD operations can be done in a form created dynamically with multiple inputs where the user will be able to enter only the desired base current
and the rates, to make possible the use of front-end form validation rules. The extra React component is already in development phase and included in the code.












