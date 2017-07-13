import * as React from 'react';
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DatePicker } from "office-ui-fabric-react/lib/DatePicker";



export default class CustomerInfo extends React.Component<any, any> {
  public render() {
    return (
        <div>
            <TextField label='Cliente' 
                value={this.props.customerInfo.Customer} 
                onChanged={this.props.onCustomerChange}/>
            <TextField label='Telefono' 
                value={this.props.customerInfo.CustomerNumber} 
                onChanged={this.props.onCustomerNumberChange}/>
            <TextField label='Email'
                value={this.props.customerInfo.CustomerMail} 
                onChanged={this.props.onCustomerEmailChange}/>
            <DatePicker label='Fecha de Entrega' 
                value={this.props.customerInfo.DaliveryDate} 
                onSelectDate={this.props.onDeliveryDateChange}/>
        </div>
    );
  }
}