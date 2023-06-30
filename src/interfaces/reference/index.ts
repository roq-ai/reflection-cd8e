import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReferenceInterface {
  id?: string;
  site_url: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ReferenceGetQueryInterface extends GetQueryInterface {
  id?: string;
  site_url?: string;
  user_id?: string;
}
