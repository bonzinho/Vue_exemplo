var hello = new Vue({
	el: '#app',

	data: {
		books: [], // array de livros
		MySearch: "",
		terms: [
			{
				name: 'All',
				value: ''
			},
			{
				name: 'Title',
				value: 'title'
			},
			{
				name: 'Description',
				value: "description"
			},
			{
				name: 'Value',
				value: "value"
			},
		],

		term: 'title',

		orderCol: 'id',
		orderInverse: 1,

		nRegistos: [
			{
				number:2
			},
			{
				number:5
			},
			{
				number:10
			},
			{
				number:20
			}
		],

		nRegisto: 2,

		pagination: {
			maxPage: 2,
			current: 1,
			totalItems: 0,
			totalPages: 0,
			listPagination: []
		},

	},
	
	methods: {

		filterOrderBy: function(e, col){
			e.preventDefault();
			this.orderCol = col;
			this.orderInverse = this.orderInverse * -1;
			//console.log(this.orderInverse);
		},

		previous: function(e){
			e.preventDefault();
			//alert('previous');
			

			// se a pagina corrente for = a 1 o numero minimo retorna falso para nao fazer nada
			if (this.pagination.current === 1) {
				return false;
			}
			// se a pagina nao for a minima remove um valor à pagina corente para ir para a anterior
			this.pagination.current = this.pagination.current -1;
			this.books = this.pagination.listPagination[this.pagination.current - 1]; // preenche o nosso array no data;

		},

		pagePagination: function(e, current){
			e.preventDefault();			
			this.pagination.current = current + 1;
			this.books = this.pagination.listPagination[current]; 
			
		},

		next: function(e){
			e.preventDefault();
			//alert('next');

			// se a pagina corrente for = ao numero maximo de paginas retorna falso para nao poder avançar mais
			if (this.pagination.current === this.pagination.totalPages) {
				return false;
			}
			// se a pagina corrente nao for o numero maximo entao incremente um valor apra avançar para a pagina seguinte e trasnforma a corrente em +1
			this.pagination.current = this.pagination.current +1;
			this.books = this.pagination.listPagination[this.pagination.current - 1]; // preenche o nosso array no data;

		}
		

	},

	ready: function() {

		var self = this;
		self.$http.get('dataServer.json').then(function(response){
			//console.log(response);
			self.pagination.totalItems = response.data.length;
			self.pagination.totalPages = Math.ceil(response.data.length / self.pagination.maxPage);
			var aux = [];
					
			for(var k in response.data) {
				// adiciona ao arrau aux o numero de items maximo definido na variavel pagination.maxPage
				aux.push(response.data[k]);
				if (aux.length === self.pagination.maxPage) {
					// envia para o pagination.listPagination o nosso array com no maximo 4 elementos
					self.pagination.listPagination.push(aux);
					// apaga array para iniciar ~vazio e usar par a proxima página
					aux = [];
				}
			}
			// se o array aux tiver ainda algum conteudo significa que é a ultima página então envia para p pagination.listPagination o que tem para ser mostrado na ultima pagina
			if (aux.length > 0) {
				self.pagination.listPagination.push(aux);
			}
			//console.log(self.pagination.listPagination);
			self.books = self.pagination.listPagination[0]; // preenche o nosso array no data;
		});
	}

});