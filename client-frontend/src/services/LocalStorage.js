import axios from 'axios';

export const LocalStorage = {
    setAccount: (account) => {
        window.localStorage.setItem('account', JSON.stringify(account));
    },
    getAccount: async () => {
        const accountData = window.localStorage.getItem('account');
        if (accountData) {
            const parsedAccount = JSON.parse(accountData);
            try {
                const response = await axios.get(`/api/accounts/id/${parsedAccount.id}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching account data:', error);
                return null;
            }
        }
        return null;
    },
    clearAccount: () => {
        window.localStorage.removeItem('account');
    }
};
