// localStorageWithHook.js
import { useState, useEffect } from 'react';

export const LocalStorage = {
    setAccount: (account) => {
        window.localStorage.setItem('account', JSON.stringify(account));
    },
    getAccount: async () => {
        const accountData = window.localStorage.getItem('account');
        if (accountData) {
            const parsedAccount = JSON.parse(accountData);
            return parsedAccount;
        }
        return null;
    },
    clearAccount: () => {
        window.localStorage.removeItem('account');
    }
};

export const ReportStorage = {
    setReport: (report) => {
        window.localStorage.setItem('report', JSON.stringify(report));
    },
    getReport: async () => {
        const reportData = window.localStorage.getItem('report');
        if (reportData) {
            const parsedReport = JSON.parse(reportData);
            return parsedReport;
        }
        return null;
    },
    clearReport: () => {
        window.localStorage.removeItem('report');
    }
};

export const useAccount = () => {
    const [account, setAccount] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState('');

    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const accountData = await LocalStorage.getAccount();
                if (accountData) {
                    setAccount(accountData);
                    if (accountData.profilePicture) {
                        const url = `data:image/jpeg;base64,${accountData.profilePicture}`;
                        setProfilePictureUrl(url);
                    }
                }
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        };

        fetchAccountData();
    }, []);

    return { account, profilePictureUrl };
};
