import { execSync } from "child_process"

const npx = "npx"
const tsx = "tsx"
const scripts = "scripts"
const run_migration_v2 = "run_migration_v2.ts"

const command = `${npx} ${tsx} ${scripts}/${run_migration_v2}`
execSync(command)
