import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { Hash } from "@aws-sdk/hash-node";
import { formatUrl } from "@aws-sdk/util-format-url";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { parseUrl } from "@aws-sdk/url-parser";
import { accessKeyId, secretAccessKey } from "../../../constants";

export const Article = {
  image: async (article: any) => {
    const securedUrl = article.image;

    const parsedUrl = parseUrl(securedUrl);
    const s3SecuredURL = async (url: string): Promise<string> => {
      if (!url) {
        return "";
      }
      const presigner = new S3RequestPresigner({
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
        },
        region: "us-east-2",
        sha256: Hash.bind(null, "sha256"),
      });
      return (
        formatUrl(await presigner.presign(new HttpRequest(parsedUrl))) || ""
      );
    };

    const publicUrl = await s3SecuredURL(securedUrl);

    return publicUrl;
  },
};
