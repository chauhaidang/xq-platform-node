const path = require("path");
const { spawn } = require("child_process");

// Define your arguments and paths
const cliPath = path.join(__dirname, "node_modules", ".bin", "bru");

// Define multiple collection paths
const collections = [
  {
    name: "http-cat-1",
    path: path.join(__dirname, "http-cat-1"),
  },
  {
    name: "http-cat-2",
    path: path.join(__dirname, "http-cat-2"),
  },
  {
    name: "http-cat-3",
    path: path.join(__dirname, "http-cat-3"),
  },
  {
    name: "http-cat-4",
    path: path.join(__dirname, "http-cat-4"), 
  },
];

// Function to spawn a single process
function spawnBruProcess(collection) {
  const args = ["run", "."];

  console.log(`Starting collection: ${collection.name}`);

  const bruProcess = spawn(cliPath, args, {
    stdio: "inherit",
    shell: true,
    cwd: collection.path,
  });

  bruProcess.on("close", (code) => {
    if (code === 0) {
      console.log(`Collection ${collection.name} executed successfully`);
    } else {
      console.error(`Collection ${collection.name} failed with code:`, code);
    }
  });

  bruProcess.on("error", (error) => {
    console.error(`Failed to start collection ${collection.name}:`, error);
  });

  return bruProcess;
}

async function runSequential() {
  const startTime = Date.now();
  const results = [];

  for (const collection of collections) {
    const proc = spawnBruProcess(collection);
    const exitCode = await new Promise((resolve) => proc.on("close", resolve));
    results.push({ collection, exitCode });
  }

  const elapsedTime = (Date.now() - startTime) / 1000;
  console.log(`Total execution time: ${elapsedTime.toFixed(2)} seconds`);
  return results;
}

async function runParallel() {
  const startTime = Date.now();

  const promises = collections.map(async (collection) => {
    const proc = spawnBruProcess(collection);
    const exitCode = await new Promise((resolve) => proc.on("close", resolve));
    return { collection, exitCode };
  });

  const results = await Promise.allSettled(promises);
  const elapsedTime = (Date.now() - startTime) / 1000;

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      const { collection, exitCode } = result.value;
      console.log(
        `${collection.name}: ${exitCode === 0 ? "Success" : "Failed"}`
      );
    }
  });

  console.log(`Total execution time: ${elapsedTime.toFixed(2)} seconds`);
  return results;
}

if (process.env.RUN_MODE === "parallel") {
  runParallel()
    .then((results) => {
    })
    .catch((err) => {
      console.error("Error during parallel run:", err);
    });
} else {
  runSequential()
    .then((results) => {
    })
    .catch((err) => {
      console.error("Error during sequential run:", err);
    });
}
