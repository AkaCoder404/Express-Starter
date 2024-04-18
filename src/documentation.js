const swaggerDocumentation = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Express-Starter API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "AkaCoder404",
                url: "https://github.com/AkaCoder404",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8001/api/v1",
            },
        ],
    },
    apis: ["./src/routes/v1/*.route.js"],
    // Use http
    // schemes: ["http"],

};

module.exports = swaggerDocumentation;