/*
John keeps a backup of his old personal phone book as a text file.
 On each line of the file he can find the phone number (formated as +X-abc-def-ghij where X stands for one or two digits),
  the corresponding name between < and > and the address.

Unfortunately everything is mixed,
 things are not always in the same order; parts of lines are cluttered with non-alpha-numeric characters (except inside phone number and name).

Examples of John's phone book lines:

"/+1-541-754-3010 156 Alphand_St. <J Steeve>\n"

" 133, Green, Rd. <E Kustur> NY-56423 ;+1-541-914-3010!\n"
"<Anastasia> +48-421-674-8974 Via Quirinal Roma\n"

Could you help John with a program that,
 given the lines of his phone book and a phone number num returns a string for this number : "Phone => num, Name => name, Address => adress"

*/

export class G964 {
  public static phone(content: string, num: string): string {
    let lines = content.split(/\n/g);
    lines = lines.filter((s) => s.indexOf(num) !== -1);

    if (lines.length == 0) {
      return `Error => Not found: ${num}`;
    } else if (lines.length > 1) {
      return `Error => Too many people: ${num}`;
    } else {
      return parseStr(lines[0], num);
    }
  }
}

function parseStr(content: string, num: string): string {
  content = content.replace('+' + num, '');

  //get name
  const nameBeginIndex = content.indexOf('<');
  const nameEndIndex = content.indexOf('>');
  const name = content.substring(nameBeginIndex + 1, nameEndIndex);

  //get address
  content = content.replace('<' + name + '>', '');
  const addrList = content.replace(/[^a-zA-Z0-9-\s._]*/g, '').split(/\s|_/g);
  const address = addrList.filter((s) => !!s).join(' ');

  return `Phone => ${num}, Name => ${name}, Address => ${address}`;
}
