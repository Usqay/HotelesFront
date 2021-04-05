import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { permissionsData } from 'src/app/components/roles-components/role-permissions/permissions';
import { Permission } from 'src/app/shared/interfaces/permission';
import { User } from 'src/app/shared/interfaces/user';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { PermissionsService } from 'src/app/shared/services/permissions.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss']
})
export class UserPermissionsComponent implements OnInit {

  userId: string
  user: User

  permissionsData : any[] = []

  storePermissionsSubscription : Subscription = null
  paramsSubscription: Subscription = null
  showUserSubscription: Subscription = null

  constructor(private alert : AlertService,
    private route : ActivatedRoute,
    private router : Router,
    private permissionsService : PermissionsService,
    private errorService : ErrorService,
    private usersService : UsersService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.userId = params.id
        this.showUser()
      })
  }

  ngOnDestroy() {
    if (this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if (this.showUserSubscription != null) this.showUserSubscription.unsubscribe()
  }

  showUser() {
    this.alert.loading()
    this.showUserSubscription = this.usersService.show(this.userId)
      .subscribe(data => {
        this.user = data
        this.alert.hide()
        this.permissionsData = this.buildPermissionData()
      }, error => {
        this.alert.error()
        this.router.navigate(['/users'])
      })
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

  private roleHasPermission(permissionName : string) : boolean {
    const filtereds = this.user.permissions.filter(i => i.name == permissionName)
    return filtereds.length > 0 ? true : false
  }

  private buildPermissionData(){
    let itemsToExclude = ['Monedas', 'Estados de habitación', 'Configuraciones del sistema'];
    if(this.user.role.name != 'Usqay Staff'){
      return permissionsData
      .filter(i => !itemsToExclude.includes(i.title))
      .map(i => {
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
    }else{
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

  onSubmit(){
    this.alert.loading()
    const permissions = this.getSelecteds()

    const body = {
      user_id : this.user.id,
      permissions : permissions
    }

    this.storePermissionsSubscription = this.permissionsService.create(body)
    .subscribe(data => {
      this.alert.success()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })

  }
}
