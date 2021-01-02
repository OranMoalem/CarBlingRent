import { store } from './../redux/store';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

export class JwtInterceptorService implements HttpInterceptor {

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + store.getState().user?.jwtToken
            }
        });

        return next.handle(request);
    }
}