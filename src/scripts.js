const userMain = document.querySelector('.userMain')
const userProfile = document.querySelector('.userProfile')
const friends = document.querySelector('.friends')

//since multiple classes will need these, global
let community = null
let user = null

window.addEventListener('load', loadPage)

//this could just be done on lines 5 and 6,
//but if we want to ever load from local storage...
const createCommunity = () => {
  community = new UserRepository(userData)
  user = community.users[0]
}

//populates the greeting
//could be refactored to one line if stil readible
const greetUser = (user) => {
  const userFirstName = user.getFirstName()
  userMain.innerHTML = `<h2>Welcome ${userFirstName}`
//displays userFriends by first name, could also add images?
const showFriends = () => {
  const friendDisplay = user.friends.map(friend => {
    const friendName = community.getUserData(friend).getFirstName()
    return `<div>${friendName}</div>`
  })

  friends.innerHTML += friendDisplay.join(' ')
}

//we can add other calls to this onlaod function
function loadPage() {
  createCommunity()
  greetUser(user)
}
