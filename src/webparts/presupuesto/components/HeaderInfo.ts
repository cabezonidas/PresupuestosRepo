export default class HeaderInfo { 
    public Customer: string;
    public CustomerNumber: string;
    public CustomerMail: string;
    public DaliveryDate: Date; 

    constructor() { 
        this.Customer = 'Juan de las Casas';
        this.CustomerNumber = '4632-2961';
        this.CustomerMail = 'juandelascasas@gmail.com';
        this.DaliveryDate = new Date();
    }  
}