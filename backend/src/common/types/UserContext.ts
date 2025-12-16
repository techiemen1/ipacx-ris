// common/types/UserContext.ts
export interface UserContext {
  userId: string;
  roles: string[];       // ['RADIOLOGIST', 'ADMIN']
  permissions?: string[];
}
