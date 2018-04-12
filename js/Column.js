function Column(id, name) {
var self = this; // useful for nested functions

    this.id = id;
    this.name = name || 'New column';
    this.$element = createColumn();

    function createColumn() {
        var $column              = $('<div>').addClass('col card-placeholder card mx-1 my-3 p-3');
        var $columnTitleHolder   = $('<div>').addClass('column-title-holder');
        var $columnTitle         = $('<h2>').addClass('column-title float-left').text(self.name);
        var $columnDeleteButton  = $('<div>').addClass('btn text-secondary my-1 pt-1 pb-0 px-1 float-right');
        $columnDeleteButton.attr('title', 'Delete column'); //add tooltip
        var $deleteColumnIcon    = $('<i>').addClass('material-icons').text('remove_circle_outline');
        var $columnCardList      = $('<ul>').addClass('column-card-list list-unstyled');
        var $columnAddCardButton = $('<button>').addClass('btn btn-light btn-add-card my-1 pt-1 pb-0 px-1');
        $columnAddCardButton.attr('title', 'New card'); //add tooltip
        var $newCardIcon         = $('<i>').addClass('material-icons').text('add');

        $columnDeleteButton.click(function() {
            self.removeColumn();
        });

        $columnDeleteButton.hover(
            function() { //handlerIn
                $columnDeleteButton.addClass('btn-danger');
                $columnDeleteButton.removeClass('text-secondary');
            },
            function() { //handlerOut
                $columnDeleteButton.removeClass('btn-danger');
                $columnDeleteButton.addClass('text-secondary');
            }
        );

        //Add a note after clicking on the button:
        $columnAddCardButton.click(function() {
            var cardName = prompt('Enter the name of the card', 'New task 1');
            if (isEmpty(cardName)){
                return;
            }

            $.ajax({
                    url: baseUrl + '/card',
                    method: 'POST',
                    data: {
                        name: cardName,
                        bootcamp_kanban_column_id: self.id
                    },
                    success: function(response) {
                        var card = new Card(response.id, cardName);
                        self.addCard(card);
                    }
            });
        });

        $columnDeleteButton.append($deleteColumnIcon);
        $columnTitleHolder.append($columnTitle)
        .append($columnDeleteButton);
        $columnAddCardButton.append($newCardIcon);
        $column.append($columnTitleHolder)
        .append($columnAddCardButton)
        .append($columnCardList);

        return $column;
    }
}

Column.prototype = {
    addCard: function(card) {
        this.$element.children('ul').append(card.$element);
    },

    removeColumn: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function(response){
            self.$element.remove();
        }
    });
        this.$element.remove();
    }
};
