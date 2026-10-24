const configuredBasePath = import.meta.env.BASE_URL || "/";

export const siteHomePath = configuredBasePath.endsWith("/")
  ? configuredBasePath
  : `${configuredBasePath}/`;
export const siteNotFoundPath = `${siteHomePath}404`;
