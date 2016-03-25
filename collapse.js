// faster than querySelectorAll
// gives an HTMLCollection instead of a NodeList

// dash, not hyphen
const minusText = '[–]'
const plusText = '[+]'

function collapse() {
  const thisGif = this.parentElement.parentElement.parentElement.previousSibling
    .previousSibling.firstChild
  const depth = thisGif.width

  const gifs = document.querySelectorAll('img[src="s.gif"]')
  let hiding
  let found = false
  for (let gif of gifs) {
    if (thisGif === gif) {
      const comment = gif.parentElement.nextSibling.nextSibling.lastChild
      comment.classList.toggle('collapsed')
      const upvote = gif.parentElement.nextSibling
      upvote.classList.toggle('collapsed')
      if (this.text === minusText) {
        this.text = plusText
        hiding = true
      } else {
        this.text = minusText
        hiding = false
      }
      found = true
      continue
    }
    if (found) {
      if (gif.width <= depth) break
      const thing = gif.parentElement.parentElement.parentElement.parentElement.parentElement
        .parentElement
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
  const comheads = document.getElementsByClassName('comhead')
  for (let comhead of comheads) {
    // there is a span.sitebit.comhead that we don't want
    if (comhead.classList.length === 2) continue
    const a = document.createElement('a')
    a.text = minusText
    a.href = '#'
    a.onclick = collapse
    comhead.insertBefore(a, comhead.firstChild)
  }
})()
