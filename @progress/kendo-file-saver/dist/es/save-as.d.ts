/**
 * An interface defining the configuration options for the `saveAs` function.
 */
export interface SaveOptions {
  /**
   * If set to `true`, the content is forwarded to `proxyURL` even if the browser supports file saving locally.
   * The default value is `false`.
   */
  forceProxy?: boolean;

  /**
   * The URL of the server side proxy which streams the file to the end user.
   * When the browser is not capable of saving files locally, a proxy is used.
   * Such browsers are Internet Explorer version 9 and earlier, and Safari.
   * It is the developer who is responsible for the implementation of the server-side proxy.
   *
   * The proxy receives a `POST` request with the following parameters in the request body:
   * * `contentType`&mdash;The MIME type of the file.
   * * `base64`&mdash;The base-64 encoded file content.
   * * `fileName`&mdashh;The file name as requested by the caller.
   * * Additional fields set through the optional `proxyData`.
   *
   * The proxy returns the decoded file with a set `"Content-Disposition"` header.
   */
  proxyURL?: string;

  /**
   * A name or keyword indicating where to display the document returned by the proxy. The default value is `_self`.
   * To display the document in a new window or iframe, the proxy has to set the `"Content-Disposition"` header to `inline; filename="<fileName.ext>"`.
   */
  proxyTarget?: string;

  /**
   * A key/value dictionary of form values to send to the proxy.
   * Can be used to submit Anti-Forgery tokens and other metadata.
   */
  proxyData?: { [key: string]: string };
}

/**
 * Prompts the user to save the base-64 encoded data as a file with the specified name.
 *
 * @param {string} data &mdash; The file contents encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs). Only base64-encoded Data URIs are supported.
 * @param {string} fileName &mdash; The desired file name.
 * @param {SaveOptions} options &mdash; An optional proxy configuration to use during the file-saving operation.
 *
 */
export function saveAs(data: string, fileName: string, options?: SaveOptions): void;

