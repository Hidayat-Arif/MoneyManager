// script.js
document.addEventListener('DOMContentLoaded', () => {
    let balance = parseFloat(localStorage.getItem('balance')) || 0;
    const saldoElement = document.getElementById('saldo');
    const form = document.getElementById('transaction-form');
    const amountInput = document.getElementById('amount');
    const typeSelect = document.getElementById('type');
    const transactionHistory = document.getElementById('transaction-history');
    const resetButton = document.getElementById('reset-button');

    saldoElement.textContent = `Rp ${balance.toFixed(2)}`;

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
        addTransactionToHistory(transaction);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(amountInput.value);
        const type = typeSelect.value;

        if (type === 'expense' && balance < amount) {
            saldoElement.classList.add('low');
            setTimeout(() => saldoElement.classList.remove('low'), 1000);
            return alert("Saldo tidak cukup!");
        }

        balance += type === 'income' ? amount : -amount;
        saldoElement.textContent = `Rp ${balance.toFixed(2)}`;

        const transaction = { type, amount };
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('balance', balance.toFixed(2));

        addTransactionToHistory(transaction);
        amountInput.value = '';
    });

    function addTransactionToHistory(transaction) {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.textContent = `${transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}: Rp ${transaction.amount.toFixed(2)}`;
        transactionHistory.appendChild(li);
    }

    resetButton.addEventListener('click', () => {
        if (confirm("Hapus semua data?")) {
            localStorage.clear();
            saldoElement.textContent = "Rp 0.00";
            transactionHistory.innerHTML = '';
            alert("Data dihapus!");
        }
    });
});
