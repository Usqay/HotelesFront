import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Permission } from 'src/app/shared/interfaces/permission';
import { Role } from 'src/app/shared/interfaces/role';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { PermissionsService } from 'src/app/shared/services/permissions.service';
import { permissionsData } from './permissions';

@Component({
  selector: 'app-role-permissions',
  templateUrl: './role-permissions.component.html',
  styleUrls: ['./role-permissions.component.scss']
})
export class RolePermissionsComponent implements OnInit {
  @Input() role : Role

  permissionsData : any[] = []

  storePermissionsSubscription : Subscription = null

  constructor(private alert : AlertService,
    private permissionsService : PermissionsService,
    private errorService : ErrorService) { }

  ngOnInit(): void {
    this.permissionsData = this.buildPermissionData()
  }

  ngOnDestroy(){
    if(this.storePermissionsSubscription != null) this.storePermissionsSubscription.unsubscribe()
  }

  isIndeterminate(item){
    let indeterminate = false

    if(item){
      const totalChildren = item.children.length
      const selectedChildren = item.children.filter(i => i.selected == true).length

      if(selectedChildren < totalChildren && selectedChildren > 0) indeterminate = true
      else indeterminate = false
    }
    return indeterminate
  }

  isChecked(item){
    let checked = false

    if(item){
      const totalChildren = item.children.length
      const selectedChildren = item.children.filter(i => i.selected == true).length

      if(selectedChildren < totalChildren) checked = false
      else checked = true
    }
    return checked
  }

  toggleAll(item, value){
    item.selected = value
    item.indeterminate = false

    item.children = item.children.map(i => {
      return {...i, selected : value}
    })
  }

  toggleChildren(item, subitem, value){
    subitem.selected = value
    item.selected = this.isChecked(item)
    item.indeterminate = this.isIndeterminate(item)
  }

  getSelecteds(){
    const selecteds = this.permissionsData.filter(i => i.selected == true || i.indeterminate == true)
    const permissions : Permission[] = []

    selecteds.forEach(i => {
      i.children.forEach(o => {
        if(o.selected){
          permissions.push({
            name : o.permissionName
          })
        }
      })
    })

    return permissions
  }

  onSubmit(){
    this.alert.loading()
    const permissions = this.getSelecteds()

    const body = {
      role_id : this.role.id,
      permissions : permissions
    }

    this.storePermissionsSubscription = this.permissionsService.create(body)
    .subscribe(data => {
      this.alert.success()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })

  }

  private roleHasPermission(permissionName : string) : boolean {
    const filtereds = this.role.permissions.filter(i => i.name == permissionName)
    return filtereds.length > 0 ? true : false
  }

  private buildPermissionData(){
    return permissionsData.map(i => {
      let newItem = i

      newItem.children = i.children.map(child => {
        return {
          ...child,
          selected : this.roleHasPermission(child.permissionName)
        }
      })

      return {
        ...newItem,
        selected : this.isChecked(newItem),
        indeterminate : this.isIndeterminate(newItem)
      }
    })
  }

}
