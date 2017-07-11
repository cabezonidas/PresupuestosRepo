import * as React from 'react';
import { IPresupuestoProps } from './IPresupuestoProps';
import pnp from 'sp-pnp-js';
import Card from "./Card";
import Header from "./Header";
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import * as _ from "lodash";
import logo from './Logo';
import * as jsPDF from "jspdf";


export default class Presupuesto extends React.Component<IPresupuestoProps, any> {
    constructor() {
    super();
    this.addProduct = this.addProduct.bind(this);
    this.state = {
      products: []
    }; 
  }   
  public render(): React.ReactElement<IPresupuestoProps> {
    
    
    return (
      <div>
        <Header Products={this.state.products} OnAddProduct={this.addProduct}  />
        { 
          (_.filter(this.state.products, { 'selected': true }) as Array<any>).map(product => 
            <Card {...product} 
              OnDeletedProduct={this.removeProduct} 
              OnIncrementProduct={this.incrementProduct}
              OnDecrementProduct={this.decrementProduct}
            />
          ) 
        }
        <h2>
          Total: ${this.total()}
        </h2>
      </div>
    );
  }

  private total = () => 
      _.sumBy((_.filter(this.state.products, { 'selected': true }) as Array<any>), (o) => { return o.quantity * o.Precio; });
  

  private incrementProduct = (item) => {
    this.setState((prevState, props) => {
      let products = prevState.products.slice();
      products[item].quantity += products[item].CantidadMinima || 1;
      return {products: products};
    });
  }

  private decrementProduct = (item) => {
    this.setState((prevState, props) => {
      let products = prevState.products.slice();
      let quantity = products[item].quantity - (products[item].CantidadMinima || 1);
      products[item].quantity = quantity < 0 ? 0 : quantity;
      return {products: products};
    });
  }

  private loadProducts = (items) => {
    for (let i = 0; i < items.length; i++) { 
        items[i].key =  items[i].Id; 
        items[i].text = items[i].Title + ` ($${items[i].Precio})`;
        items[i].selected = false;
        items[i].quantity = items[i].CantidadMinima || 1;
    }
    this.setState({
      products: items
    });
  }

  private addProduct = (item) => {
    let products = this.state.products.slice();
    products[item.index].selected = true;
    this.setState({
      products: products
    });
  }

  private removeProduct = (index) => {
    let products = this.state.products.slice();
    products[index].selected = false;
    this.setState({
      products: products
    });
  }

  private componentDidMount = () => {
    pnp.sp.web.lists.getByTitle('Productos').items.top(10).orderBy('Title').get().then(items => this.loadProducts(items));
    /*pnp.sp.web.getFileByServerRelativeUrl('/SiteAssets/Logo.png').getText().then(
      (text: string) => {
        console.log(tex
    );
*/

var doc = new jsPDF()
doc.text(20, 20, 'Hello world cabe!')
doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.')
doc.addPage()
doc.text(20, 20, 'Do you like that?')
doc.save('a.pdf')

  }


  

}
