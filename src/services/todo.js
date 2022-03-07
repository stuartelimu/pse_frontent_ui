export function getTodos() {
    return fetch('http://localhost:5000/api/todos/')
        .then(data => data.json())
}

export function addTodoItem(todo) {
    console.log(JSON.stringify({todo}))
    return fetch('http://localhost:5000/api/todos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    .then(data => data.json())
}

export function removeTodoItem(id) {
    return fetch('http://localhost:5000/api/todos/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => data.json())
}

export function updateTodoItem(todo, id) {
    console.log(todo)
    return fetch('http://localhost:5000/api/todos/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    .then(data => data.json())
}