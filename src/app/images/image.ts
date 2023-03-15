/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

export interface ImageResponse {
  contentType: string;
  version: string;
  _links: {
    image: {
      href: string;
    }
  };
}

export class Image {
  contentType: string;
  version: string;
  private links: {
    image: {
      href: string;
    }
  };

  constructor(imageResponse: ImageResponse) {
    this.contentType = imageResponse.contentType;
    this.version = imageResponse.version;
    this.links = imageResponse._links;
  }

  get selfLink() {
    return this.links.image.href;
  }
}
