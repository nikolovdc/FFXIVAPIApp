const { exec, execSync } = require('child_process');
require('dotenv').config(); 


function isProxyRunningLinux() {
    try {
		const output = execSync('pgrep -f "cloud-sql-proxy" | grep -v $$ || true').toString().trim();
		console.log("This is the output of whether proxy is running: \n", output);
		return output.length > 0;
    } catch (error) {
		console.log("Encounter error: ", error);
        return false; // No process found
    }
};

function isProxyRunningWindows() {
	try {
        // Check for running Cloud SQL Proxy process
		const output = execSync('tasklist | findstr /l "cloud-sql-proxy.exe" || exit 0', { stdio: 'pipe' }).toString().trim();
		console.log("This is the output of whether proxy is running: ", output);
		return output.length > 0;
    } catch (error) {
        return false; // No process found
    }
};

function getProxyPID() {
	try {
		const output = execSync('pgrep "cloud-sql-proxy"').toString().trim();
		return output;
	} catch (error) {
		console.log("Unknown error during pid fetching: ", error);
		return;
	}
};

function stopProxy() {
	try {
		let pid = getProxyPID();
		if (typeof pid !== 'number') pid = parseInt(pid);
		const output = execSync(`kill -9 ${pid}`);
	} catch (error) {
		console.error("Kill failed: ", error);
	}
};

function startServer() {
	const isLinux = (process.platform === "linux");
	const credsPath = "./server/key.json";
	const proxyPath = isLinux ? './server/cloud-sql-proxy' : './server/cloud-sql-proxy.exe';
	const connectionName = 'rich-chimera-455016-u7:us-central1:root';
	const result = isLinux ? isProxyRunningLinux() : isProxyRunningWindows();
	if (result) {
		console.log("Cloud SQL Proxy is already running. Skipping startup.");
        return;
	} else {
		const command = isLinux ? 
			`nohup ${proxyPath} --credentials-file="${credsPath}" "${connectionName}" > proxy.log 2>&1 &` :
			`start "" "${proxyPath}" --credentials-file="${credsPath}" ${connectionName}`;
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.log(`System error: ${error}`);
				return;
			} else if (stderr) {
				console.log(`Output error: ${stderr}`);
				return;
			}
			console.log("Connected to server! ", stdout);
			return;
		});
	}
};

module.exports = { startServer, stopProxy };
