(function( DOM ) {
    'use strict';
  
    /*
    Vamos estruturar um pequeno app utilizando módulos.
    Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
    A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
    seguinte forma:
    - No início do arquivo, deverá ter as informações da sua empresa - nome e
    telefone (já vamos ver como isso vai ser feito)
    - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
    um formulário para cadastro do carro, com os seguintes campos:
      - Imagem do carro (deverá aceitar uma URL)
      - Marca / Modelo
      - Ano
      - Placa
      - Cor
      - e um botão "Cadastrar"
    Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
    carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
    aparecer no final da tabela.
    Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
    empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
    Dê um nome para a empresa e um telefone fictício, preechendo essas informações
    no arquivo company.json que já está criado.
    Essas informações devem ser adicionadas no HTML via Ajax.
    Parte técnica:
    Separe o nosso módulo de DOM criado nas últimas aulas em
    um arquivo DOM.js.
    E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
    que será nomeado de "app".
    */

    var app = (function appController() {
      return {
        init: function init() {
          console.log( 'app init' );
          this.companyInfo();
          this.initEvents();
        },

        initEvents: function initEvents() {
          new DOM( '[data-js="form-register"]' ).on( 'submit', this.handleSubmit );     
        },

        handleSubmit: function handleSubmit( e ) {
          e.preventDefault();
          var $tableCar = new DOM( '[data-js="table-car"]' ).get();
          console.log( 'submit' );
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
  
          $buttonRemove.addEventListener('click', function() {
            $tr.parentNode.removeChild($tr);
          });
  
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

        companyInfo: function companyInfo() {
          var ajax = new XMLHttpRequest();
          ajax.open( 'GET', 'company.json', true );
          ajax.send();
          ajax.addEventListener( 'readystatechange', this.getCompanyInfo, false );
        },

        getCompanyInfo: function getCompanyInfo() {
          if ( !app.isReady.call( this ) )
            return
            var data = JSON.parse(this.responseText);
            var $companyName = new DOM( '[data-js="company-name"]' ).get();
            var $companyPhone = new DOM( '[data-js="company-phone"]' ).get();
            $companyName.textContent = data.name;
            $companyPhone.textContent = data.phone;
        },

        isReady: function isReady() {
          return this.readyState === 4 && this.status === 200
        }

      };
    })();

    app.init();

    


  })( window.DOM );
