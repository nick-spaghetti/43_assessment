/** Server for bank.ly. */

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, () => {
	console.log("---");
	console.log(
		`started on: \nhttp://localhost:${PORT} \nhttp://127.0.0.1:${PORT}`
	);
	console.log("---");
});
