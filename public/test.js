// As we know, ontouchstart invokes before click and mousedown events.
// As i investigated mousedownd invokes very fast after ontouchstart, and this second event invokes on current mouse
//position, so if we move mouse pretty fast from the block, the second block will not be deleted.
// If we just touch first block, we can se in console, that second event invokes on the same coords, where the new
//block appears at that time, so mousedown event get it as his target(and delete)

//e.preventDefault on 'function onMouseDown(e)' prevent this situation (and every other actions in onMouseDown
// function as well, so i cant say, that it is a solution

//Anyway this stuff happens in vanilla js.


//get a collection of divs
const boxes = document.getElementsByClassName('box')
console.log(boxes)

//click handler
function onMouseDown(e) {
  //this wont stop double delete
  // e.preventDefault()
  console.log('I am CLICK target Id===>', e.target.id)
  //click event info
  console.log('EVENT TYPE ===>', e.type, ', EVENT X ===>', e.clientX, ', EVENT Y ===>', e.clientY)
  const id = e.target.id
  //as we do not have any more link to element, this will delete it
  document.getElementById(id).remove()
}

//touchstart handler
function onTouchStart(e) {
  //This stops double delete
  e.preventDefault()
  //Use 'touches' object to get touch event data
  console.log('I am TOUCHSTART target ID ===>', e.touches[0].target.id)
  console.log('EVENT TYPE ===>', e.type, ', EVENT X ===>', e.touches[0].pageX, ', EVENT Y ===>', e.touches[0].pageX)
  const id = e.touches[0].target.id

  //delete for touch events
  document.getElementById(id).remove()
}

//Add eventListener for click
Array.from(boxes).forEach(function (item, i, arr) {
  item.addEventListener('mousedown', onMouseDown, {passive: false})
})

// Add eventListener for touch
Array.from(boxes).forEach(function (item, i, arr) {
  item.addEventListener('touchstart', onTouchStart, {passive: false})
})