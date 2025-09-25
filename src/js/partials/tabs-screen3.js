const screen3 = document.querySelector('.screen3')
const tabsScreen3Btn = screen3.querySelectorAll('.screen3__title');
const tabsScreen3Content = screen3.querySelectorAll('.screen3__inner');

if (window.innerWidth < 1025) {
  if (screen3) {
    tabsScreen3Btn.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabsScreen3Content.forEach(content => {
          content.classList.remove('screen3__inner_shown')
        });
        tabsScreen3Content[index].classList.toggle('screen3__inner_shown');
      })
    })

    window.addEventListener('resize', () => {
      tabsScreen3Content.forEach(content => {
        content.classList.remove('screen3__inner_shown')
      })
    })
  }
}
