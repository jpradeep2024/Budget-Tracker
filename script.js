let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (description === "" || amount <= 0) {
        alert("Please enter valid data");
        return;
    }

    transactions.push({
        id: Date.now(),
        description,
        amount,
        type
    });

    saveData();
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveData();
}

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
    calculateTotals();

}

function renderTransactions() {
    const list = document.getElementById("transactionList");
    const filter = document.getElementById("filter").value;
    list.innerHTML = "";

    transactions
        .filter(t => filter === "all" || t.type === filter)
        .forEach(t => {
            const li = document.createElement("li");
            li.className = `transaction ${t.type}`;
            li.innerHTML = `
                ${t.description} - ₹${t.amount}
                <span class="delete" onclick="deleteTransaction(${t.id})">✖</span>
            `;
            list.appendChild(li);
        });
}

function calculateTotals() {
    let income = 0, expense = 0;

    transactions.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
    });

    document.getElementById("totalIncome").innerText = income;
    document.getElementById("totalExpense").innerText = expense;
    document.getElementById("balance").innerText = income - expense;
}



saveData();