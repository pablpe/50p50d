const APIURL = 'https://api.github.com/users/'
let main = document.getElementById("main");
let search = document.getElementById("search");

search.addEventListener("keydown", (key)=>{
    if(key.key === "Enter"){
        //main.innerHTML = "";
        getUser(search.value)
    }
})
async function getUser(username){
    let res = await axios(APIURL + username)
    let rep = await axios(APIURL + username + '/repos');
    console.log(res.data);
    appendCard(res.data, rep.data);
}
getUser("andri")
getUser("moloch--")
function appendCard(data, repos){
    let divAct = document.createElement("div");
    divAct.classList.add("card");
    divAct.innerHTML = `<div><img src=${data.avatar_url} alt=""></div>
                        <div class="user-info">
                            <h2><a href="${data.html_url}" target = "blank">${data.login}</a></h2>
                            <p>${data.bio}</p>
                            <ul>
                                <li>${data.followers} <strong>Followers</strong></li>
                                <li>${data.following} <strong>Following</strong></li>
                                <li>${data.public_repos} <strong>Repos</strong></li>
                            </ul>
                            <div id="repos">
                                <a href="${repos[0].html_url}" class="repos" target = "blank">Repo 1</a>
                                <a href="${repos[1].html_url}" class="repos" target = "blank">Repo 2</a>
                                <a href="${repos[2].html_url}" class="repos" target = "blank">Repo 3</a>
                            </div>
                        </div>`;
    main.prepend(divAct);
}
