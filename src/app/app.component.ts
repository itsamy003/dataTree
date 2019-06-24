import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public treeData = [
    { name: 'b1', checked: true },
    { name: 'b2', checked: true },
    { name: 'b3', checked: false },
    {
      name: 'b4', checked: false,
      children: [
        { name: 'b41', checked: true },
        { name: 'b42', checked: true },
        {
          name: 'b43', checked: false,
          children: [
            { name: 'b431', checked: false },
            { name: 'b432', checked: true },
          ]
        },
        { name: 'b44', checked: false }
      ],

    },
    { name: 'b5', checked: false }
  ]
}

//branch component
@Component({
  selector: 'tree-component',
  templateUrl: './tree.component.html',
  styleUrls: ['./app.component.css']
})
export class TreeComponent {
  @Input('branches') nodes;
  @Input() parent;
  @Output() onAllNodesSelect = new EventEmitter();

  changeAllChildNodes(nodeChildren, isChecked) {
       nodeChildren && nodeChildren.forEach((node) => {
         console.log(isChecked);
          node.checked = isChecked;
          if(node.children){
            this.changeAllChildNodes(node.children, isChecked);
          }
        });
  }
  onNodeChange(node, nodeChildren) {
    //check or uncheck all node children
    debugger;

    if(nodeChildren){
     this.changeAllChildNodes(nodeChildren, node);
    } 
    let isEveryNodeChecked = this.nodes && this.nodes.every((node) => node.checked);
    if (this.parent) {
      if (isEveryNodeChecked) {
        this.parent.checked = true;
        this.onAllNodesSelect.emit(isEveryNodeChecked);
      }
      else {
        this.parent.checked = false;
        this.onAllNodesSelect.emit(isEveryNodeChecked);
      }
    }
  }

  selectNodeParent($event) {
    let isEveryNodeChecked = this.nodes && this.nodes.every((node) => node.checked);
    console.log(this.nodes, 'bb..');
    if (this.parent) {
      if (isEveryNodeChecked) {
        this.parent.checked = event;
        this.onAllNodesSelect.emit(isEveryNodeChecked);
      }
      else {
        this.parent.checked = false;
        this.onAllNodesSelect.emit(isEveryNodeChecked);
      }
    }
  }
}
