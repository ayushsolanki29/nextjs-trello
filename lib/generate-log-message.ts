import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityType, entityTitle } = log;
  switch (action) {
    case ACTION.CREATE:
      return `Created ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `updated ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `deleted ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
    default:
      return `Unknown action ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
  }
};
