const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const row = document.getElementById("row");

const searchBook = async ()=> {
    const searchText = searchField.value;
    row.innerHTML = `
    <div class="spinner-border mx-auto" style="width: 3rem; height: 3rem;" role="status"></div
    `;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        getBooksByName(data);
    } catch (error) {
        console.log("Error");
    }
    
}

const getBooksByName = (data) =>{
    row.textContent = "";
    const details = data.docs

    const msg = [
        "No Result Found",
        "Total Searched Result",
        "Field Must Be not empty"
    ]
    const totalResult =
      searchField.value == ""
        ? msg[2]
        : details.length > 0
        ? msg[1] + " " + details.length
        : msg[0];

    const searchResult = document.createElement("h5");
    searchResult.innerText = totalResult;
    searchResult.classList.add("col-md-12");
    searchResult.classList.add("mb-3");
    searchResult.classList.add("text-center");
    row.appendChild(searchResult);

    console.log(details);

    details.forEach(detail => {
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.classList.add("mb-5");

        const {author_name} = detail;
        const {title} = detail;
        const {cover_i} = detail;
        const {first_publish_year} = detail;
        const {publisher} = detail;

  div.innerHTML = `
    <div class="card-deck" >
            <div class="card border-primary">
              <img class="card-img-top" height="250" src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" alt="Card image cap" />
              <div class="card-body text-primary">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">
                  ${author_name}
                </p>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <small class="text-muted">Published ${publisher}</small>
                <small class="text-muted">Published Date ${first_publish_year}</small>
              </div>
            </div>
          </div>
    `;
  row.appendChild(div);
    });
    
};
