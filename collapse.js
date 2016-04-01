// dash, not hyphen
const minusText = '[–]'
const plusText = '[+]'

function collapse() {

  this.comment.classList.toggle('collapsed')
  this.upvote.classList.toggle('invisible')

  let hiding
  if (this.textContent === minusText) {
    this.textContent = plusText
    hiding = true
  } else {
    this.textContent = minusText
    hiding = false
  }

  const depth = this.gif.width

  // this fails when stored as a global for some reason
  const things = document.querySelector('.comment-tree').querySelectorAll('.athing')
  let found = false
  for (let thing of things) {
    if (thing === this.thing) {
      found = true
      continue
    }
    if (found) {
      if (thing.gif.width <= depth) break

      if (!thing.timesCollapsed)
        thing.timesCollapsed = 0
      if (hiding) {
        thing.timesCollapsed++
        if (thing.timesCollapsed > 0)
          thing.classList.add('collapsed')
      } else {
        thing.timesCollapsed--
        if (thing.timesCollapsed < 1)
          thing.classList.remove('collapsed')
      }
    }
  }
}

(() => {
  const commentTree = document.querySelector('.comment-tree')
  // faster than querySelectorAll
  // gives an HTMLCollection instead of a NodeList
  const comheads = commentTree.getElementsByClassName('comhead')
  for (let comhead of comheads) {
    const span = document.createElement('span')
    span.textContent = minusText
    span.className = 'collapsible'
    span.addEventListener('click', collapse)
    comhead.insertBefore(span, comhead.firstChild)

    let thing = span
    do {
      thing = thing.parentElement
    } while (thing.className !== 'athing')

    // setup references
    span.gif = thing.querySelector('img')
    span.comment = thing.querySelector('.comment')
    span.upvote = thing.querySelector('.votearrow').parentElement

    span.thing = thing
    thing.gif = span.gif
  }
})()
