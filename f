run = "npm run dev"

# Ukryte pliki/foldery w eksploratorze
hidden = [".config", ".git", "node_modules", "dist", "generated-icon.png"]

[env]
PORT = "5000"

[[ports]]
localPort = 5000
externalPort = 5000

[[ports]]
localPort = 40499
externalPort = 3000

[nix]
channel = "stable-24_05"

[deployment]
deploymentTarget = "autoscale"
build = ["npm", "run", "build"]
run = ["npm", "run", "start"]

[workflows]
runButton = "Project"

[[workflows.workflow]]
name = "Project"
mode = "parallel"
author = "agent"

[[workflows.workflow.tasks]]
task = "workflow.run"
args = "Start application"

[[workflows.workflow]]
name = "Start application"
author = "agent"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "npm run dev"
waitForPort = 5000

[agent]
integrations = ["javascript_mem_db:1.0.0"]
