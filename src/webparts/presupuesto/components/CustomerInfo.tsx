import * as React from 'react';
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { DatePicker } from "office-ui-fabric-react/lib/DatePicker";
import { Dialog, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export default class CustomerInfo extends React.Component<any, any> {
  public render() {
    return (
        <div>
            <Dialog
                isOpen={ this.props.showDialog }
                type={ DialogType.normal }
                onDismiss={ this.props.hideDialog }
                title='Información del pedido'
                subText={ !(this.props.saved || this.props.saving) ? '¿Desea agregar datos al pedido?' : 
                    this.props.saving ? 'Guardando...' :
                    'Guardado!' }
                isBlocking={ false }
                containerClassName='ms-dialogMainOverride'
                >
                { !(this.props.saved || this.props.saving) ? <div>                   
                    <TextField label='Cliente' 
                        value={this.props.customerInfo.Customer} 
                        onChanged={this.props.onCustomerChange}/>
                    <TextField label='Teléfono' 
                        value={this.props.customerInfo.CustomerNumber} 
                        onChanged={this.props.onCustomerNumberChange}/>
                    <TextField label='Email'
                        value={this.props.customerInfo.CustomerMail} 
                        onChanged={this.props.onCustomerEmailChange}/>
                    <DatePicker label='Fecha de Entrega' 
                        value={this.props.customerInfo.DaliveryDate} 
                        onSelectDate={this.props.onDeliveryDateChange}/>
                    <DefaultButton type="button"
                        label='Guardar'
                            onClick={this.props.onSave}/>
                    </div> : (null) }                
                { this.props.saving ? <Spinner size={ SpinnerSize.medium }/> : (null) }
                { this.props.saved ? 
                <div>
                    <table>
                        <tr>
                            <td>
                                <DefaultButton type="button"
                                    label='Imprimir'
                                    onClick={this.props.onPrint}/>
                            </td>
                            <td >
                                <DefaultButton type="button"
                                    label='Cerrar'
                                    onClick={this.props.onClose}/>
                            </td>                
                        </tr>
                    </table>
                </div> : (null) }
            </Dialog>
        </div>
    );
  }
}