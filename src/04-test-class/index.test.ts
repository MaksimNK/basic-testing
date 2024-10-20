// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(1);
    expect(bankAccount.getBalance()).toBe(1);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(1);
    try {
      bankAccount.withdraw(10);
    } catch (error) {
      if (error instanceof Error)
        expect(error.message).toBe(
          `Insufficient funds: cannot withdraw more than 1`,
        );
    }
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(1);
    const anotherBankAccount = getBankAccount(1);
    try {
      bankAccount.transfer(10, anotherBankAccount);
    } catch (error) {
      if (error instanceof Error)
        expect(error.message).toBe(
          'Insufficient funds: cannot withdraw more than 1',
        );
    }
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1);
    try {
      bankAccount.transfer(10, bankAccount);
    } catch (error) {
      if (error instanceof Error) expect(error.message).toBe('Transfer failed');
    }
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(1);
    bankAccount.deposit(1);
    expect(bankAccount.getBalance()).toBe(2);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(1);
    bankAccount.withdraw(1);
    expect(bankAccount.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(1);
    const anotherBankAccount = getBankAccount(0);
    bankAccount.transfer(1, anotherBankAccount);
    expect(bankAccount.getBalance()).toBe(0);
    expect(anotherBankAccount.getBalance()).toBe(1);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(1);
    const balance = await bankAccount.fetchBalance();
    if (balance) expect(typeof balance).toBe('number');
    else expect(balance).toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(1);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(2);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(2);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(1);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
    try {
      await bankAccount.synchronizeBalance();
    } catch (error) {
      if (error instanceof Error)
        expect(error.message).toBe('Synchronization failed');
    }
  });
});
