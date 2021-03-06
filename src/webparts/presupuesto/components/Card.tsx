import * as React from 'react';
import { Label } from "office-ui-fabric-react/lib/components/Label";
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import Counter from "./Counter";

export default class Card extends React.Component<any, any> {
 
  public render() {
    return (
        <div className="ms-Grid" style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div className="ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                <IconButton title='' onClick={() => this.props.OnDeletedProduct(this.props.index)} 
                 icon='RecycleBin'
                 type="button"
                />
            </div>
            <div className="ms-Grid-col ms-u-sm5 ms-u-md5 ms-u-lg5">
                <Label label={this.props.Title} >{this.props.text}</Label>
            </div>
            <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg3">
                {/*<Counter label='' initialValue={this.props.quantity} 
                    OnIncrementProduct={() => this.props.OnIncrementProduct(this.props.index)}  
                    OnDecrementProduct={() => this.props.OnDecrementProduct(this.props.index)}  
                />*/}
                <TextField style={{width:"50px"}}
                     label='' onChanged={(value) => this.props.OnAlterProductQuantity(value, this.props.index)} 
                     value={this.props.quantity} />
            </div>
            <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg3">
                <Label>${this.props.quantity * this.props.Precio}</Label>
            </div>
        </div>
    );
  }
}