// dash, not hyphen
const minusText = '[–]'
const plusText = '[+]'

function collapse() {

  this.comment.classList.toggle('collapsed')
  this.upvote.classList.toggle('invisible')

  let hiding
  if (this.text === minusText) {
    this.text = plusText
    hiding = true
  } else {
    this.text = minusText
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

  // return false to avoid scrolling to top
  return false
}

(() => {
  const commentTree = document.querySelector('.comment-tree')
  // faster than querySelectorAll
  // gives an HTMLCollection instead of a NodeList
  const comheads = commentTree.getElementsByClassName('comhead')
  for (let comhead of comheads) {
    const a = document.createElement('a')
    a.text = minusText
    a.href = '#'
    a.addEventListener('click', collapse)
    comhead.insertBefore(a, comhead.firstChild)

    let thing = a
    do {
      thing = thing.parentElement
    } while (thing.className !== 'athing')

    // setup references
    a.gif = thing.querySelector('img')
    a.comment = thing.querySelector('.comment')
    a.upvote = thing.querySelector('.votearrow').parentElement

    a.thing = thing
    thing.gif = a.gif
  }
})()
