import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { User } from 'src/app/core/models/user';
import { UserEditDialog } from './dialogs/user-edit/user-edit.dialog';
import { ConfirmDialog } from 'src/app/shared/dialogs/confirm/confirm.dialog';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {
  isShowPw: boolean = false;
  user: User;
  arrUser: User[];
  role: string;

  constructor(
    private _user: UserService,
    public dialog: MatDialog,
    private router: Router,
    private _auth: AuthService,
    private _jwt: JwtService,
  ) { }

  ngOnInit(): void {
    this._auth.role$.subscribe(res => {
      this.role = res;        
      console.log(this.role)
      if(this.role == "Admin") {
        this.getList();
      } else {
        this.get();
      }
    });
  }

  get() {
    this._user.get().subscribe((res: User) => {
      this.user = res;     
    })
  }

  getList() {
    this._user.getList().subscribe((res: User[]) => {
      this.arrUser = res;     
    })
  }

  onEdit(u?: User) {
    if(this.role == 'Admin') {
      let dialogData = this.dialog.open(UserEditDialog, {
        data: u,
        minWidth: "40%"
      })
      dialogData.afterClosed().subscribe((res: User) => {     
        this.getList();
      })
    } else {
      let dialogData = this.dialog.open(UserEditDialog, {
        data: this.user,
        minWidth: "40%"
      })
      dialogData.afterClosed().subscribe((res: User) => {     
        this.get();
      })
    }    
  }

  onDelete(id?: any) {   
    let dialogData = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete',
        content: 'Do you want delete it?'
      },
      minWidth: '30%'
    });   
    if(this.role == "admin") {            
      dialogData.afterClosed().subscribe(res => {
        if(res) {
          this.dialog.open(SpinnerDialog);
          this._user.delete(id).subscribe(res => {         
            this.dialog.closeAll();
            this._auth.logout().subscribe(res => {
              this._jwt.removeToken();
              this.router.navigateByUrl('/auth/login')
            });
          })
        }
      })
    } else {
      let id = this.user._id;     
      dialogData.afterClosed().subscribe(res => {
        if(res) {
          this.dialog.open(SpinnerDialog);
          this._user.delete(id).subscribe(res => {         
            this.dialog.closeAll();
            this._auth.logout().subscribe(res => {
              this._jwt.removeToken();
              this.router.navigateByUrl('/auth/login')
            });
          })
        }
      })
    }    
  }
}
