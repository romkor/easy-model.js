import fieldTypes from "./fieldTypes.es6";

export default function({name, type, holder, context}) {
  type = type || "string";
  // Add default value
  context[holder][name] = fieldTypes[type].default;
  Object.defineProperty(context, name, {
    get() {
      return context[holder][name];
    },
    set(value) {
      context[holder][name] = value;
    }
  });
}
