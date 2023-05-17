import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_RECIPES } from "./graphql/queries";
import {
  CREATE_RECIPE,
  DELETE_RECIPE,
  UPDATE_RECIPE,
} from "./graphql/mutations";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);

  const [updateTitle, setUpdateTitle] = useState();
  const [updateImage, setUpdateImage] = useState();
  const [updateDesc, setUpdateDesc] = useState();
  const [updateId, setUpdateId] = useState();

  const [recipe, setRecipe] = useState({
    strCategory: "",
    strCategoryThumb: "",
    strCategoryDescription: "",
  });

  const { loading, error, data } = useQuery(GET_ALL_RECIPES);
  // create recipe
  const [createRecipe] = useMutation(CREATE_RECIPE);

  // update recipe
  const [updateRecipe] = useMutation(UPDATE_RECIPE);

  // delete recipe
  const [deleteRecipe] = useMutation(DELETE_RECIPE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const allRecipesData = data.allRecipe || "No data found";
  const allRecipes = [...allRecipesData];

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleShowCreateRecipe = () => {
    setShow(!show);
    setShowUpdate(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();

    createRecipe({
      variables: {
        recipe: {
          strCategory: recipe.strCategory,
          strCategoryThumb: recipe.strCategoryThumb,
          strCategoryDescription: recipe.strCategoryDescription,
        },
      },
    });
    console.log(recipe);
  };

  const handleUpdate = (recipe) => {
    console.log(recipe);
    setUpdateImage(recipe.strCategoryThumb);
    setUpdateTitle(recipe.strCategory);
    setUpdateDesc(recipe.strCategoryDescription);
    setUpdateId(recipe._id);
    setShowUpdate(true);
    setShow(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdateRecipe = (e) => {
    e.preventDefault();
    console.log(updateId);
    console.log(e);

    updateRecipe({
      variables: {
        id: updateId,
        strCategory: recipe.strCategory,
        strCategoryThumb: recipe.strCategoryThumb,
        strCategoryDescription: recipe.strCategoryDescription,
      },
    });

    console.log(recipe);
  };

  const handleDelete = (id) => {
    deleteRecipe({
      variables: {
        id: id,
      },
    });
  };

  return (
    <>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
            <a href="https://flowbite.com" className="flex items-center">
              <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">
                Recipe App
              </span>
            </a>

            <div className="flex items-center lg:order-2">
              <a
                onClick={handleShowCreateRecipe}
                href="#"
                className="text-white uppercase border border-primary-700 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Add New
              </a>
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div
              className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Company
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Marketplace
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <>
        {showUpdate && (
          <form
            onSubmit={handleUpdateRecipe}
            className="container p-10 mx-auto"
          >
            <h2 className="mb-5 text-3xl font-bold">Update Recipe</h2>
            <div class="relative z-0 w-full mb-6 group">
              <input
                onChange={handleChange}
                type="text"
                name="strCategory"
                id="title"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                defaultValue={updateTitle}
              />
              <label
                for="title"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Title
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                onChange={handleChange}
                type="text"
                name="strCategoryThumb"
                id="Image"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                defaultValue={updateImage}
                required
              />
              <label
                for="Image"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Image URL Link
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                onChange={handleChange}
                type="description"
                name="strCategoryDescription"
                id="description"
                class="block py-2.5 px-0 w-full text-sm text-bls bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                defaultValue={updateDesc}
              />
              <label
                for="description"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>

            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </form>
        )}
      </>

      <>
        {show && (
          <form onSubmit={handleAddRecipe} className="container p-10 mx-auto">
            <h2 className="mb-5 text-3xl font-bold">Create Recipe</h2>

            <div class="relative z-0 w-full mb-6 group">
              <input
                onChange={handleChange}
                type="text"
                name="strCategory"
                id="title"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="title"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Title
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                onChange={handleChange}
                type="text"
                name="strCategoryThumb"
                id="Image"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="Image"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Image URL Link
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                onChange={handleChange}
                type="description"
                name="strCategoryDescription"
                id="description"
                class="block py-2.5 px-0 w-full text-sm text-bls bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="description"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>

            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ADD
            </button>
          </form>
        )}
      </>

      <main className="grid grid-cols-1 gap-5 p-10 md:grid-cols-2 lg:grid-cols-3">
        {allRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <>
              <img
                className="rounded-t-lg"
                src={
                  recipe.strCategoryThumb ||
                  "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                }
                alt=""
              />
            </>
            <div className="p-5">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {recipe.strCategory}
              </h2>

              <a href="#">
                <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                  {recipe?.strCategoryDescription?.slice(0, 65)}...
                </h5>
              </a>

              <div className="flex justify-between">
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(recipe)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a
            href="https://flowbite.com"
            className="hover:underline"
            target="_blank"
          >
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 sm:mt-0">
          <li>
            <a
              href="#"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >
              Licensing
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-sm text-gray-500 hover:underline dark:text-gray-400"
            >
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default App;
