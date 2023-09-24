// import {
//   Injectable,
//   NestMiddleware,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   constructor(private jwtService: JwtService) {}
//   use(req: Request, res: Response, next: NextFunction) {
//     const token = req.cookies.token;
//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: process.env.SECRET,
//       });
//       // 💡 We're assigning the payload to the request object here
//       // so that we can access it in our route handlers
//       req['user'] = payload;
//     } catch {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }
// }
