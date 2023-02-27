class SearchView {
  _parentEl = document.querySelector(".search");

  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    // submit: because it works on the whole element if the user
    // clicks the button or
    this._parentEl.addEventListener("submit", function (e) {
      // we cannot put the handler callback function directly,
      // first we need to prevent the default action, that is
      // page reload
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
