import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";

export function Roles(...roles: string[]) {
  return (target: any, key?: any, descriptor?: any) => {
    Reflect.defineMetadata("roles", roles, descriptor.value);
  };
}

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const roles = Reflect.getMetadata("roles", handler);

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!roles.includes(user.role)) {
      throw new ForbiddenException("Insufficient permissions");
    }

    return true;
  }
}
