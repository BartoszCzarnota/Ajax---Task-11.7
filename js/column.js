// COLUMN
function Column(id, name){	
	var self = this;
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.element = createColumn();
	

	function createColumn(){
	// tworzenie elementów składowych kolumny
		var column = $('<div>').addClass('column');
		var columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var columnBtns = $('<div>').addClass('column-btns');
		var columnCardList = $('<ul>').addClass('column-card-list');
		var columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
		var columnDelete = $('<button>').addClass('btn-delete-column').text('Usuń kolumnę');
		// podpinanie odpowiednich zdarzeń
		columnDelete.click(function(){
			self.deleteColumn();
		});
		columnAddCard.click(function(event){
			var cardName = prompt("Wpisz nazwę karty");
			event.preventDefault();
			//self.createCard(new Card(cardName)); it's unnecessary
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					var card = new Card(response.id, cardName);
					self.createCard(card);
				}	
			});
		});
	// konstruowanie elementu kolumny
		column.append(columnTitle)
		column.append(columnBtns)
		columnBtns.append(columnAddCard)
		columnBtns.append(columnDelete)
		column.append(columnCardList);
	// zwracanie stworzonej listy
		return column;
	}	
}	
Column.prototype = {
	createCard: function(card) {
		this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function(response){
				self.element.remove();
			}
		});
	}
};