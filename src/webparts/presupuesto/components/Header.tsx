import * as React from 'react';
import { Label } from "office-ui-fabric-react/lib/components/Label";
import { Dropdown } from "office-ui-fabric-react/lib/components/Dropdown";
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import * as _ from "lodash";

export default class Header extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            selectedProduct: ''
        };
  }      
  public render() {
    return (
        <div className="ms-Grid" style={{textAlign: 'left', verticalAlign: 'bottom'}}>
            <div className="ms-Grid-col ms-u-sm6 ms-u-md8 ms-u-lg9" >
                <Dropdown 
                    label='' 
                    options= {this.props.Products}
                    onChanged={(item) => this.setState({selectedProduct: item})}   
                />
            </div>
            <div className="ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg3" >
                <DefaultButton title='Agregar item al presupuesto' label='Agregar'
                    onClick={() => this.props.OnAddProduct(this.state.selectedProduct)}
                />
            </div>
        </div>
    );
  }
}