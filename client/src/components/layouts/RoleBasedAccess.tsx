import React from 'react';

interface RoleBasedAccessProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  userRole: UserRole;
}

const RoleBasedAccess = ({
  children,
  allowedRoles,
  userRole
}: RoleBasedAccessProps) => {
  if (allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }
  return null;
};

export default RoleBasedAccess;
