import { gql } from "@apollo/client";


export const CREATE_RECIPE = gql`
    mutation createRecipe($recipe: RecipeInput) {
      createRecipe(recipe: $recipe) {
        strCategoryDescription
        strCategoryThumb
        strCategory
      }
    }
  `;


export const UPDATE_RECIPE = gql`
mutation UpdateRecipe($id: ID!, $strCategory: String, $strCategoryThumb: String, $strCategoryDescription: String) {
  updateRecipe(ID: $id, strCategory: $strCategory, strCategoryThumb: $strCategoryThumb, strCategoryDescription: $strCategoryDescription) {
    _id
    strCategory
    strCategoryDescription
    strCategoryThumb
  }
}
`;



export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
  deleteRecipe(ID: $id)
}
`;
