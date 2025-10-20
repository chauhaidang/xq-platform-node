## xq-bruno-cli
A custom Node.js wrapper for running Bruno API test collections either sequentially or in parallel
- `main.js`: Entry point that spawns Bruno CLI processes for each test collection
- `http-cat-1/`, `http-cat-2/`, `http-cat-3/`, `http-cat-4/`: Bruno API test collection directories
- Each collection contains `.bru` files (Bruno test definitions) and a `bruno.json` configuration

## Commands

### Setup
```bash
# Install dependencies for the Bruno CLI wrapper
cd xq-bruno-cli
npm install
```

### Running Bruno API Tests

**Sequential execution (default):**
```bash
cd xq-bruno-cli
node main.js
```

**Parallel execution:**
```bash
cd xq-bruno-cli
RUN_MODE=parallel node main.js
```

## Architecture

### Bruno CLI Custom Runner

The `xq-bruno-cli/main.js` implements a custom runner that:

1. **Collection Management**: Defines multiple Bruno test collections with their paths
2. **Execution Modes**:
    - **Sequential**: Runs collections one after another using `runSequential()`
    - **Parallel**: Runs all collections simultaneously using `runParallel()`
3. **Process Spawning**: Uses Node.js `child_process.spawn()` to execute the Bruno CLI (`bru run .`) for each collection
4. **Result Tracking**: Monitors exit codes and execution time for each collection
5. **Environment-based Control**: Switches between modes via `RUN_MODE` environment variable

### Bruno Test Collections

Each collection directory (`http-cat-*`) contains:
- `bruno.json`: Collection metadata (name, version, type)
- `.bru` files: Individual API test definitions with:
    - Metadata (name, type, sequence)
    - HTTP request configuration (method, URL, body, auth)
    - Test assertions using a Mocha-like syntax
    - Settings (URL encoding, etc.)

## Development Notes

- The project uses **yarn** as the package manager (per README)
- Node.js version requirement: >= 14
- Bruno CLI is installed as a dependency (`@usebruno/cli`)
- The wrapper provides detailed logging of collection execution status and timing
- Each Bruno collection runs independently with its own test assertions