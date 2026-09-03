const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

app.use(errorMiddleware);

module.exports = app;















// GA DIBUTUHIN KEKNYA

// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const routes = require("./routes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// const app = express();

// // Core middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev")); // request logging
// }

// // Health check
// app.get("/", (req, res) => {
//   res.json({ success: true, message: "API is running" });
// });

// // API routes
// app.use("/api", routes);

// // Error handling (must be last)
// app.use(notFound);
// app.use(errorHandler);

// module.exports = app;
