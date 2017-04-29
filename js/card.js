// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.element = createCard();

	function createCard() {
	// tworzenie elemntów składowych karty
		var card = $('<li>').addClass('card');
		var cardDescription = $('<p>').addClass('card-description').text(self.name);
		var cardDelete = $('<button>').addClass('btn-delete-card').text('x');

	// podpinanie odpowiednich zdarzeń
		cardDelete.click(function() {
			self.removeCard();
		});
	// konstruowanie elementu karty
		card.append(cardDelete);
		cardDescription.text(self.name);
		card.append(cardDescription);
	// zwracanie stworzonej karty
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){ //response
				self.element.remove();
			}
		});
	}
};
