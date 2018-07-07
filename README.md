**How to Set Up The API**

Run npm install && npm start

**API Documentation**                  

**Verb**: GET

**EndPoint**: /api/game

**Description**: returns the current game board and whose turn it is

**Header**:

Name: Content-Type, Value: application/json

**Response Body**:

**StatusCode**: 200(OK)

Response:

    |   |  
  ---------
    |   |  
  ---------
    |   | 

It is currently Player One's turn

Note: If this end point was hit by the browser, then the sent string will be inserted as a text node and format will be strange.

---------

**StatusCode**: 404(Not Found)
Response: StatusCode 404: No game found. Please create a game via a POST to /api/game


---------------------------------------

**Verb**: POST

**EndPoint**: /api/game

**Description**: create a game board with dimension NxN

**Header**:

Name: Content-Type, Value: application/json


**Request Body**:

Json Object:

{
  "dimensions": 3
}

**StatusCode**: 200(OK)

**Response Body**:

    |   |  
  ---------
    |   |  
  ---------
    |   | 
  
It is currently Player One's turn

---------

**Request Body**:

Json Object:

{
  
}

**StatusCode**: 422(Unprocessed Entity)

Response: StatusCode 422: Please specify the dimensions of the board

---------

**StatusCode**: 500(Unprocessed Entity)

Response: StatusCode 500: Error in creating game

-----------------------------------

**Verb**: PUT

**EndPoint**: /api/game

**Description**: updates the game board

**Header**:

Name: Content-Type, Value: application/json


**Request Body**:

Json Object:

{
  "row": 2
  "col": 2
  "char": 'X'
}

**StatusCode**: 200(OK)

**Response Body**:

    |   |  
  ---------
    | x |  
  ---------
    |   | 

It is currently Player Two's turn

---------

**Request Body**:


Json Object:
{
  "row": 4
  "col": 0
  "char: 'X'
}

**StatusCode**: 400(Bad Request, assuming 3x3 board)

Response: StatusCode 400: Out of bounds error!

---------
**Request Body**:

Json Object:
{
  "row": 1
  "col": 1
  "char: 'X'
}

**StatusCode**: 400(Bad Request, assuming the top left is already taken)

Response: StatusCode 400: This square is already taken!

---------

**Request Body**:

Json Object:
{
  "row": 1
  "col": 1
  "char: 'GCAASDCASDC'
}

**StatusCode**: 400(Bad Request)

Response: StatusCode 400: Character must be an X or O

---------

**Request Body**:

Json Object:
{
  "row": 1
  "col": 1
  "char: 'X'
}

**StatusCode**: 400(Bad Request, assuming it's player one's turn and he is O not X)

Response: StatusCode 400: Player 1 must place an O
