# Blog-For-TestRound

### A backend CRUD API for posts of a blogging app. Without authorization.

- MongoDB is used for database connectivity. Mongo Atlas is used to setup the database server.
- Website is deployed using Heroku App.

## Navigation and Functionality

1. GET request to 'https://morning-sierra-75616.herokuapp.com/' displays all available blog posts.
2. POST request to 'https://morning-sierra-75616.herokuapp.com/create' with **title** and **content** creates a new post.
3. GET request to 'https://morning-sierra-75616.herokuapp.com/:< post-name >' searches and returns the post if it exists.
4. DELETE request at 'https://morning-sierra-75616.herokuapp.com/:< post-name >' deletes the post.
5. PUT request to 'https://morning-sierra-75616.herokuapp.com/:< post-name >' for updating that particular post.


#### Postman app is used to for testing and debugging.

