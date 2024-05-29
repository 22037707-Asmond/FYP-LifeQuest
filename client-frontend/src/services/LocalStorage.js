export const LocalStorage = {
    setAccount: (account) => {
        window.localStorage.setItem('account', JSON.stringify(account));
    },
    getAccount: () => {
        const accountData = window.localStorage.getItem('account');
        if (accountData) {
            return JSON.parse(accountData);
        }
        return null;
    },
    clearAccount: () => {
        window.localStorage.removeItem('account');
    }
};
