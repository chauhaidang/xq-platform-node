const request = {
  method: '',
  body: {},
}

const input1 = {
  method: 'POST'
}

const input2 = {
  body: {
    name: 'bonus2024'
  }
}

// What will return?
console.log({ ...input1, ...request, ...input2 });
