### Conceptual Exercise
Answer the following questions below:
- What is a JWT?
	- json web token


- What is the signature portion of the JWT?  What does it do?
	- verification


- If a JWT is intercepted, can the attacker see what's inside the payload?
	- yes.  encoded, not encrypted


- How can you implement authentication with a JWT?  Describe how it works at a high level.
	- using '.validate' and '.valid'


- Compare and contrast unit, integration and end-to-end tests.
	- unit: 
		- individual files / functions
	- integration: 
		- multiple files together
	- e2e: 
		- entire application

- What is a mock? What are some things you would mock?
	- json template


- What is continuous integration?
	- writing tests as you go


- What is an environment variable and what are they used for?
	- secret keys, database uri, lots of special variables you may not want users to know about


- What is TDD? What are some benefits and drawbacks?
	- test driven development.  basically building code to fit the tests.


- What is the value of using JSONSchema for validation?
	- validates that the json data you will be using is the correct format and type


- What are some ways to decide which code to test?
	- priority, mainly.  api routes, to make sure the code is handling requests correctly


- What does `RETURNING` do in SQL? When would you use it?
	- returning is a good way to just see that what you just put in went in correctly, but it is also good if you want to then do something with the data you just created.


- What are some differences between Web Sockets and HTTP?
	- web sockets reach out to the server whenever there is a change
	- http is the server reaching out to the browser to see if there was any change


- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?
	- flask was amazing and quick, but its not so good for asynchronous code
	- express is great because of how modular it is.  i just wish i was better at js.