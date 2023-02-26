(function( DOM ) {
    'use strict';
  
   
    var app = (function appController() {
      return {
        init: function init() {
          console.log( 'app init' );
          this.companyInfo();
          this.initEvents();
          this.getCars();
        },

        initEvents: function initEvents() {
          new DOM( '[data-js="form-register"]' ).on( 'submit', this.handleSubmit );     
        },

        handleSubmit: function handleSubmit( e ) {
          e.preventDefault();
          var $tableCar = new DOM( '[data-js="table-car"]' ).get();

          var carImage = new DOM('[data-js="image"]').get();
          var brandModel = new DOM('[data-js="brand-model"]').get();
          var year = new DOM('[data-js="year"]').get();
          var plate = new DOM('[data-js="plate"]').get();
          var color = new DOM('[data-js="color"]').get();

          var postCar = new XMLHttpRequest();
          postCar.open( 'POST', 'http://localhost:3000/car' );
          postCar.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
          postCar.send(`image=${carImage.value}
                        &brandModel=${brandModel.value}
                        &year=${year.value}
                        &plate=${plate.value}
                        &color=${color.value}`);
          postCar.onreadystatechange = function() {
            if( this.readyState === 4 ) {
            app.getCars();
            }
          } 
          $tableCar.appendChild( app.createNewCar() ) 
        },

        createNewCar: function createNewCar() {
          var $fragment = document.createDocumentFragment();
          var $tr = document.createElement('tr');
          var $tdImage = document.createElement('td');
          var $tdBrand = document.createElement('td');
          var $tdYear = document.createElement('td');
          var $tdPlate = document.createElement('td');
          var $tdColor = document.createElement('td');
          var $tdRemove = document.createElement('td');
          var $buttonRemove = document.createElement('button')
          var $image = document.createElement('img');
  
          $tr.setAttribute('id', new DOM('[data-js="plate"]').get().value);
  
          $image.setAttribute('src', new DOM('[data-js="image"]').get().value);
          $tdImage.appendChild($image)
  
          $tdRemove.appendChild($buttonRemove);
          $buttonRemove.innerHTML = 'Remover';
          $buttonRemove.setAttribute('data-remove', new DOM('[data-js="plate"]').get().value);
          $buttonRemove.classList.add('btn-remove');
  
          $buttonRemove.addEventListener('click', function(e) {
            e.preventDefault();
            $tr.parentNode.removeChild($tr); });
          
          $tdBrand.textContent = new DOM('[data-js="brand-model"]').get().value;
          $tdYear.textContent = new DOM('[data-js="year"]').get().value;
          $tdPlate.setAttribute('class', 'plate');
          $tdPlate.textContent = new DOM('[data-js="plate"]').get().value;
          $tdColor.textContent = new DOM('[data-js="color"]').get().value;
  
          $tr.appendChild($tdImage);
          $tr.appendChild($tdBrand);
          $tr.appendChild($tdYear);
          $tr.appendChild($tdPlate);
          $tr.appendChild($tdColor);
          $tr.appendChild($tdRemove);
  
          return $fragment.appendChild($tr);
        },

        getCars: function getCars() {
          var getCars = new XMLHttpRequest();
          getCars.open( 'GET', 'http://localhost:3000/car' );
          getCars.send();

          getCars.onreadystatechange = function() {
            if(!(app.isReady.call(this))) {            
              return;
            }
          }
        },

        companyInfo: function companyInfo() {
          var ajax = new XMLHttpRequest();
          ajax.open( 'GET', 'company.json', true );
          ajax.send();
          ajax.addEventListener( 'readystatechange', this.getCompanyInfo, false );
        },

        getCompanyInfo: function getCompanyInfo() {
          if ( !app.isReady.call( this ) )
            return
            var companyData = JSON.parse(this.responseText);
            var $companyName = new DOM( '[data-js="company-name"]' ).get();
            var $companyPhone = new DOM( '[data-js="company-phone"]' ).get();
            $companyName.textContent = companyData.name;
            $companyPhone.textContent = companyData.phone;
        },

        isReady: function isReady() {
          return this.readyState === 4 && this.status === 200
        }

      };
    })();

    app.init();

  })( window.DOM );
