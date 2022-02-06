function zero(obj) {
  if (obj) {
    return obj.action.bind(0)(obj.num);
  }
  return 0;
}
function one(obj) {
  if (obj) {
    return obj.action.bind(0)(obj.num);
  }
  return 1;
}
function two(obj) {
  if (obj) {
    return obj.action.bind(2)(obj.num);
  }
  return 2;
}
function three(obj) {
  if (obj) {
    return obj.action.bind(3)(obj.num);
  }
  return 3;
}
function four(obj) {
  if (obj) {
    return obj.action.bind(4)(obj.num);
  }
  return 4;
}
function five(obj) {
  if (obj) {
    return obj.action.bind(5)(obj.num);
  }
  return 5;
}
function six(obj) {
  if (obj) {
    return obj.action.bind(6)(obj.num);
  }
  return 6;
}
function seven(obj) {
  if (obj) {
    return obj.action.call(7, obj.num);
  }
  return 7;
}
function eight(obj) {
  if (obj) {
    return obj.action.bind(8)(obj.num);
  }
  return 8;
}
function nine(obj) {
  if (obj) {
    return obj.action.bind(9)(obj.num);
  }
  return 9;
}

function plus(num) {
  return {
    num,
    action: () => this + num,
  };
}
function minus(num) {
  return {
    num,
    action: () => this - num,
  };
}
function times(num) {
  return {
    num,
    action: () => this * num,
  };
}
function dividedBy(num) {
  return {
    num,
    action: () => this / num,
  };
}

let val = seven(times(five()));
console.log(val);
