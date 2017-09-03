import { Component, Output }        from '@angular/core';
import { ActivatedRoute, Router }           from '@angular/router';
import { CommonModule, Location }             from '@angular/common';
import { UserService }              from '../../services/user.service';

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
  caption: string;
  tags: Array<string>;
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
        console.log('IDROUTE=', this.media_id)
        this.userService.getUserMedia().subscribe(
          (response) => {
            this.media_arr =  response.data.map((num) => {
              return num.id;
            });
            console.log('массив айдишников', this.media_arr)
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
             console.log('media_details:=', this.media_details);
             //extract tags and signature from the description string
             let tags_string = response.data.caption.text.substring(response.data.caption.text.indexOf( "#" ));
             let space = / /gi;
             this.tags = tags_string.replace(space, "").split("#").slice(1);
             this.caption = response.data.caption.text.substring(0, response.data.caption.text.indexOf( "#" ));
             console.log('tags:', this.tags)
             console.log('caption:', this.caption)
           },
          (err) => {},
          () => console.error('good!')
        );
      },
    );
  }
}
