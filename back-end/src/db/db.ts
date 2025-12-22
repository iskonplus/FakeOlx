import { PublicUser, User } from 'src/user/user.entity';

const users: User[] = [];

export const getUsers = (): User[] => users;

export const getPublicUser = (user: User): PublicUser => {
  const publicUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    version: user.version,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return publicUser;
};
