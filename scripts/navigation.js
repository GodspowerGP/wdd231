const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation ul');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
});
