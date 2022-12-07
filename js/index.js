//An event listener that ensures the html loads
document.addEventListener('DOMContentLoaded', () =>{
        const form = document.querySelector("#github-form");//Gets the form id and assigns it to a variable

    form.addEventListener('submit', (e) => {
            e.preventDefault()//Ensures that default actions of the browser are not carried out on the form
              let search = e.target.search.value//target is the form and search is the name of the variable, input
                //console.log(search)
                handleSearch(search)//Callback function

        const handleUrl = ('https://api.github.com/search/users?q=')

        function handleSearch() {
            fetch(handleUrl ,{
                method: 'GET',
                header:{
                'Content-Type': 'application/json',
                    Accept: 'application/vnd.github.v3+json'
                },
                body: JSON.stringify()
            })

            .then(response => response.json())

            .then(output => {console.log(output)

                document.querySelector('#user-list').innerHTML = ''
                document.querySelector('#repos-list').innerHTML =''
        
                output.items.forEach(user => {
                    console.log(user)
                    let userCard = document.createElement('li')//creates a list in the ul tag
                    userCard.className = 'all-users'
                    userCard.innerHTML = `
                        <div class='content'>
                            <h3> User: ${user.login}</h3>
                            <p> URL: ${user.html_url}</p>
                            <div class ='repos'>
                            <button class='repo-button' style='margin-bottom: 25px'> Repositories </button>
                            </div>
                                <img src=${user.avatar_url} />
                        </div>`
                    
                    document.querySelector('#user-list').appendChild(userCard)   
                
                    const repoButton = document.querySelector('.repo-button')
                        console.log(repoButton)
                    repoButton.addEventListener('click', () => {
                        fetch(user.repos_url, {
                            method: 'GET',
                            header:{
                               'Content-Type': 'application/json',
                                Accept: 'application/vnd.github.v3+json'
                            },
                            body: JSON.stringify()
                        })

                        .then(response => response.json())

                            .then(data => { data.forEach(repo => {
                                let repoCard = document.createElement('li')
                                repoCard.innerHTML = `
                                    <h4> ${repo.name} </h4>
                                    <p> ${repo.html_url}</p>
                                `
                                document.querySelector('#repos-list').appendChild(repoCard)    
                            });
                        });
                    });
                });
            });
        };
    });
});