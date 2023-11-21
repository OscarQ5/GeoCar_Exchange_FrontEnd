# GeoCar Exchange

GeoCar Exchange is a web application designed for buying and selling cars. This README will guide you through the application's features and provide step-by-step instructions for both the backend and frontend components.

## Getting Started

1. Fork and clone the backend repository: [GeoCar Exchange Backend](https://github.com/OscarQ5/GeoCar_Exchange_BackEnd)

Check out the deployed site here: [Deployed BackEnd](https://geocar-exchange-backend.onrender.com)

2. Navigate to the backend directory and install dependencies:

```
cd geocar-exchange-backend
npm install
```

3. Set up the database, initialize, and seed it:

```
npm run db:init
npm run db:seed
```

4. Start the backend server:

```
npm start
```

5. Fork and clone this repository:

Check out the deployed site here: [Deployed FrontEnd](https://aesthetic-crisp-160450.netlify.app)

6. Navigate to the frontend directory and install dependencies:

```
cd geocar-exchange-frontend
npm install
```

7. Start the frontend development server:

```
npm run dev
```

## Browse Cars

The homepage allows you to browse available cars.

## Car Details

Each car is represented by a card displaying:

Make

Model

Year

Price

Whether it's for sale

## Expanding Car Details

Click on a car to reveal additional details.

The expanded view includes comprehensive information about the car.

### Radar.io
The user is promted to share their location through the browser and using the Radar.io API the distance between them and the car they are viewing is calculated and shown on the page. 

## Edit Car

Update or mark a car as "For Sale" on the Edit Car page.

## Add Car

Click the "New Car" button to add a new car.

Fill in the details and mark it as "For Sale."

Address for cars must be full addresses. (ex. 47-10 Austell Pl, Long Island City, NY 11101)

## Environment Variables

To run this project, you need to set up the following environment variables. Create a `.env` file in the root of your project and add the variables.

### VITE_API_URL

### VITE_RADAR_API_KEY