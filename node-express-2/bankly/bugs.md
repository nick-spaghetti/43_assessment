### bug 1
- missing secret token in jwt.verify() in middleware/auth.js
- without also passing the secret key, you are unable to properly verify the token

```js
function authUser(req, res, next) {
	try {
		const token = req.body._token || req.query._token;
		if (token) {
			let payload = jwt.verify(token, SECRET_KEY);
			req.curr_username = payload.username;
			req.curr_admin = payload.admin;
		}
		return next(); // Call next() without any parameter
	} catch (err) {
		err.status = 401;
		return next(err); // Pass the error to the next middleware
	}
}
```

##### tests for this bug:
```js
describe('authUser middleware test', () => {
  it('should set req.curr_username and req.curr_admin if valid token is provided', async () => {
    // create a mock token with desired payload
    const payload = { username: 'testuser', admin: true };
    const token = jwt.sign(payload, SECRET_KEY);

    // send a request to your route with the token
    const response = await request(app)
      .get('/')
      .set('Authorization', `Bearer ${token}`);

    // assertions
    expect(response.statusCode).toBe(200);
    expect(response.req.curr_username).toBe(payload.username);
    expect(response.req.curr_admin).toBe(payload.admin);
  });

  it('should not set req.curr_username and req.curr_admin if token is not provided', async () => {
    // send a request to your route without the token
    const response = await request(app).get('/');

    // assertions
    expect(response.statusCode).toBe(200);
    expect(response.req.curr_username).toBeUndefined();
    expect(response.req.curr_admin).toBeUndefined();
  });

  it('should pass an error to next middleware if an invalid token is provided', async () => {
    // create an invalid token (e.g., tampered or expired)
    const token = 'invalid-token';

    // send a request to your route with the invalid token
    const response = await request(app)
      .get('/')
      .set('Authorization', `Bearer ${token}`);

    // Assertions
    expect(response.statusCode).toBe(401);
  });
});
```

### bug 2
- missing await part of async function in routes/auth.js
- without, code will continue to run and user will not be authenticated before the response is returned

```js
router.post("/login", async function (req, res, next) {
	try {
		const { username, password } = req.body;
		let user = (await) User.authenticate(username, password);
		const token = createTokenForUser(username, user.admin);
		return res.json({ token });
	} catch (err) {
		return next(err);
	}
}); // end
```

##### tests for this bug:
```js
describe('post /login', () => {
  it('should return a token upon successful login', async () => {
    const mockUser = {
      username: 'testuser',
      password: 'password',
      admin: false
    };

    // make a request to the login endpoint
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'password'
      });

    // assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ username: 'testuser', password: 'password' });
  });

  it('should return an error for invalid credentials', async () => {
    // create a mock user for authentication    
    const mockUser = {
      username: 'testuser',
      password: 'password',
      admin: false
    };

    // Make a request to the login endpoint with invalid credentials
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });

    // Assertions
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid credentials' });
    expect(User.authenticate).toHaveBeenCalledWith('testuser', 'wrongpassword');
  });
});
```

### bug 3
- missing throw keyword in models/user.js
- potential bug in missing keyword, stalling code execution

```js
	static async get(username) {
		const result = await db.query(
			`SELECT username,
            first_name,
            last_name,
            email,
            phone
     FROM users
     WHERE username = $1`,
			[username]
		);

		const user = result.rows[0];

		if (!user) {
			(throw) new ExpressError("No such user", 404); // Add 'new' keyword here
		}

		return user;
	}
```

##### tests for this bug:
```js
describe("GET /users/[username]", function () {
	test("should deny access if no token provided", async function () {
		const response = await request(app).get("/users/u1");
		expect(response.statusCode).toBe(401);
	});

	test("should return data on u1", async function () {
		const response = await request(app)
			.get("/users/u1")
			.send({ _token: tokens.u1 });
		expect(response.statusCode).toBe(200);
		expect(response.body.user).toEqual({
			username: "u1",
			first_name: "fn1",
			last_name: "ln1",
			email: "email1",
			phone: "phone1",
		});
	});
});
```

test already exists, but with added keyword now works

### bug 4
- missing await part of async function in routes/users.js
- without, code will continue to run and user will be deleted after the response is returned

```js
router.delete(
	"/:username",
	authUser,
	requireAdmin,
	async function (req, res, next) {
		try {
			(await) User.delete(req.params.username);
			return res.json({ message: "deleted" });
		} catch (err) {
			return next(err);
		}
	}
); // end
```

##### tests for this bug:
```js
describe("DELETE /users/[username]", function () {
	test("should deny access if no token provided", async function () {
		const response = await request(app).delete("/users/u1");
		expect(response.statusCode).toBe(401);
	});

	test("should deny access if not admin", async function () {
		const response = await request(app)
			.delete("/users/u1")
			.send({ _token: tokens.u1 });
		expect(response.statusCode).toBe(401);
	});

	test("should allow if admin", async function () {
		const response = await request(app)
			.delete("/users/u1")
			.send({ _token: tokens.u3 }); // u3 is admin
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ message: "deleted" });
	});
});
```

test already exists, but with added keyword now works