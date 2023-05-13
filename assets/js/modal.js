const modal = document.getElementById('myModal')
const modalContent = document.getElementById('modal-content')
const span = document.getElementsByClassName('close')[0]

function openModal(id) {
    id = id - 1
    modal.style.display = 'block'
    loadPokemonItemsModal(id)
}

span.addEventListener('click', () => {
    modal.style.display = 'none'
    modalContent.removeAttribute('class')
})

window.addEventListener('click', (event) => {
    if(event.target == modal) {
        modal.style.display = 'none'
        modalContent.removeAttribute('class')
    }
})