document.addEventListener('DOMContentLoaded', (event) => {
    loadUsersFromStorage();

    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = parseInt(document.getElementById('age').value);

        // Validate age
        if (isNaN(age) || age < 18) {
            alert('Age must be a number and at least 18.');
            return;
        }

        // Add user to table and local storage
        addUserToTable(firstName, lastName, age);
        saveUserToStorage(firstName, lastName, age);

        // Clear the form
        document.getElementById('userForm').reset();
    });
});

function addUserToTable(firstName, lastName, age) {
    const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.textContent = firstName;
    cell2.textContent = lastName;
    cell3.textContent = age;
}

function saveUserToStorage(firstName, lastName, age) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ firstName, lastName, age });
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsersFromStorage() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => addUserToTable(user.firstName, user.lastName, user.age));
}
