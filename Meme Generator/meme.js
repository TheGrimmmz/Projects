const form = document.getElementById("form")
const memeImg = document.getElementById("memeImg")
const newDiv = document.createElement('div')
const newImg = document.createElement('img')
const newTopText = document.createElement('div')
const newBottomText = document.createElement('div')
const url = document.querySelector('input[name="image"]')
const topText = document.querySelector('input[name="topText"]')
const bottomText = document.querySelector('input[name="bottomText"]')
const overlayDiv = document.createElement('div')
const newP = document.createElement ('p')
const section = document.createElement('section')

//get img from url to add img to a new div to see img
//add top text on top of img at top
//add bottom text on top of img at bottom

//add top text user url bottom text
form.addEventListener('submit', function (e) {
    e.preventDefault()

//attach image and text together under section element
    memeImg.appendChild(section)
    section.appendChild(newDiv)
    newDiv.appendChild(overlayDiv)
    overlayDiv.appendChild(newP)
    newP.textContent = 'Remove'
    newDiv.appendChild(newTopText)
    newDiv.appendChild(newImg)
    newDiv.appendChild(newBottomText)

//receive user input
    newTopText.innerText = topText.value
    newBottomText.innerText = bottomText.value
    newImg.src = url.value

//set image width
    newImg.width = 400

//give new divs classes for css
    // section.className = 'remove'
    newDiv.className = 'remove'
    overlayDiv.className = 'overlay'
    newTopText.className = 'newTopText'
    newBottomText.className = 'newBottomText'
    // newImg.className = 'newImg'

//reset text fields to empty strings
    url.value = ''
    topText.value = ''
    bottomText.value = ''

})

//delete photo
memeImg.addEventListener('click', function (e) {
    const selectedPhoto = e.target.parentElement
    if (selectedPhoto.className === 'remove') {
        selectedPhoto.remove()
    }
})




//test photo
//https://cdn.vox-cdn.com/thumbor/IJifL8bGVqGXp8tS4r8eGMmLKuY=/715x248:1689x721/1820x1213/filters:focal(972x299:1278x605):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69305239/shrek4_disneyscreencaps.com_675.0.jpg
