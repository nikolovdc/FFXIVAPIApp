const { exec, execSync } = require('child_process');
require('dotenv').config(); 

function isProxyRunningLinux() {
    try {
        // Check for running Cloud SQL Proxy process
		const output = execSync('pgrep -f "cloud-sql-proxy" | grep -v $$ || true').toString().trim();
		console.log("This is the output of whether proxy is running: ", output);
		return output.length > 0;
    } catch (error) {
        return false; // No process found
    }
}

function isProxyRunningWindows() {
	try {
        // Check for running Cloud SQL Proxy process
		const output = execSync('tasklist | findstr /I "cloud-sql-proxy.exe" || exit 0', { stdio: 'pipe' }).toString().trim();
		console.log("This is the output of whether proxy is running: ", output);
		return output.length > 0;
    } catch (error) {
        return false; // No process found
    }
}


function startServer() {
	const isLinux = (process.platform === "linux");
	const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
	const proxyPath = isLinux ? '../server/cloud-sql-proxy' : '../server/cloud-sql-proxy.exe';
	const connectionName = process.env.CONNECTION_NAME;
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

module.exports = { startServer };
