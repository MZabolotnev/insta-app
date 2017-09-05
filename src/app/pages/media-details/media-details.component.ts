import { Component, Output }                  from '@angular/core';
import { ActivatedRoute, Router }             from '@angular/router';
import { CommonModule, Location }             from '@angular/common';
import { UserService }                        from '../../services/user.service';
import { NgTemplateOutlet } from '@angular/common'

@Component({
  selector: 'media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.scss']
})
export class MediaDetailsComponent {
  @Output()
  media_id: number;
  media_id_next: number;
  media_id_prev: number;
  media_details: object;
  image: string;
  video: string;
  carousel_arr: Array<string>;
  carousel_img: string;
  caption: string;
  media_arr: Array<number>;

  private subscription: any;

  constructor(
      private route: ActivatedRoute,
      private _router: Router,
      private location: Location,
      private userService: UserService,
    ) {
    this.subscription = this.route.params.subscribe(
      ( params: any ) => {
        this.media_id = params['id'];
        if (localStorage.getItem('currentUser') === null) {
          this._router.navigate(['/']);
        } else {
          this.userService.getUserMedia().subscribe(
            (response) => {
              this.media_arr = response.data.map((num) => {
                return num.id;
              });
              if (this.media_id !== this.media_arr[this.media_arr.length - 1] && this.media_id !== this.media_arr[0]) {
                this.media_id_next = this.media_arr[this.media_arr.indexOf( this.media_id ) + 1];
                this.media_id_prev = this.media_arr[this.media_arr.indexOf( this.media_id ) - 1];
              } else if (this.media_id === this.media_arr[this.media_arr.length - 1]) {
                this.media_id_next = this.media_arr[0];
                this.media_id_prev = this.media_arr[this.media_arr.indexOf( this.media_id ) - 1];
              } else if (this.media_id === this.media_arr[0]) {
                this.media_id_next = this.media_arr[1];
                this.media_id_prev = this.media_arr[this.media_arr.length - 1];
              }
             },
            (err) => {},
          );

          this.userService.getMediaById(this.media_id).subscribe(
            (response) => {
               this.media_details = response.data;
               if (response.data.type === 'video') {
                 this.video = response.data.videos.standard_resolution.url;
               } else if (response.data.type === 'image') {
                 if (window.screen.width > 640) {
                   this.image = response.data.images.standard_resolution.url;
                 } else {
                   this.image = response.data.images.low_resolution.url;
                 }
               } else if (response.data.type === 'carousel') {
                 if (window.screen.width > 640) {
                   this.carousel_arr = response.data.carousel_media.map(res => {
                     return res.images.standard_resolution.url;
                   });
                 } else {
                   this.carousel_arr = response.data.carousel_media.map(res => {
                     return res.images.low_resolution.url;
                   });
                 }
                 this.carousel_img = this.carousel_arr[0];
               };
               this.caption = response.data.caption.text.substring(0, response.data.caption.text.indexOf('#'));
             },
          );
        }
      },
    );
  }

  next() {
    this.carousel_img = this.carousel_arr[this.carousel_arr.indexOf(this.carousel_img) + 1];
  }

  prev() {
    this.carousel_img = this.carousel_arr[this.carousel_arr.indexOf(this.carousel_img) - 1];
  }

  logOut() {
    localStorage.clear();
    window.location.href = 'http://instagram.com/accounts/logout/';
  }
}
