const carouselSlide = document.querySelector('.carousel-slide')
const carouselImages = document.querySelectorAll('.carousel-slide img')
const containerBox = document.querySelector('.carousel-container')

// Button
const prevBtn = document.querySelector('#prevBtn')
const nextBtn = document.querySelector('#nextBtn')
//控制小圆圈播放的变量
var circle = 0

//button按钮的自动显示和隐藏
containerBox.addEventListener('mouseenter', () => {
  prevBtn.style.display = 'block'
  nextBtn.style.display = 'block'
})
containerBox.addEventListener('mouseleave', () => {
  prevBtn.style.display = 'none'
  nextBtn.style.display = 'none'
})

//Counter
let counter = 1
const size = carouselImages[0].clientWidth
carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)'

//下标小圆圈的设置
const circles = document.querySelector('.circle')
for (var i = 0; i < carouselImages.length - 2; i++) {
  var li = document.createElement('li')
  li.setAttribute('index', i)
  circles.appendChild(li)
  //排他思想，绑定点击时间
  li.addEventListener('click', function () {
    //干掉所有人，留下我自己
    for (var i = 0; i < circles.children.length; i++) {
      circles.children[i].className = ''
    }
    this.className = 'current'
    var index = +this.getAttribute('index') + 1
    counter = index
    circle=index-1
    carouselSlide.style.transition = 'transform 0.5s ease-in-out'
    carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)'
  })
}
circles.children[0].className = 'current'

//Button Listeners

nextBtn.addEventListener('click', function () {
  if (counter >= carouselImages.length - 1) return
  carouselSlide.style.transition = 'transform 0.5s ease-in-out'
  counter++
  circle++
  if (circle == 5) {
    circle = 0
  }
  carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)'
  for (var i = 0; i < circles.children.length; i++) {
    circles.children[i].className = ''
  }
  circles.children[circle].className = 'current'
})
prevBtn.addEventListener('click', function () {
  if (counter <= 0) return
  carouselSlide.style.transition = 'transform 0.5s ease-in-out'
  counter--
  circle--
  if(circle==-1){
    circle=4
  }
  carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)'
  for (var i = 0; i < circles.children.length; i++) {
    circles.children[i].className = ''
  }
  circles.children[circle].className = 'current'
})
carouselSlide.addEventListener('transitionend', () => {
  if (carouselImages[counter].id === 'lastClone') {
    carouselSlide.style.transition = 'none'
    counter = carouselImages.length - 2
    carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)'
  } else if (carouselImages[counter].id === 'firstClone') {
    carouselSlide.style.transition = 'none'
    counter = 1
    carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)'
  }
})
