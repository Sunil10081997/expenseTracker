let totalExpenses = 0;
const totalAmountView = document.getElementById('totalAmount');
console.log(totalAmountView,"this is the total amount view");
const expenses = JSON.parse(localStorage.getItem('expenses')) ||[];
expenses.map(expense=>totalExpenses+=expense.amount);

if(totalExpenses) totalAmountView.innerText =  totalExpenses


document.getElementById('expense-Form').addEventListener('submit', function (e) {
	e.preventDefault();
	let category = document.getElementById('category').value;
	//console.log(category);
	let name = document.getElementById('name').value;
	let date = document.getElementById('date').value;
	let amount = document.getElementById('amount').value;
	//console.log(amount);
	if (category == 'chooseOne' || name.length <= 0 || date == '') {
		return;
	}
	const expense = {
		category,
		name,
		date,
		amount,
		id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
	};

	totalExpenses+=parseInt(amount);
	totalAmountView.innerText =  totalExpenses

	expenses.push(expense);
	localStorage.setItem('expenses', JSON.stringify(expenses));

	document.getElementById('expense-Form').reset();
	showExpenses();
});

function showExpenses() {
	const expenseTable = document.getElementById('expenseTable');
	expenseTable.innerHTML = '';

	if (expenses.length > 0) {
		for (let i = 0; i < expenses.length; i++) {
			expenseTable.appendChild(createDataRow(expenses[i]));
		} 
	} else {
		expenseTable.appendChild(createEmptyRow());
	}
}

function createEmptyRow() {
	const expsRowElmt  = document.createElement('TR');

	expstdName.textContent = expense.name;
	const expstdforCategory  = document.createElement('TD');
	expstdforCategory .setAttribute('colspan', 5);
	expstdforCategory .textContent = 'No expense items yet! Please add one up top...';
	expsRowElmt .appendChild(expstdforCategory );
	return expsRowElmt ;   

}

function createDataRow(expense) {
	const expsRowElmt  = document.createElement('TR');

	const expstdforCategory  = document.createElement('TD');
	expstdforCategory .textContent = expense.category;
	expsRowElmt .appendChild(expstdforCategory );

	const expstdName = document.createElement('TD');
	expsRowElmt .appendChild(expstdName);

	const expstdDatetime = document.createElement('TD');
	expstdDatetime.textContent = expense.date;
	expsRowElmt.appendChild(expstdDatetime);

	const expstdAmount = document.createElement('TD');
	expstdAmount.textContent = 'Rs.' + expense.amount;
	expsRowElmt.appendChild(expstdAmount);

	const expenseTdOptionsEl = document.createElement('TD');
	const delAnchrElmnt = document.createElement('A');
	delAnchrElmnt.className = 'deleteButton';
	delAnchrElmnt.onclick = function (e) {
		deleteExpense(expense.id);
		// uiUpdate?
		//removeRowData
		localStorage.setItem('expenses', JSON.stringify(expenses));
	};

	delAnchrElmnt.textContent = 'Delete';
	expsRowElmt.appendChild(delAnchrElmnt);

	return expsRowElmt;
}

function deleteExpense(id) {
	for (let i = 0; i < expenses.length; i++) {
		if (expenses[i].id == id) {
			totalExpenses-=parseInt(expenses[i].amount);
			totalAmountView.innerText = totalExpenses;
			expenses.splice(i, 1);
		}
	}
}

// function totalamount() {
// 		//let tamount = document.getElementById('amount').value;		
// 		let tcount = expensesToday.length;
// 		let total = 0;
// 		for(let i=0; i<tcount; i++){
// 			total = total + parseInt(expensesToday[i]);
// 		}
// 		console.log(total);
// 	}

// 	const calculat = document.getElementById('btnData').addEventListener('submit' ,totalamount);
// 	console.log(calculat);

showExpenses();