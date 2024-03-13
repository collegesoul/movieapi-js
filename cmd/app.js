const express = require('express')
const app = express()
const movieRoutes = require('./routes');
const error = require("./errors");
const PORT = process.env.Port || 3000;

app.use(express.json());

app.use((err, req, res, next)=>{
    if (err instanceof SyntaxError) {
        const error = require('./errors');
        return error.errorResponse(res, 400, "body contains badly-formed JSON")
    }
    next();
});


app.use(movieRoutes);

app.listen(PORT, () => console.log(`Serving on port: ${PORT}`))
