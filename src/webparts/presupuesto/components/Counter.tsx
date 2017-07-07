import * as React from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { NumberTextField } from "./NumberTextField/NumberTextField";

export default class Counter extends React.Component<any, any> {
  public render() {
    return (
        <div className="ms-Grid" >
            <div className="ms-Grid-col">
                <IconButton
                    onClick={() => this.props.OnDecrementProduct(this.props.OnDecrementProduct)}
                    icon='PageLeft'
                />
            </div>
            <div className="ms-Grid-col" >
                { /* <NumberTextField
                    label={this.props.label}
                    initialValue={this.props.initialValue}
                /> */ }
                <Label>{this.props.initialValue}</Label>
            </div>
            <div className="ms-Grid-col" >
                <IconButton
                    onClick={() => this.props.OnIncrementProduct(this.props.OnIncrementProduct)}
                    icon='PageRight'
                />
            </div>
        </div>
    );
  }
}