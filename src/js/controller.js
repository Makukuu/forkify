import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

// for pollyfiling everything else
import "core-js/stable";
// for pollyfiling async/await
import "regenerator-runtime/runtime";

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
    alert(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
