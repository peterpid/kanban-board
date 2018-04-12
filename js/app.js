function isEmpty(str) {
    return (!str || 0 === str.length);
}

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '3080',
    'X-Auth-Token': '77646c064f94c5e837c0f5d2c86e8ffa'
};

$(function() {

    $.ajaxSetup({
        headers: myHeaders
    });

    $.ajax({
        url: baseUrl + '/board',
        method: 'GET',
        success: function(response) {
            setupColumns(response.columns);
        }
    });

    function setupColumns(columns) {
        columns.forEach(function (column) {
            var col = new Column(column.id, column.name);
            board.addColumn(col);
            setupCards(col, column.cards);
        });
    }

    function setupCards(col, cards) {
        cards.forEach(function (card) {
            var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
            col.addCard(cardObj);
        });
    }
});
