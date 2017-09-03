import { Injectable }             from '@angular/core';
import { Http,
         Response,
         Headers,
         URLSearchParams,
         RequestOptions }                             from '@angular/http';
import { Observable }             from 'rxjs';
import { environment }            from './../../environments/environment'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Jsonp} from '@angular/http';

@Injectable()

export class UserService {
  user_id: any;
  public access_token: string;
  public client_id: 'd3982209df61491d86aefb88e7b45427';
  constructor ( private http: Http, private jsonp: Jsonp ) {

  }
  getUserInfo () {
    let url = 'https://api.instagram.com/v1/users/self/?access_token=' + localStorage.getItem('currentUser') + '&callback=JSONP_CALLBACK';
    console.log(url)
    return this.jsonp.request(url, { method: 'Get' })
                      .map(this.extractData)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  getUserMedia () {
    let url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + localStorage.getItem('currentUser') + '&callback=JSONP_CALLBACK';
    console.log(url)
    return this.jsonp.request(url, { method: 'Get' })
                      .map(this.extractData)
  }
  getMediaById (media_id) {
    let url = 'https://api.instagram.com/v1/media/' + media_id + '?access_token=' + localStorage.getItem('currentUser') + '&callback=JSONP_CALLBACK';
    console.log(url)
    return this.jsonp.request(url, { method: 'Get' })
                      .map(this.extractData)
  }
}
