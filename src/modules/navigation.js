export function navigation () {
   const navigationLinks = document.querySelectorAll(".header__link");
   let currentIndex = 0;
   const navigationLinkArr = [
      {
         url: 'index.html'
      },
      {
         url: 'audiobooks.html'
      },
      {
         url: 'stationery.html'
      },
      {
         url: 'blog.html'
      }
   ];
   let thisSubject = navigationLinkArr[currentIndex].url; 

   function redirectToPage(url) {
      window.location.href = url;
   }

   function setFirstMenuActive() {
      if (navigationLinks.length > 0) {
         const firstMenuTitle = navigationLinks[currentIndex];
         
         firstMenuTitle.classList.remove('menu__list-link');
         firstMenuTitle.classList.add('active-link');
      }
   };

   setFirstMenuActive();

   function updateMenuClasses(index) {
      navigationLinks.forEach(item => {
         item.classList.remove('active-link');
         item.classList.add('menu__list-link');
      });
      
      navigationLinks[index].classList.toggle('menu__list-link');
      navigationLinks[index].classList.toggle('active-link');
   }

   navigationLinks.forEach((dot, index) => {
      dot.addEventListener('click', () => {
         currentIndex = index;
         thisSubject = navigationLinkArr[index].url;

         console.log(thisSubject);
         redirectToPage(thisSubject);
         updateMenuClasses(currentIndex);
      });
   });

}