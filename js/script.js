//Select overview element
const overview = document.querySelector(".overview");
const userName = "JLine79";
//Select ul for repository display
const repoList = document.querySelector(".repo-list")

//Select and show repo data
const repoSection = document.querySelector(".repos")
const repoIndividualData = document.querySelector(".repo-data")

//Fetch API JSON data
const getInfo = async function () {
    const data = await fetch (`https://api.github.com/users/${userName}`)
    const result = await data.json()
    displayInfo(result)
}

getInfo();

//display user information on page
const displayInfo = function (result) {
    const userInfo = document.createElement("div")
    userInfo.classList.add(".user-info")
    userInfo.innerHTML = `<figure>
                            <img alt="user avatar" src=${result.avatar_url} />
                          </figure>
                            <div>
                                <p><strong>Name:</strong> ${result.name}</p>
                                <p><strong>Bio:</strong> ${result.bio}</p>
                                <p><strong>Location:</strong> ${result.location}</p>
                                <p><strong>Number of public repos:</strong> ${result.public_repos}</p>
                            </div> `
    overview.append(userInfo);
}

//Fetch repository information from GitHub user profile
const getRepositories = async function () {
    const repoData = await fetch (`https://api.github.com/users/${userName}/repos?sort=created&per_page=100`)
    const repos = await repoData.json()
    displayRepo(repos)
    //console.log(repos)
}

getRepositories()

//Display info about repos
const displayRepo = function (repos) {
    for (const repo of repos) {
        const addRepo = document.createElement("li")
        addRepo.classList.add("repo")
        addRepo.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(addRepo)
    }
}

//Event when an individual repo is clicked
const selectRepo = repoList.addEventListener ("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText
        repoSpecs(repoName)
    }
})

//Get information about specific repository on click
const repoSpecs = async function (repoName) {
    const singleRepoData = await fetch (`https://api.github.com/repos/${userName}/${repoName}`)
    const repoInfo = await singleRepoData.json()
    console.log(repoInfo)
    // Fetch language info from individual repo
    const fetchLanguages = await fetch (`https://api.github.com/repos/${userName}/${repoName}/languages`)
    const languageData = await fetchLanguages.json()
    //console.log(languageData)
    const languages = []
    for (let key in languageData) {
        languages.push(key)
    }
    //console.log(languages)
    displayRepoInfo(repoInfo, languages)
}

//Display specific repo information
const displayRepoInfo = function (repoInfo, languages) {
    repoIndividualData.innerHTML = ""
    const createRepoElement = document.createElement("div")
    createRepoElement.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoIndividualData.append(createRepoElement)
    repoIndividualData.classList.remove("hide")
    repoSection.classList.add("hide")
}

