export function getInitialName(fullname: string) {
  if (fullname !== "") {
    const name = fullname?.split(" ");
    const goodName = [];
    for (const iterator of name) {
      if (iterator !== "") {
        goodName.push(iterator);
      }
    }

    return `${goodName[0]?.split("")[0]}${goodName[1]?.split("")[0]}`;
  }
  return "MM";
}
