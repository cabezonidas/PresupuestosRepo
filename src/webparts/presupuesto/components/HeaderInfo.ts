export default class HeaderInfo { 
    public Customer: string;
    public CustomerNumber: string;
    public CustomerMail: string;
    public DaliveryDate: Date; 

    constructor() { 
        this.Customer = '';
        this.CustomerNumber = '';
        this.CustomerMail = '';
    }  
}