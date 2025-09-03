export function setStoryLineVariable(key: string, value: any) { 
  window.parent.postMessage(
    {
      type: "SET_VARIABLE",
      variableName: key,
      value: value,
    },
    "*"
  );

  console.log(`Variable ${key} set to`, value);
}
