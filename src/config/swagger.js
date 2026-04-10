import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wallet API",
      version: "1.0.0",
      description: "Mobile Wallet Backend API Documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // route yorumlarını buradan okuyacak
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);