const ghpages = require('gh-pages');
const fs = require('fs');
const { execSync } = require('child_process');

// Function to increment version
function incrementVersion(version) {
  const parts = version.split('.');
  parts[1] = (parseInt(parts[1]) + 1).toString(); // Increment minor version
  return parts.join('.');
}

// Get current version from package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const currentVersion = packageJson.version;
const newVersion = incrementVersion(currentVersion);

// Update package.json with new version
packageJson.version = newVersion;
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

// Create deployment message
const timestamp = new Date().toISOString();
const deployMessage = `Deployed Version: ${newVersion} at ${timestamp}`;

// Deployment callback
const callback = (err) => {
  if (err) {
    console.error('Deployment failed:', err);
    // Revert version change if deployment fails
    packageJson.version = currentVersion;
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
    process.exit(1);
  } else {
    console.log('Deployed successfully');
    
    // Commit version change and create tag
    try {
      execSync('git add package.json');
      execSync(`git commit -m "Bump version to ${newVersion}"`);
      execSync(`git tag -a v${newVersion} -m "Version ${newVersion}"`);
      execSync('git push origin master');
      execSync('git push origin --tags');
      console.log(`Created git tag v${newVersion}`);
    } catch (gitError) {
      console.error('Failed to create git tag:', gitError);
    }
  }
};

// Deploy to GitHub Pages
ghpages.publish('dist', {
  branch: 'public',
  message: deployMessage,
  dotfiles: true // include dotfiles
}, callback);