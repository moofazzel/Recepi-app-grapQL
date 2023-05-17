const { gql } = require("apollo-server");
module.exports = gql`
  type Recipe {
    _id:ID
    strCategory: String
    strCategoryThumb: String
    strCategoryDescription: String
  }

  input RecipeInput {
    strCategory: String
    strCategoryThumb: String
    strCategoryDescription: String
  }

  type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
    allRecipe: [Recipe]
  }
  
  type Mutation {
    createRecipe(recipe: RecipeInput): Recipe


    updateRecipe(ID: ID!, 
    strCategory: String,
    strCategoryThumb: String,
    strCategoryDescription: String
    ): Recipe



    deleteRecipe(ID:ID!):String
  }
`;