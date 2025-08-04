# Bruno CLI Custom Runner `{ 0.0.1 }`

A Node.js utility to run Bruno API collections either sequentially or in parallel.

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
cd xq-bruno-cli
npm install
```

## Usage

### Directory Structure
```
xq-bruno-cli/
├── main.js
├── http-cat-1/
├── http-cat-2/
├── http-cat-3/
├── http-cat-4/
└── package.json
```

### Running Collections

#### Sequential Execution
```bash
node main.js
```

#### Parallel Execution
```bash
RUN_MODE=parallel node main.js
```

### Environment Variables

- `RUN_MODE`: Set to `"parallel"` for parallel execution. Defaults to sequential if not set.

### Configuration

Collections are defined in `main.js`:

```javascript
const collections = [
  {
    name: "http-cat-1",
    path: path.join(__dirname, "http-cat-1"),
  },
  // Add more collections here
];
```

### Output

The script provides detailed execution information:
```
Starting collection: http-cat-1
Collection http-cat-1 executed successfully
Starting collection: http-cat-2
Collection http-cat-2 executed successfully
...
Total execution time: 3.45 seconds
```

### Error Handling

- Failed collections are logged with error codes
- Process errors are captured and reported
- Detailed execution results are provided for both successful and failed runs

## Requirements

- Node.js >= 14
- Bruno CLI installed globally or locally
- Collection directories must contain valid Bruno API collections

## License

MIT License

Copyright (c) 2024 XQ Platform

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.