import { joinURL } from 'ufo';
import { proxyRequest } from 'h3';
import type { H3Event, ProxyOptions } from 'h3';

export async function apiProxy(
  event: H3Event,
  proxyUrl: string,
  path: RegExp,
  options?: ProxyOptions
) {
  const target = joinURL(proxyUrl, event.path.replace(path, ''));
  return proxyRequest(event, target, options);
}