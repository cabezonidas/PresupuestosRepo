import * as React from 'react';
import { IPresupuestoProps } from './IPresupuestoProps';
import pnp from 'sp-pnp-js';
import Card from "./Card";
import ProductSelector from "./ProductSelector";
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import * as _ from "lodash";
import { SPComponentLoader } from '@microsoft/sp-loader';
import ConvertToPdf from './ConvertToPdf';
import HeaderInfo from "./HeaderInfo";
import CustomerInfo from "./CustomerInfo";

export default class Presupuesto extends React.Component<IPresupuestoProps, any> {
    constructor() {
    super();
    this.addProduct = this.addProduct.bind(this);
    this.state = {
      products: [],
      headerInfo: new HeaderInfo(),
      showDialog: false,
      saving: false,
      documentSaved: false,
      documentUrl: ''
    }; 
    pnp.sp.web.get().then(web => SPComponentLoader.loadCss(web.Url + '/CDN/PresupuestosWebpartStyles.css'));
  }   
  public render(): React.ReactElement<IPresupuestoProps> {   
    return (
      <div>   
        <ProductSelector Products={this.state.products} OnAddProduct={this.addProduct}  />
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
        <DefaultButton label='Guardar' onClick={this.askCustomerInformation} type="button"/>
        <CustomerInfo onCustomerChange={this.updateCustomer} 
          onCustomerNumberChange={this.updateCustomerNumber} 
          onCustomerEmailChange={this.updateCustomerEmail} 
          onDeliveryDateChange={this.updateDeliveryDate} 
          customerInfo={this.state.headerInfo}
          showDialog={this.state.showDialog}
          hideDialog={this.onHideCatalog}
          onSave={this.makePdf}
          onClose={ this.onHideCatalog }
          saving={this.state.saving}
          saved={this.state.documentSaved}
          onPrint={() => { window.open(this.state.documentUrl); this.onHideCatalog();}}
        />
      </div>
    );
  }

  private onHideCatalog = () => {
      this.setState({showDialog: false, documentSaved: false });
  }

  private updateCustomer = (value) => 
    this.setState((prevState, props) => {
      prevState.headerInfo.Customer = value;
      return {headerInfo: prevState.headerInfo};
    })

  private updateCustomerNumber = (value) => 
    this.setState((prevState, props) => {
      prevState.headerInfo.CustomerNumber = value;
      return {headerInfo: prevState.headerInfo};
    })

  private updateCustomerEmail = (value) => 
    this.setState((prevState, props) => {
      prevState.headerInfo.CustomerMail = value;
      return {headerInfo: prevState.headerInfo};
    })

  private updateDeliveryDate = (value) => 
    this.setState((prevState, props) => {
      prevState.headerInfo.DaliveryDate = value;
      return {headerInfo: prevState.headerInfo};
    })

  private askCustomerInformation = () => {
    this.setState({showDialog: true });
  }

  private addUniqueFileToPresupuestos = (name: string, file: Blob, repeats: number) => {
    let filename = name + (repeats == 0 ? '' : ` (${repeats})`); 
    this.setState({ saving: true });
    pnp.sp.web.lists.getByTitle('Presupuestos').rootFolder.files.add(filename + '.pdf', file, false)
      .then(item => this.onSaved(item)) 
      .catch(err => this.addUniqueFileToPresupuestos(name, file, repeats + 1));
  }

  private onSaved = (file) => {
    this.setState({ 
      saving: false,
      documentUrl: file.data.ServerRelativeUrl,
      documentSaved: true
    });
  }

  private makePdf = () => {
    let pdf = ConvertToPdf(this.state);
    let file = pdf.output('blob');
    let filename = this.state.headerInfo.Customer || 'Sin nombre';
    this.addUniqueFileToPresupuestos(filename, file, 0);
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

  private componentDidMount = () => 
    pnp.sp.web.lists.getByTitle('Productos').items.top(500).orderBy('Categoria').orderBy('Title').get().then(items => this.loadProducts(items));

}
