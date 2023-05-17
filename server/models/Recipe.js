const { model, Schema } = require("mongoose");

const recipeSchema = new Schema({
    strCategory: String,
    strCategoryThumb: String,
    strCategoryDescription: String,
});
module.exports = model("Recipe", recipeSchema);