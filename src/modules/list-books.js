export function listBooks() {
   const category = [
      {
         name: 'Architecture',
         subject: 'Architecture'
      },
      {
         name: 'Art & Fashion',
         subject: 'Art'
      },
      {
         name: 'Biography',
         subject: 'Biography&Autobiography'
      },
      {
         name: 'Business',
         subject: 'Business'
      },
      {
         name: 'Crafts & Hobbies',
         subject: 'Crafts&Hobbies'
      },
      {
         name: 'Drama',
         subject: 'Drama'
      },
      {
         name: 'Fiction',
         subject: 'Fiction'
      },
      {
         name: 'Food & Drink',
         subject: 'Cooking'
      },
      {
         name: 'Health & Wellbeing',
         subject: 'Health&Fitness'
      },
      {
         name: 'History & Politics',
         subject: 'History'
      },
      {
         name: 'Humor',
         subject: 'Humor'
      },
      {
         name: 'Poetry',
         subject: 'Poetry'
      },
      {
         name: 'Psychology',
         subject: 'Psychology'
      },
      {
         name: 'Science',
         subject: 'Science'
      },
      {
         name: 'Technology',
         subject: 'Technology'
      },
      {
         name: 'Travel & Maps',
         subject: 'Travel'
      },
   ];
   const categoryContent = document.querySelector('.category__content');
   const categoryContentMobile = document.querySelector('.dropdown-menu');
   
   let listCart = JSON.parse(localStorage.getItem('books')) ?? [];

   function categoryResult(apiData) {
      let cards = '';
      let result = apiData;
   
      result.forEach(item => {
         const cardBlock = `
         <a href="#" class="category__link" id="category__link" name="${item.subject}">
            <span class="category__title">
               ${item.name}
            </span>
         </a>
         `;
   
         cards += cardBlock;
      });
      
      categoryContent.innerHTML = cards;
   };

   categoryResult(category);

   function categoryResultMobile(apiData) {
      let cards = '';
      let result = apiData;
    
      result.forEach(item => {
        const cardBlock = `<option class="category__link-mobile" value="${item.subject}">${item.name}</option>`;
        cards += cardBlock;
      });
    
      categoryContentMobile.innerHTML = cards;
    }
    
   categoryResultMobile(category);

   const categoryLinks = document.querySelectorAll('#category__link');
   // const categoryLinksMobile = document.querySelectorAll('#category__link-mobile');
   let currentIndex = 0;
   let thisSubject = category[currentIndex].subject; 

   function setFirstCategoryActive() {
      if (categoryLinks.length > 0) {
         const firstCategory = categoryLinks[currentIndex];
         
         firstCategory.classList.remove('category__link');
         firstCategory.classList.add('active__category');
      }
   };

   setFirstCategoryActive();

   function updateSliderClasses(index) {
      categoryLinks.forEach(item => {
         item.classList.remove('active__category');
         item.classList.add('category__link');
      });
      
      categoryLinks[index].classList.toggle('active__category');
      categoryLinks[index].classList.toggle('category__link');
   }

   categoryLinks.forEach((dot, index) => {
      dot.addEventListener('click', (event) => {
         event.preventDefault();
         currentIndex = index;
         thisSubject = category[index].subject;
         
         useRequest(indexPagination, thisSubject);
         updateSliderClasses(currentIndex);
      });
   });

   categoryContentMobile.addEventListener('change', (event) => {
      event.preventDefault(); 
      useRequest(1, event.target.value);
    });

   function useRequest(indexPagination, thisSubject) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `https://www.googleapis.com/books/v1/volumes?q="subject:${thisSubject}"&key=AIzaSyBnQdfhyAaD4nvso6MPlhR70XBy0Zmp1I8&printType=books&startIndex=${indexPagination}&maxResults=6&langRestrict=en`, true);
      
      xhr.onload = function() {
         if (xhr.status !== 200) {
            console.log('Статус ответа: ', xhr.status);
         } else {
            const result = JSON.parse(xhr.response);
            console.log(result);
            displayResult(result);     
         }
      };
   
      xhr.onerror = function() {
         console.log('Ошибка! Статус ответа: ', xhr.status);
      };
   
      xhr.send();
   };

   let indexPagination = 0;
   const loadMoreBtn = document.querySelector(".list-books__card--button");
   const handlePagination = () => {
      indexPagination += 6; 
      useRequest(indexPagination, thisSubject);
   };

   loadMoreBtn.addEventListener('click', handlePagination);
   
   const resultNode = document.querySelector('.list-books__cards');

   function displayResult(apiData) {
      let cards = '';
      let result = apiData.items;

      result.forEach(item => {
         const averageRating = item.volumeInfo.averageRating;
     
         let stars = '';
         for (let i = 0; i < averageRating; i++) {
           stars += '<span class="star"></span>';
         }
     
         for (let i = averageRating; i < 5; i++) {
           stars += '<span class="empty-star"></span>';
         }

         const cardBlock = `
         <div class="list-books__card">
            <div class="list-books__card--image">
               <img class="list-books__card--img" src="${item.volumeInfo.imageLinks?.thumbnail ?? '../img/list-book/Нет_фото.png'}">
            </div>
            <div class="list-books__card--content">
               <p class="list-books__card--autor">
                  ${item.volumeInfo.authors !== undefined ? item.volumeInfo.authors : ''}
               </p>
               <h2 class="list-books__card--name">
                  ${item.volumeInfo.title !== undefined ? item.volumeInfo.title : ''}
               </h2>
               <div class="list-books__card--reviews">
                  <div class="book-rating">
                     ${stars}
                  </div>
                  <p class="list-books__card--reviews-text">
                     ${item.volumeInfo.ratingsCount !== undefined ? item.volumeInfo.ratingsCount + ' review' : ''}
                  </p>
               </div>
               <p class="list-books__card--description">
                  ${item.volumeInfo.description !== undefined ? item.volumeInfo.description : ''}
               </p>
               <h2 class="list-books__card--price">
                  ${(item.saleInfo.retailPrice?.amount ?? '') + ' ' + (item.saleInfo.retailPrice?.currencyCode ?? '')}
               </h2>
               <button class="list-books__card--button addToCartButton ${listCart.includes(item.id) && 'list-books__card--button-active'}" id="${item.id}">
                  ${listCart.includes(item.id) ? 'in the cart' : 'buy now'}
               </button>
            </div>
         </div>
         `;

         cards += cardBlock;
      });

      resultNode.innerHTML = cards;

      const addToCartButtons = document.querySelectorAll('.addToCartButton');
      const hasItemInCart = document.querySelector('.nav-bar__loby-span');
      
      addToCartButtons.forEach(function(button) {
         button.addEventListener('click', function(ev) {
            const targetButton = ev.target;
            let idCartBook = targetButton.getAttribute('id');
            targetButton.classList.toggle('list-books__card--button-active');
            
            if (targetButton.classList.contains('list-books__card--button-active')) {
               targetButton.textContent = 'in the cart';
               targetButton.dataset.show = 'true';
               listCart.push(idCartBook);
            } else {
               targetButton.textContent = 'buy now';
               targetButton.dataset.show = 'false';
               listCart.splice(listCart.indexOf(idCartBook), 1);
            }

            localStorage.setItem('books', JSON.stringify(listCart));
            
            increaseCartItemQuantity();
         });
      });
      
      function increaseCartItemQuantity() {
         let cartItemCount = listCart.length;
       
         if (listCart.length > 0) {
           hasItemInCart.classList.add('nav-bar__loby-span-active');
         } else {
           hasItemInCart.classList.remove('nav-bar__loby-span-active');
         }
       
         hasItemInCart.textContent = cartItemCount;
      }

      function saveCartQuantity() {
         if (listCart.length > 0) {
           increaseCartItemQuantity();
         }
      }
       
      saveCartQuantity();
   };

   useRequest(indexPagination, thisSubject);
}