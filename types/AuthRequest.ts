import { Request } from 'express';
import Member from '@models/member';

export default interface AuthRequest extends Request {
  member: Member;
}