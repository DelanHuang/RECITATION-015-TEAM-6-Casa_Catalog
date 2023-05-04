# **RECITATION-015-TEAM-6-Casa_Catalog**

## **Application Description**

*Casa Catalog* is an application designed to let you track 
the price of items on Ebay and be notified when a price drops 
to your desired level. By registering and logging in, you are able
to search for products on Ebay and add them to your watchlist. 
Once an item is on your watchlist, you can set a price such that 
if the item drops to or below that price, you will see that it has dropped. 
Similarly, you will also be notified if an item has hit an all time low 
price since you have started tracking it.

## **Contributors**

- Brendan Leonard
- Andrew Zirger
- Delan Huang
- Suhyun Bae
- Garrett Carlisle
- Manuel Hinojosa

## **Tech Stack Used**

- Docker
- HTML and CSS
- Bootstrap
- JavaScript
- Node.js
- PostgreSQL
- Ebay API
- Mocha and Chai
- Microsoft Azure

## **Prerequisites**

Before attempting to run the application, you must ensure 
that Docker Desktop is installed and properly configured. 
Additionally, the device must be connected to the internet 
and be capable of loading JavaScript. Finally, you must create 
a `.env` file in `All Project Code and Components`. The `.env` 
file should look something like this:    

    POSTGRES_USER="<USERNAME>"  
    POSTGRES_PASSWORD="<PASSWORD>"  
    POSTGRES_DB="<DB NAME>"  
      
    SESSION_SECRET="<EBAY API SECRET KEY>"  
    DEV_ID="<EBAY API DEV ID>"  
    APP_ID="<EBAY API APP ID>"

Terms above in `<>` are to be filled out with the appropriate information for you.

## **How to Run the Application Locally**

After meeting the prerequisites above, you must do the following: 
- In a terminal, navigate to the `All Project Code and Components` directory.
- Run the command `docker-compose up`.
- After the server has booted, navigate in a web browser to `localhost:3000`.

Congrats! At this point, you now should have successfully started the application!

## **How to Run the Tests**

To run the tests, you need to update the `docker-compose.yaml` and `index.js` files.
1. In `All Project Code and Components/docker-compose.yaml`, change `command: 'npm start'` to `command: 'npm run testandrun'`.
2. In `All Project Code and Components/src/index.js`, comment out the line at the bottom that says `app.listen(3000);`. Now, uncomment the line at the bottom that says `module.exports = app.listen(3000);`.
3. In a terminal, run the command `docker-compose up` from the `All Project Code and Components` directory.
  
After you have finished running the tests, you must undo these changes if you wish to run the application normally.

## **Link to Deployed Application**

The link to the deployed application is http://recitation-015-team-06.eastus.cloudapp.azure.com:3000/home.