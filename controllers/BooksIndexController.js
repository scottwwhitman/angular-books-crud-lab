angular
  .module('bookApp')
  .controller('BooksIndexController', BooksIndexController);

BooksIndexController.$inject = [ '$http' ];

function BooksIndexController ($http) {
  var vm = this;
  vm.newBook = {};
  // vm.newBook = {
  //   image: '',
  //   title: '',
  //   author: '',
  //   releaseDate: ''
  // };

  $http({
     method: 'GET',
     url: 'https://super-crud.herokuapp.com/books'
   }).then(onBooksIndexSuccess, onError)

   function onBooksIndexSuccess(response){
     console.log('Here\'s the get all books response data', response.data);
     vm.books = response.data.books;
   }
   function onError(error){
     console.log('There was an error getting index data: ', error);
   }


  vm.createBook = function () {
    $http({
      method: 'POST',
      url: 'https://super-crud.herokuapp.com/books',
      data: vm.newBook,
    }).then(onBookCreateSuccess, onError)

    vm.newBook = {
      image: '',
      title: '',
      author: '',
      releaseDate: ''
    };
  }

  function onBookCreateSuccess(response) {
    console.log('Here\'s the create book response data', response.data);
    vm.books.push(response.data);
  }
  function onError(error) {
    console.log('There was an error posting the data', error);
  }


}
