import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
	EditService, ToolbarService, FilterService, ForeignKeyService,
} from '@syncfusion/ej2-angular-grids';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { Ajax } from '@syncfusion/ej2-base';


//Hotfix => https://www.syncfusion.com/forums/146633/odata-v4-guids-are-in-the-wrong-format
export class CustomAdaptor extends ODataV4Adaptor {

	constructor() {
		super();
	}

	beforeSend(dm: DataManager, request: XMLHttpRequest, settings: Ajax) {
		const expression = /guid'([0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12})'/ig;
		if (settings.url.match(expression)) {
			settings.url = settings.url.replace(expression, '$1');
			dm.dataSource.url = dm.dataSource.url.replace(expression, '$1');
			request.open(settings.type, settings.url.replace(expression, '$1'));
		}
	}
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	public dataSource = [];
	public dataSourceMunicipio: DataManager;

	public editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
	public toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
	public pageSettings = { pageCount: 50 };
	public enderecoForm: FormGroup;
	entityName: string;
	dataSourceEdit = {
		params: {
			allowFiltering: true,
			query: new Query(),
			fields: { text: 'Nome', value: 'MunicipioId' },
		},
	};

	constructor() {}

	ngOnInit() {
    this.dataSourceMunicipio = new DataManager({
					url: `https://acm1app.azurewebsites.net/odata/Municipios?$orderby=nome&$select=nome,municipioId,uf&$top=15`,
					adaptor: new CustomAdaptor(),
		});
  }

	actionBegin(args: any): void {
		const gridInstance: any = (document.getElementById('gridEndereco') as any).ej2_instances[0];
		if (args.requestType === 'save') {
			if (gridInstance.pageSettings.currentPage !== 1) {
				args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize)
					- gridInstance.pageSettings.pageSize;
			}
		}
	}

	actionComplete(args: any): void {}

}

