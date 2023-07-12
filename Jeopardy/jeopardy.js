// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
const apiUrl = 'http://jservice.io/api/'
const numCategories = 6
const numCluesPerCat = 5


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    let categoryIds = []
    let response = await axios.get(`${apiUrl}categories?count=100`)
    while(categoryIds.length < numCategories) {
        let randomIndex = Math.floor(Math.random() * response.data.length)
        let cluesCount = response.data[randomIndex].clues_count
        let categoryId = response.data[randomIndex].id
        if(cluesCount >= 5){
            if(!categoryIds.includes(categoryId)){
                categoryIds.push(categoryId)
            }
        }
    }
    return categoryIds
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
async function getCategory(catId) {
    let response = await axios.get(`${apiUrl}category?id=${catId}`)
    let cat = response.data
    let title = cat.title
    let clues = cat.clues

    return {
        title: title,
        clues: clues.map(function(clue){
            return {
                question: clue.question,
                answer: clue.answer,
                showing: null
            }
        }),
    };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function fillTable() {
    const tHead = document.querySelector('thead')
    const tBody = document.querySelector('tbody')
    const catRow = document.createElement('tr')
    tHead.innerHTML = ''
    tBody.innerHTML = ''

    for(let x = 0; x < numCategories; x++){
        const head = document.createElement('th')
        catRow.append(head)
        head.innerText = categories[x].title
    }
    tHead.append(catRow)

    for(let y = 0; y < numCluesPerCat; y++){
        const row = document.createElement('tr')
        for(let x = 0; x < numCategories; x++){
            const cell = document.createElement('td')
            cell.setAttribute('id', `${x}-${y}`)
            row.append(cell)
            cell.innerText = '?'
            cell.addEventListener('click', handleClick)
        }
        tBody.append(row)
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    evt.preventDefault()
    let [x, y] = evt.target.id.split('-')
    const clue = categories[x].clues[y];
    const isShowingQuestion = clue.showing;

    if(isShowingQuestion) {
        // show answer
        evt.target.innerText = clue.answer
    } else {
        // show question
        evt.target.innerText = clue.question
        clue.showing = true
    }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    document.getElementById('reset').onclick = function(){
        document.getElementById('jeopardy').style.visibility = 'hidden'
        document.getElementById('spin').style.display = ''
        setTimeout(() => {
            document.getElementById('jeopardy').style.visibility = 'visible'
            document.getElementById('spin').style.display = 'none'
        }, 3000);
    }
}


/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    let jep = document.getElementById('jeopardy')
    let spin = document.getElementById('spin')
    let btn = document.getElementById('start')
    let resetBtn = document.getElementById('reset')
    btn.addEventListener('click', function(){
        spin.style.display = 'none'
        jep.style.display = ''
        btn.style.display = 'none'
        resetBtn.style.display = ''
    })
    resetBtn.addEventListener('click', setupAndStart)
}



/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    categories = []
    // get an array of category ids
    const ids = await getCategoryIds();

    // get clues for all category ids
    for(let i = 0; i < ids.length; i++) {
        const categoryId = ids[i];
        const category = await getCategory(categoryId);

        categories.push(category);
    }

    hideLoadingView();
    fillTable();
    showLoadingView();
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO

// hideLoadingView()
// fillTable()

setupAndStart();
