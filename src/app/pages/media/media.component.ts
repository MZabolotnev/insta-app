import { Component }        from '@angular/core';
import { ActivatedRoute, Router }           from '@angular/router';
import { CommonModule, Location }             from '@angular/common';
import { UserService }              from '../../services/user.service';

@Component({
  selector: 'media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {
  router: any;
  access_token: string;
  user_id: number;
  user_media: object;
  private subscription: any;
  constructor( private route: ActivatedRoute,
               private _router: Router,
               private location: Location,
               private userService: UserService
              ) {
    this.router = _router;
    if (this.router.url !== '/login') {
      console.log(this.router.url);
      this.access_token = this.router.url.slice(20);
      console.log('TOKEN:=', this.access_token);
      localStorage.setItem('currentUser', this.access_token);
      this._router.navigate(['/login']);
    }
    this.userService.getUserInfo().subscribe(
      (response) => {
         console.log('USER DATA', response);
         this.user_id = response.data.id
         console.log('userID', response.data.id );
       },
      (err) => {},
      () => console.error('good!')
    );
    this.userService.getUserMedia().subscribe(
      (response) => {
         console.log('MEDIA', response);
         this.user_media = response.data;
       },
      (err) => {},
      () => console.error('good!')
    );
  }

  goBack() {
    this.location.back();
  }
  tooltip(img) {
    console.log(img);
  }
}
