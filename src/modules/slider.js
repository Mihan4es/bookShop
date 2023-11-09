import banner1 from "../img/slider/banner1.png";
import banner2 from "../img/slider/banner2.png";
import banner3 from "../img/slider/banner3.png";

export function slider() {

   const entities = [
      {
         img: banner1
      },
      {
         img: banner2
      },
      {
         img: banner3
      }
   ];
   
   const img = document.getElementById('images');

   const sliderDot = document.querySelectorAll('.slider__dot');

   const setEntity = (index) => {
      img.src = entities[index].img
   }

   let currentIndex = 0;
   
   setEntity(currentIndex);

   function thisSlider(index) {
      sliderDot.forEach(item => item.classList.remove('active'));
      sliderDot[index].classList.add('active');
   }

   function sliderDotActive() {
      sliderDot.forEach((dot, index) => {
         dot.addEventListener('click', () => {
            currentIndex = index;
   
            setEntity(currentIndex);
            thisSlider(currentIndex);
         });
      });
   }

   setInterval(() => {
      if(currentIndex == (entities.length - 1)) {
         currentIndex = 0;
      } else {
         currentIndex ++;
      }
      
      setEntity(currentIndex);
      thisSlider(currentIndex);
      sliderDotActive();
   }, 5000);
}

