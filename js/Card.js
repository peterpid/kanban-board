function Card(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'Task name';
    this.$element = createCard();

    function createCard() {
        var $card             = $('<li>').addClass('card alert alert-primary my-1 p-0');
        var $cardContatiner   = $('<div>').addClass('media p-0');
        var $cardBody         = $('<div>').addClass('card-body media-body');
        var $cardTitle        = $('<h5>').addClass('card-title mt-0').text(self.name);
        var $cardDeleteButton = $('<div>').addClass('btn text-secondary align-self-end m-0 pt-1 pb-0 px-1');
            $cardDeleteButton.attr('title', 'Delete card'); //add tooltip
        var $deleteCardIcon   = $('<i>').addClass('material-icons').text('delete');

        $cardDeleteButton.click(function(){
            self.removeCard();
        });

        $cardDeleteButton.hover(
            function() { //handlerIn
                $cardDeleteButton.addClass('btn-danger');
                $cardDeleteButton.removeClass('text-secondary');
            },
            function() { //handlerOut
                $cardDeleteButton.removeClass('btn-danger');
                $cardDeleteButton.addClass('text-secondary');
            }
        );

        $card.append($cardContatiner);
        $cardDeleteButton.append($deleteCardIcon);
        $cardContatiner.append($cardBody)
            .append($cardDeleteButton);
        $cardBody.append($cardTitle);
            
        return $card;     
    }
}

Card.prototype = {
    removeCard: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function(){
                self.$element.remove();
            }
        });
    }
};