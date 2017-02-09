/**
 * Created by Bence Kormos on 09/02/2017.
 */
(() => {
    const $doc = $(document);

    const APP = {
        todos: []
    };

    const renderTodos = () => {
        let items = '<li class="empty">Create a todo first!</li>';

        if (APP.todos.length > 0) {
            items = APP.todos.map(todo =>
                `<li>${todo.text} <button class="delete-todo">x</button></li>`);
        }

        $doc.find('#todo-list').html(items);
    };

    const fetchTodos = () =>
        $.getJSON('/todos')
            .done(todos => {
                APP.todos = todos;
                renderTodos();
            });

    $doc
        .ready(fetchTodos)
        .on('click', '.delete-todo', e => {
            const $buttons = $doc.find('.delete-todo');
            const index = $buttons.index(e.target);

            const { _id } = APP.todos[index];
            const method = 'delete';

            $.ajax(`/todos/${_id}`, { method })
                .done(fetchTodos);
        });
})();