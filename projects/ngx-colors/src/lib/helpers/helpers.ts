import { ColorFormats } from "../enums/formats";

export function isDescendantOrSame(nodeParent: any, nodeTarget: any): boolean {
  return (
    nodeParent == nodeTarget ||
    Array.from(nodeParent.childNodes).some((c) =>
      isDescendantOrSame(c, nodeTarget)
    )
  );
}
export function getFormat(format: string): ColorFormats {
  var result: ColorFormats;
  switch (format) {
    case "cmyk":
      result = ColorFormats.CMYK;
      break;
    case "rgba":
      result = ColorFormats.RGBA;
      break;
    case "hsla":
      result = ColorFormats.HSLA;
      break;
    case "hex":
      result = ColorFormats.HEX;
      break;
  }
  return result;
}

export function rgbaToHex(rgba: string) {
  const values = rgba.split(/,|\(|\)/);
  const r = +values[1],
    g = +values[2],
    b = +values[3];

  const a = values[4] === "" ? 1 : +values[4];
  let outParts = [
    r.toString(16),
    g.toString(16),
    b.toString(16),
    Math.round(a * 255)
      .toString(16)
      .substring(0, 2),
  ];

  outParts.forEach(function (part, i) {
    if (part.length === 1) {
      outParts[i] = "0" + part;
    }
  });

  return "#" + outParts.join("");
}
