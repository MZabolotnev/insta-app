import { Component }                        from '@angular/core';
import { ActivatedRoute, Router }           from '@angular/router';
import { CommonModule, Location }           from '@angular/common';
import { UserService }                      from '../../services/user.service';

@Component({
  selector: 'media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {
  router: any;
  access_token: string;
  user_id: number;
  user_name: string;
  user_media: object;
  private subscription: any;
  constructor( private route: ActivatedRoute,
               private _router: Router,
               private location: Location,
               private userService: UserService
              ) {
    this.router = _router;
    if (this.router.url !== '/login') {
      this.access_token = this.router.url.slice(20);
      localStorage.setItem('currentUser', this.access_token);
      this._router.navigate(['/login']);
    }
    this.userService.getUserInfo().subscribe(
      (response) => {
        if (response.meta.error_message === undefined) {
          this.user_id = response.data.id;
          this.user_name = response.data.full_name;
        } else {
          this._router.navigate(['/']);
          }
        }
    );
    this.userService.getUserMedia().subscribe(
      (response) => {
         this.user_media = response.data;
       }
    );
  }

  logOut() {
    localStorage.clear();
    window.location.href = 'http://instagram.com/accounts/logout/';
  }
}
