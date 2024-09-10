// Function to fetch package data from NuGet API
async function fetchNugetData(packageId) {
    try {
      // Fetch data from NuGet API
      const response = await fetch(`https://api.nuget.org/v3/registration5-gz-semver2/${packageId}/index.json`);
      const data = await response.json();
  
      // Get the latest version details
      const latestVersion = data.items[0].items[data.items[0].items.length - 1];
      const version = latestVersion.catalogEntry.version;
      const totalDownloads = latestVersion.catalogEntry.totalDownloads || 0; // Use 0 if undefined
  
      return { version, totalDownloads };
    } catch (error) {
      console.error(`Error fetching data for package ${packageId}:`, error);
      return { version: 'Error', totalDownloads: 'Error' };
    }
  }
  
  // Function to update package data on the webpage
  async function updatePackageData() {
    // Define the package IDs and corresponding HTML element prefixes
    const packages = [
      { id: 'openstrata.build.notargets', elementPrefix: 'notargets' },
      { id: 'openstrata.net.sdk', elementPrefix: 'sdk' },
      { id: 'openstrata.msbuild.appsource', elementPrefix: 'appsource' },
      { id: 'openstrata.msbuild.publisher.alm', elementPrefix: 'alm' },
      { id: 'openstrata.msbuild.publisher.new', elementPrefix: 'new' },
      { id: 'openstrata.net.templates', elementPrefix: 'templates' }
    ];
  
    // Loop through each package and fetch its data
    for (const pkg of packages) {
      const data = await fetchNugetData(pkg.id);
  
      // Update the HTML content dynamically
      document.querySelector(`#package-version-${pkg.elementPrefix}`).textContent = `Latest version: ${data.version}`;
      document.querySelector(`#package-downloads-${pkg.elementPrefix}`).textContent = `Total downloads: ${data.totalDownloads}`;
    }
  }
  
  // Run the function to update package data
  updatePackageData();
  