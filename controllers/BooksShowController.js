
angular
  .module('bookApp')
  .controller('BooksShowController', BooksShowController);


BooksShowController.$inject = ['$http', '$routeParams', '$location'];

function BooksShowController ( $http, $routeParams, $location ) {
  var vm = this;
  console.log($routeParams);


  $http({
     method: 'GET',
     url: 'https://super-crud.herokuapp.com/books/'+ $routeParams.id
   }).then(onBookShowSuccess, onError);

   function onBookShowSuccess(response){
     console.log('Here\'s the book response data', response.data);
     vm.book = response.data;
   }
   function onError(error){
     console.log('There was an error getting book data: ', error);
   }


 vm.updateBook = function (book) {
   $http({
     method: 'PUT',
     url: 'https://super-crud.herokuapp.com/books/'+ book._id,
     data: book
   }).then(onBookUpdateSuccess, onError);

   function onBookUpdateSuccess(response) {
      console.log('book update response data: ', response.data);
      $location.path('/');
   }
   function onError(error) {
     console.log('There was an error updating the data: ', error);
   }
 }

 vm.deleteBook = function (book) {
   $http({
     method: 'DELETE',
     url: 'https://super-crud.herokuapp.com/books/'+ book._id
   }).then(onBookDeleteSuccess, onError);

   function onBookDeleteSuccess(response) {
     console.log('book delete response data: ', response.data);
     $location.path('/');
   }
   function onError(error){
     console.log('There was an error deleting book data: ', error);
   }
 }

}
