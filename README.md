**Problem Statement:** 
I have some friends records in a text file (friends.json) -- one friend per line, JSON-encoded. I want to invite any friends within 100km of our Bangalore office which is almost like our home (GPS coordinates 12.9611159,77.6362214) for some food and drinks on us. Write a program that will read the full list of friends and output the names and user ids of matching friends (within 100km), sorted by user id (ascending).

The code is simple, mainly testing is taken care off

- Unit Testing is done through ```karma``` and ```Jasmine```
- e2e Testing is to be done

### To run the program:
node server

Go to browser http://localhost:8080

### To test the app:
karma start
