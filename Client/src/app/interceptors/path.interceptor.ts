import { HttpInterceptorFn } from '@angular/common/http';

const apiBasePath = 'https://localhost:5001';

export const pathInterceptor: HttpInterceptorFn = (req, next) => {
  //trim extra slash(/)
  const subPath = req.url.startsWith('/') ? req.url.slice(1) : req.url;

  const nextReq = req.clone({
    url: `${apiBasePath}/${subPath}`,
  });

  return next(nextReq);
};
