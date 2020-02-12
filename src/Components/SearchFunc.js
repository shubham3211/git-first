export const fetchRepos = (language, stars, searchText, selectedLabel) => {
  console.log(language, stars, searchText, selectedLabel  )
  const apiUrl = "https://api.github.com/search/repositories";

  let searchUrl = `${apiUrl}?q=${searchText.replace(/ /g, "+")}+in:readme`;

  if (language) {
    searchUrl += `+language:${language.toLowerCase()}`;
  }

  if (selectedLabel) {
    searchUrl += `+${selectedLabel.value}:>0`;
  }

  searchUrl += `+stars:0..${stars}&sort=stars&order=desc&per_page=100`;

  return fetch(searchUrl)
    .then(data => data.json())
};