$(function() {

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    //COLUMN
    function Column(name) {
        var self = this; // useful for nested functions

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            var $column         = $('<div>').addClass('col');
            var $columnTitle    = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list list-unstyled');
            var $columnDelete   = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard  = $('<button>').addClass('add-card').text('Add a card');
            
            $columnDelete.click(function() {
                self.removeColumn();
            });
            
            //Add a note after clicking on the button:
            $columnAddCard.click(function() {
                var cardName = prompt('Enter the name of the card', 'New task 1');
                if (!isEmpty(cardName)){
                    self.addCard(new Card(cardName));
                }
            });        

            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            
            return $column;
        }
    }

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },

        removeColumn: function() {
            this.$element.remove();
        }
    };

    //CARD
    function Card(title, description) {
        var self = this;

        this.id = randomString();
        this.title = title || 'Task name';
        this.description = description;
        this.$element = createCard();

        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardContatiner = $('<div>').addClass('media');
            var $cardBody = $('<div>').addClass('card-body media-body');
            var $cardTitle = $('<h5>').addClass('card-title mt-0').text(self.title);
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete align-self-center ml-3').text('x');

            $cardDelete.click(function(){
                self.removeCard();
            });

            $card.append($cardContatiner);
            $cardContatiner.append($cardBody)
                .append($cardDelete);
            $cardBody.append($cardTitle)
                .append($cardDescription);
                
            return $card;     
        }
    }

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    };

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    $('.create-column').click(function(){
        var name = prompt('Enter a column name', 'New column');
        if (!isEmpty(name)) {
            var column = new Column(name);
                board.addColumn(column);
        }
    });

    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var inprogressColumn = new Column('In progress');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(inprogressColumn);
    board.addColumn(doneColumn);

    // CREATING CARDS
    var card1 = new Card('Mission to Mars', 'Invent new rocket engine');
    var card2 = new Card('Task2');
    var card3 = new Card('Task3');
    var card4 = new Card('Task4');
    var card5 = new Card('Task5');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    todoColumn.addCard(card2);
    inprogressColumn.addCard(card3);
    inprogressColumn.addCard(card4);
    doneColumn.addCard(card5);

});
