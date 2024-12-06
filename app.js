const express = require("express");
const userRouter = require("./routes/user.routes");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use("/user", userRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
