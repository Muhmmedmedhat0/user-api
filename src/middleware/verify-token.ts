import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import  { Request, Response, NextFunction } from 'express';

// verify token
function verifyToken(req: Request, res: Response, next: NextFunction) {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const {authorization} = req.headers;
  

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'No token provided.' });
  }

  const token = authorization.split(' ')[1];

  jwt.verify(token, JWT_SECRET as Secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized.' });
    }
    req.body = decoded;
    next();
  });
}


export function verifyUser(req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) {
  // User should be authenticated first
  verifyToken(req, res, () => {
    // Then check if the user is the same as the one in the token
    const user = req.body as JwtPayload;
    if (req.params.id === user.id ) {
      next();
    } else {
      return res.status(403).json({
        message: 'You are not authorized to perform this action!',
      });
    }
  });
}