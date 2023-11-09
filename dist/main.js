/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/img/slider/banner1.png":
/*!************************************!*\
  !*** ./src/img/slider/banner1.png ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "6844ef944865335f27f2f4a9e3cd5d18.png");

/***/ }),

/***/ "./src/img/slider/banner2.png":
/*!************************************!*\
  !*** ./src/img/slider/banner2.png ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "c9ef60dcbf2368b1e8ed43b58be2b8b0.png");

/***/ }),

/***/ "./src/img/slider/banner3.png":
/*!************************************!*\
  !*** ./src/img/slider/banner3.png ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "64b91fc08f2a814db89f50a5b9f21592.png");

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/modules/list-books.js":
/*!***********************************!*\
  !*** ./src/modules/list-books.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listBooks: () => (/* binding */ listBooks)
/* harmony export */ });
function listBooks() {
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

/***/ }),

/***/ "./src/modules/menu.js":
/*!*****************************!*\
  !*** ./src/modules/menu.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   menuBurger: () => (/* binding */ menuBurger)
/* harmony export */ });
function menuBurger() {
   const iconMenu = document.querySelector('.menu__icon');

   if (iconMenu) {
      const menuBody = document.querySelector('.header__menu-body');
      iconMenu.addEventListener('click', function (e) {
         iconMenu.classList.toggle('active__menu');
         menuBody.classList.toggle('active__menu');
      })
   }
}

/***/ }),

/***/ "./src/modules/navigation.js":
/*!***********************************!*\
  !*** ./src/modules/navigation.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   navigation: () => (/* binding */ navigation)
/* harmony export */ });
function navigation () {
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

/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   slider: () => (/* binding */ slider)
/* harmony export */ });
/* harmony import */ var _img_slider_banner1_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../img/slider/banner1.png */ "./src/img/slider/banner1.png");
/* harmony import */ var _img_slider_banner2_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/slider/banner2.png */ "./src/img/slider/banner2.png");
/* harmony import */ var _img_slider_banner3_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../img/slider/banner3.png */ "./src/img/slider/banner3.png");




function slider() {

   const entities = [
      {
         img: _img_slider_banner1_png__WEBPACK_IMPORTED_MODULE_0__["default"]
      },
      {
         img: _img_slider_banner2_png__WEBPACK_IMPORTED_MODULE_1__["default"]
      },
      {
         img: _img_slider_banner3_png__WEBPACK_IMPORTED_MODULE_2__["default"]
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var _src_modules_slider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../src/modules/slider.js */ "./src/modules/slider.js");
/* harmony import */ var _src_modules_list_books_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../src/modules/list-books.js */ "./src/modules/list-books.js");
/* harmony import */ var _src_modules_menu_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../src/modules/menu.js */ "./src/modules/menu.js");
/* harmony import */ var _src_modules_navigation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../src/modules/navigation.js */ "./src/modules/navigation.js");






(0,_src_modules_slider_js__WEBPACK_IMPORTED_MODULE_1__.slider)();
(0,_src_modules_list_books_js__WEBPACK_IMPORTED_MODULE_2__.listBooks)();
(0,_src_modules_menu_js__WEBPACK_IMPORTED_MODULE_3__.menuBurger)();
(0,_src_modules_navigation_js__WEBPACK_IMPORTED_MODULE_4__.navigation)();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map