# Authentication API Using Node.js, Express and MongoDB
## Approach
- Express Middleware is used to handle routing.
- Crypto is used to generate Salted Hash (SHA512) for storing passwords.
- Mongoose is used to handle CRUD operations with MongoDB.
- JsonWebToken is used to assign and validate user authenticity.

## API Routing
- There are two main Routes "```/users```" and "```/product```"
- ```userRouter``` handles sub routes for users.
- ```productRouter``` handles sub routes for product.
## /users (GET)
    GET Method Returns all registered users provided a valid JWT. (Only Accessible to Manager)
## /users/create (POST)
                Accepts {
                    "name":String,
                    "password":String,
                    "email":String,
                    "role":"String"
                }
- Role Can Be Manager or Admin

## /users/login (POST)
        Accepts {
            "email":String,
            "password":String
        }
- On Successful Authentication it generates JWT and attaches it to the response header.

## /product/ (GET)
    Accepts a valid JWT token in Request Header and Only Accessible to Admin Route.

## Goal  
- Develop a Simple Working API to authenticate User and Handle  Errors.


## Working 
- Validate the Data Format for Email and other Required Fields.
- Restricted Access to protected routes without a valid token.
- Salted Hash is used for Encryption to generate Unique Hash every time.





