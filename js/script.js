//Select overview element
const overview = document.querySelector(".overview");
const userName = "JLine79";
//Select ul for repository display
const repoList = document.querySelector(".repo-list")

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