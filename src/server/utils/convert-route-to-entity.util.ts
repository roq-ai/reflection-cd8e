const mapping: Record<string, string> = {
  notes: 'note',
  organizations: 'organization',
  references: 'reference',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
