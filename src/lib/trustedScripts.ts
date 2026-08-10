type TrustedScriptUrl = unknown;

type TrustedTypePolicy = {
  createScriptURL: (input: string) => TrustedScriptUrl;
};

declare global {
  interface Window {
    trustedTypes?: {
      createPolicy: (
        name: string,
        rules: { createScriptURL: (input: string) => string },
      ) => TrustedTypePolicy;
    };
  }
}

let scriptPolicy: TrustedTypePolicy | undefined;

function validateScriptUrl(input: string) {
  const url = new URL(input, window.location.href);
  const isGoogleAnalytics =
    url.origin === "https://www.googletagmanager.com" &&
    url.pathname === "/gtag/js" &&
    /^G-[A-Z0-9]+$/.test(url.searchParams.get("id") || "") &&
    !url.hash;

  if (!isGoogleAnalytics) {
    throw new TypeError(`Unapproved script URL: ${url.href}`);
  }

  return url.href;
}

export function trustedScriptUrl(input: string) {
  if (!window.trustedTypes) return validateScriptUrl(input);

  scriptPolicy ??= window.trustedTypes.createPolicy("flagship", {
    createScriptURL: validateScriptUrl,
  });

  return scriptPolicy.createScriptURL(input);
}

export function setTrustedScriptSource(
  script: HTMLScriptElement,
  input: string,
) {
  script.src = trustedScriptUrl(input) as string;
}
