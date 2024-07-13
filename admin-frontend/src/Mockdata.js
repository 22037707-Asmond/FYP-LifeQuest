
export const mockdataPremium = [
    { id: 1, purchase_date: "12/01/2023", agent_id: 1, payment: 1200, insurance_id: 1, user_id: 1},
    { id: 2, purchase_date: "11/01/2023", agent_id: 2, payment: 3000, insurance_id: 2, user_id: 2},
    { id: 3, purchase_date: "11/02/2023", agent_id: 1, payment: 1600, insurance_id: 3, user_id: 3},
    { id: 4, purchase_date: "11/01/2023", agent_id: 4, payment: 1000, insurance_id: 4, user_id: 4},
    // more data...
];

export const mockdataAgents = [
    { id: 1, Phone_number: "12345678", agent_name: 'John Doe', Salary: 300, bank_acc: 1},
    { id: 2, Phone_number: "12345678", agent_name: 'Gohn Bae', Salary: 100, bank_acc: 2},
    { id: 3, Phone_number: "12345678", agent_name: 'Ibrahim Doe', Salary: 600, bank_acc: 3},
    { id: 4, Phone_number: "12345678", agent_name: 'Jane Doe', Salary: 200, bank_acc: 4},
    // more data...
];

export const mockdataUsers = [
    { id: 1, dob: "10/01/2002", user_name: 'Barry Doe'},
    { id: 2, dob: "11/01/1998", user_name: 'Narry Bae'},
    { id: 3, dob: "11/01/2005", user_name: 'Larry Doe'},
    { id: 4, dob: "11/01/2020", user_name: 'Farry Doe'},
    // more data...
];

export const mockTransactions =[
    { id: 1, user:"Narry Bae", date:"11/01/2023", amount: 3000},
    { id: 2, user:"Farry Doe", date:"11/01/2023", amount: 1000},
    { id: 3, user:"Barry Doe", date:"12/01/2023", amount: 1200},
    { id: 4, user:"admin1", date:"30/01/2023", amount: -1200},
    { id: 5, user:"Larry Doe", date:"11/02/2023", amount: 1600},
    { id: 3, user:"admin2", date:"30/02/2023", amount: -1200},

]
