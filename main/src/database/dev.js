/* eslint-disable no-undef */
const { exec, execSync } = require('child_process');

/**
 * isProxyRunningLinux
 * Linux version of checking proxy running status 
 * @return {Boolean} of the output of finding proxy's pid among running processes
 */
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


/**
 * isProxyRunningWindows
 * Windows version of checking proxy running status
 * @return {Boolean} of the output of finding proxy among running tasks 
 */
function isProxyRunningWindows() {
  try {
    // Check for running Cloud SQL Proxy process
	const output = execSync('tasklist | findstr /l "cloud-sql-proxy.exe" || exit 0', { stdio: 'pipe' }).toString().trim();
	console.log("This is the output of whether proxy is running: ", output);
	return output.length > 0;
  } catch (error) {
	console.log(error);
    return false; // No process found
  }
};

/**
 * getProxyPID
 * Linux version of grabbing proxy pid
 * @return {string} pid of the running proxy
 */
function getProxyPID() {
  try {
	const output = execSync('pgrep "cloud-sql-proxy"').toString().trim();
	return output;
  } catch (error) {
	console.log("Unknown error during pid fetching: ", error);
	return;
  }
};

/**
 * Linux version of stopping proxy 
 */
function stopProxy() {
  try {
	let pid = getProxyPID();
	if (typeof pid !== 'number') pid = parseInt(pid);
  } catch (error) {
	console.error("Kill failed: ", error);
  }
};


/** 
 * startServer
 * Start the proxy for both linux and windows version
 * @todo so far only the linux version is working, 
 * need to double check and see what is causing the windows' version to break 
 */
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
