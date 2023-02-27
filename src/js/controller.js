import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

// for pollyfiling everything else
import "core-js/stable";
// for pollyfiling async/await
import "regenerator-runtime/runtime";

// available to us when using parcel
if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // window.location is the whole URL
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // Loading recipe
    // because loadRecipe is an async function and an async function
    // always returns a promise that we need to handle if we want a
    // result out of it
    await model.loadRecipe(id);
    // const  recipe  = model.state.recipe; shorter way with destructuring below!
    // const { recipe } = model.state;

    // 2) Rendering recipe
    // recipeView.render(model.state.recipe);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    // console.err(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
