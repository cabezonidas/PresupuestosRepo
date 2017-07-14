import * as React from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export default class Counter extends React.Component<any, any> {
  public render() {
    return (
        <div >            
            <div style={{ float:'left' }}>
                <IconButton
                    onClick={() => this.props.OnDecrementProduct(this.props.OnDecrementProduct)}
                    icon='PageLeft'
                    type="button"
                />
            </div>
            <div style={{ float:'left', width:'25px', textAlign: 'center' }}>
                <Label>{this.props.initialValue}</Label>
            </div>
            <div style={{ float:'left' }}>
                <IconButton
                    onClick={() => this.props.OnIncrementProduct(this.props.OnIncrementProduct)}
                    icon='PageRight'
                    type="button"
                />
            </div>
        </div>
    );
  }
}