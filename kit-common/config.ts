import { readFileSync } from 'fs'
import path = require('path')

let configPath: Buffer | Error = null

function loadConfig(): Buffer | Error {
	try {
		return readFileSync(path.resolve(process.cwd().toString(), 'xq.json'))
	} catch (error) {
		throw new Error('xq.json file does not exist!')
	}
}

function getConfig(): Object {
	if (!configPath) {
		configPath = loadConfig()
	}
	return JSON.parse(configPath.toString())
}

export { getConfig }
