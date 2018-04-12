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
    var columnName = prompt('Enter a column name', 'New column');
    if (isEmpty(columnName)) {
        return;
    }
    $.ajax({
        url: baseUrl + '/column',
        method: 'POST',
        data: {
            name: columnName
        },
        success: function(response){
            var column = new Column(response.id, columnName);
            board.addColumn(column);
        }
    });
});