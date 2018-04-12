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

$(function() {

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
