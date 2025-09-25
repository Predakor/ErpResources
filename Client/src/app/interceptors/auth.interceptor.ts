import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const apiBasePath = 'https://localhost:32777';
  const subPath = req.url.startsWith('/') ? req.url.slice(1) : req.url;
  const nextReq = req.clone({ withCredentials: true, url: `${apiBasePath}/${subPath}` });
  return next(nextReq);
}
