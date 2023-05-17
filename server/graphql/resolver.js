const Recipe = require("../models/Recipe");



module.exports = {
    Query: {
        allRecipe: async () => {
            const data = await Recipe.find()
            return data
        }
        // // This holds all our queries to the apollo-server
        // async recipe(_, { ID }) {
        //     return await Recipe.findById(ID);
        // },
        // async getRecipes(_, { amount }) {
        //     return await Recipe.find().sort({ dateCreated: -1 }).limit(amount);
        // },
    },
    Mutation: {
        createRecipe: async (parent, args, context) => {

            const { strCategory, strCategoryThumb, strCategoryDescription } = args.recipe

            const recipe = new Recipe({
                strCategory,
                strCategoryThumb,
                strCategoryDescription
            }).save()
            console.log(recipe)
            return recipe
        },

        updateRecipe: async (parent, args, context) => {
            const { ID, recipe } = args

            console.log(ID)

            console.log(recipe)



            const { strCategory, strCategoryThumb, strCategoryDescription } = args

            const updatedRecipe = await Recipe.findByIdAndUpdate(ID, {
                strCategory,
                strCategoryThumb,
                strCategoryDescription
            }, { new: true })
            console.log(updatedRecipe)
            return updatedRecipe
        },

        deleteRecipe: async (parent, args, context) => {
            const { ID } = args
            const deletedRecipe = await Recipe.findByIdAndDelete(ID)
            return deletedRecipe
        }









        // This holds all our mutation
        // async createRecipe(_, { recipeInput: { name, description, originated } }) {
        //     // This code is setting up the module.
        //     const createdRecipe = new Recipe({
        //         name: name,
        //         description: description,
        //         dateCreated: new Date().toISOString(),
        //         originated: originated,
        //     });
        //     const response = await createdRecipe.save(); // This is saying save the cretedRecipe schema or module to our MongoDB
        //     // need to return a recipe to our apollo-server resolver
        //     return {
        //         id: response.id,
        //         ...response._doc, //take all of the different properties of the result and show all the various properties that are going to show what our recipe is all about
        //     };
        // },
        // async deleteRecipe(_, { ID }) {
        //     const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount; // use a mongoose function called deleteOne
        //     return wasDeleted; // the deletedCount returns 1 if something was created and 0 if nothing was created
        // },
        // async editRecipe(_, { ID, recipeInput: { name, description } }) {
        //     const wasEdited = (
        //         await Recipe.updateOne(
        //             { _id: ID },
        //             { name: name, description: description }
        //         )
        //     ).modifiedCount; // returns an object similarly to the wasDeleted
        //     return wasEdited; // returns 0 if an ID can't be found
        // },
    },
};