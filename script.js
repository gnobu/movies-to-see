// create a movie object
let movieList = {};

// create a counter to be used as movie IDs
let count = 0;

// function to add movie to the form
function addMovie(movie) {
    let section = document.querySelector('#tasks-container');
    let div = document.createElement('div');
    div.innerHTML = `
        ${movie}
    `;
    div.classList.add('task');
    let btn = document.createElement('button');
    btn.innerText = 'done';
    btn.classList.add('btn');
    btn.id = `${count}`;
    btn.addEventListener('click', deleteMovie);
    div.append(btn);
    section.append(div);
    count++;
}

// function that adds movie to the movie object
function createMovie(e) {
    e.preventDefault();
    let task = document.getElementById('task');
    if (task.value.length < 2) {
        return;
    } else {
        movieList[count] = task.value.toLowerCase();
        addMovie(task.value);
        task.value = '';
    }
}

// function to delete a movie
function deleteMovie(e) {
    e.preventDefault();
    e.target.parentNode.remove();
    delete movieList[e.target.id];
}

// function that filters an object and returns matched properties
function findStr(str) {
    // convert object to [key,value] array
    const movieArray = Object.entries(movieList);

    // filter the array
    const filtered = movieArray.filter(([key,value]) => value.includes(str));
    
    // convert filtered back to object
    const filteredMovies = Object.fromEntries(filtered);
    return filteredMovies;
    console.log(filteredMovies);
}

// function to search for movie in the movie object
function findMovie(e) {
    let str = e.target.value;

    let children = document.querySelector('#tasks-container').children;
    if (str.length >= 1) {
        for (let i = 0; i < children.length; i++) {
            children[i].style.display = 'none';
        }
        let foundMovies = findStr(str);

        let btns = Object.keys(foundMovies);
        btns.forEach(btn => {
            document.getElementById(`${btn}`).parentNode.style.display = 'flex';
        })
    } else {
        for (let i = 0; i < children.length; i++) {
            children[i].style.display = 'flex';
        }
    }
}

let form = document.querySelector('#add');
form.addEventListener('click', createMovie);

let search = document.querySelector('#search');
search.addEventListener('keyup', findMovie);
