class SearchView {
  #parentEl = document.querySelector(".search");

  getQuery() {
    const query = this.#parentEl.querySelector(".search__field").value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    // submit: because it works on the whole element if the user
    // clicks the button or
    this.#parentEl.addEventListener("submit", function (e) {
      // we cannot put the handler callback function directly,
      // first we need to prevent the default action, that is
      // page reload
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
