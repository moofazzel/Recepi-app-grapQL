import { gql } from "@apollo/client";

// export const GET_LOCATIONS = gql`
//     query GetLocations {
//       locations {
//         id
//         name
//         description
//         photo
//       }
//     }
//   `;


export const GET_ALL_RECIPES = gql`
  query allRecipe {
    allRecipe {
        _id
        strCategory
        strCategoryDescription
        strCategoryThumb
    }
}
  `





