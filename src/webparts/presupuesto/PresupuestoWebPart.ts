import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'presupuestoStrings';
import Presupuesto from './components/Presupuesto';
import { IPresupuestoProps } from './components/IPresupuestoProps';
import { IPresupuestoWebPartProps } from './IPresupuestoWebPartProps';

export default class PresupuestoWebPart extends BaseClientSideWebPart<IPresupuestoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPresupuestoProps > = React.createElement(
      Presupuesto,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
