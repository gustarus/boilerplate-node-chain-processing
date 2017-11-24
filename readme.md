## Node chain processor
Make four steps to get your own chain processor:
1. Clone this project or download zip archive.
2. Step into project and run `yarn install` to install dependencies.
3. Modify exist steps or add your own to the folder `./chain`.
4. Run `yarn start -- --param1=value --param2=value` to execute your own chain.


## Description
### What is it?
It's a boilerplate which you can use to make chains for your pet projects or, for example, parsers. 
Just add your own steps to the folder `./chain` (they will be included automatically in `./index.js`).
If you need, you can use helpers from the folder `./helpers`.
Also you can get console params from `./process.js` module.

### The result of execution of an example
Take a look at the example in the folder [/chain](/chain).
There are already defined two chain steps: `0.js` and `1.js`.
This steps will be executed as same order as they are in folder: `start` => `0.js` => `1.js` => `done`.

```bash
> nvm use
Found '/.../boilerplate-node-chain/.nvmrc' with version <7.5.0>
Now using node v7.5.0 (npm v4.1.2)

> yarn install
yarn install v0.27.5
[1/4] Resolving packages...
    ...
[2/4] Fetching packages...
    ...
[3/4] Linking dependencies...
    ...
[4/4] Building fresh packages...
    ...
success Saved lockfile.


> yarn start -- --query=sport
Dumping all books by a query.
  All books by query sport already dumped.
  The dump is loaded, all is ok!

Extracting ids for all books.
  All ids extracted!

The task was successful.

Execution result.
TFS7BVUoaHAC, 8U4WB-sU_nkC, Z_4m0FbGbxcC, ...
```

## Using
### Using chain parts
```./chain/0.js js
module.exports = {
  messageBefore: 'This message will be shown before execution of this step.',
  messageAfter: 'This message will be shown after execution of this step.',
  handler(previousChainPartResult) {
    const willBePassedToTheNextChainPart = previousChainPartResult + 1;
    return willBePassedToTheNextChainPart;
  }
};

```

### Using console params
In the chain part:
```./chain/0.js js
const {params} = require('./../process');
console.log(params.param1);
```

Then in console:
```bash
yarn start -- --param1=value1
```

### Using components
```./config.js js
const Component = require('./../components/component');
module.exports = {
  components: {
    component: {
      constructor: Component
    },
  }
};
```
    
```./chain/0.js js
const {component} = require('./../process');
component.method();
```

### Using directories
```./config.js js
const Component = require('./../components/component');
module.exports = {
  paths: {
    pathToRuntimeFile: '@runtime/data.json',
    pathToRootFile: '@root/package.json',
  }
};
```
    
```./chain/0.js js
const {pathToRuntimeFile, pathToRootFile} = require('./../process');
console.log(pathToRuntimeFile); // __dirname + '/runtime/data.json' 
console.log(pathToRootFile); // __dirname + '/package.json'
```

### Using helpers
There are following helpers exists in the folder `./helpers`:

#### getDownloadPromise
```./chain/0.js
const {getDownloadPromise} = require('./../helpers');

module.exports = {
  handler() {
    const url = 'http://eskipaper.com/images250_/teal-1.jpg';
    const target = __dirname + '/../runtime/picture.jpg';
    return getDownloadPromise(url, pathToPicture);
  }
};
```

#### getUploadPromise
```./chain/0.js
const {getReadFilePromise} = require('./../helpers');

module.exports = {
  handler() {
    const source = __dirname + '/../runtime/data.json';
    return getReadJsonFilePromise(source, true).then(content => {
        console.log(content);
    });
  }
};
```

#### getWriteFilePromise
```./chain/0.js
const {getWriteFilePromise} = require('./../helpers');

module.exports = {
  handler() {
    const content = 'Hello world!';
    const target = __dirname + '/../runtime/text.txt';
    return getWriteFilePromise(target, content);
  }
};
```

#### getReadFilePromise
```./chain/0.js
const {getReadFilePromise} = require('./../helpers');

module.exports = {
  handler() {
    const source = __dirname + '/../runtime/text.txt';
    return getReadFilePromise(source, true).then(content => {
        console.log(content);
    });
  }
};
```

#### getWriteJsonFilePromise
```./chain/0.js
const {getWriteJsonFilePromise} = require('./../helpers');

module.exports = {
  handler() {
    const content = {message: 'Hello world!'};
    const target = __dirname + '/../runtime/data.json';
    return getWriteJsonFilePromise(target, content);
  }
};
```

#### getReadJsonFilePromise
```./chain/0.js
const {getReadJsonFilePromise} = require('./../helpers');

module.exports = {
  handler() {
    const source = __dirname + '/../runtime/data.json';
    return getReadJsonFilePromise(source, true).then(content => {
        console.log(content);
    });
  }
};
```
