const { ApolloServer } = require("apollo-server");

const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolver");
const server = new ApolloServer({
    typeDefs,
    resolvers,
});


mongoose
    .connect(
        process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/recipeApp-graphql",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("MongoDB Connected Successfully");
        return server.listen({ port: 4000 });
    })
    .then((res) => {
        console.log(`Use GraphQL at ${res.url}`);
    });
