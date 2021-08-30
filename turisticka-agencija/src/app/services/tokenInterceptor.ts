import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
            const userJson = localStorage.getItem('token')
            const adminJson= localStorage.getItem('admin')
            if(localStorage.getItem("token")){
            const authHeader=req.clone({
            headers: req.headers.set("X-AUTH-HEADER", userJson)
        })
           req = authHeader;
    }
    else if (localStorage.getItem('admin')) {
        const authHeader=req.clone({
            headers: req.headers.set("X-AUTH-HEADER", adminJson)
        })
           req = authHeader;

    }
    return next.handle(req);

}
}