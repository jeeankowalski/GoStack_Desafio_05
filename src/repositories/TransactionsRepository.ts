import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions
      .map(item => {
        if (item.type === 'income') {
          return item.value;
        }
        return 0;
      })
      .reduce((total, value) => {
        return total + value;
      }, 0);

    const outcomeTransactions = this.transactions
      .map(item => {
        if (item.type === 'outcome') {
          return item.value;
        }
        return 0;
      })
      .reduce((total, value) => {
        return total + value;
      }, 0);

    const totalTransactions = incomeTransactions - outcomeTransactions;

    const response: Balance = {
      income: incomeTransactions,
      outcome: outcomeTransactions,
      total: totalTransactions,
    };

    return response;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
