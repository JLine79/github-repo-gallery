//Select overview element
const overview = document.querySelector(".overview");
const userName = "JLine79";
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
