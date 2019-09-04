import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
  toolbar1: any;
  public planosDataSouce = [];

  public ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    this.toolbar1 = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  }

  actionBegin(args: any): void {
    const gridInstance: any = (document.getElementById('gridPlanos') as any).ej2_instances[0];
    if (args.requestType === 'save') {
      if (gridInstance.pageSettings.currentPage !== 1) {
        args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize)
          - gridInstance.pageSettings.pageSize;
      }
    }
  }
}
