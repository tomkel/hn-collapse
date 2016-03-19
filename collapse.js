// faster than querySelectorAll
// gives an HTMLCollection instead of a NodeList

// hyphen, not dash
const minusText = '[–]'
const plusText = '[+]'

function collapse() {
  const thisGif = this.parentElement.parentElement.parentElement.previousSibling
    .previousSibling.firstChild
  const depth = thisGif.width

  const gifs = document.querySelectorAll('img[src="s.gif"]')
  let hiding = false
  for (let gif of gifs) {
    if (thisGif === gif) {
      const comment = gif.parentElement.nextSibling.nextSibling.lastChild
      comment.classList.toggle('collapsed')
      if (this.text === minusText) {
        this.text = plusText
      } else {
        this.text = minusText
      }
      hiding = true
      continue
    }
    if (hiding) {
      if (gif.width <= depth) break
      const thing = gif.parentElement.parentElement.parentElement.parentElement.parentElement
        .parentElement
      thing.classList.toggle('collapsed')
    }
  }

  // return false to avoid scrolling to top
  return false
}

(() => {
  const comheads = document.getElementsByClassName('comhead')
  // for some reason using const here doesn't work
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
