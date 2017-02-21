import fieldTypes from "./fieldTypes.es6";

export default function(dst, srcProp, names) {
  for (let method of names) {
    dst[method] = srcProp[method].bind(srcProp);
  }
}
