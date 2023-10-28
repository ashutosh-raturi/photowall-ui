## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Docker commands to run containers

### DATABASE
- `docker run --name db -d --rm --network photowall-net -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=photowall mysql`

### BACKEND
- `docker run --name be --rm -p 8080:8080 --network photowall-net -e DB_IP=db -e DB_PORT=3306 -e DB_USER=root -e DB_PASSWORD=root ashutoshraturi/photowall-be`
- NOTE:- First pull the image then run the container

### FRONTEND
- `docker run --name ui -it --rm -p 3000:3000 ashutoshraturi/photowall-ui`