async function fetchNugetPackages(packageIds) {
    const baseUrl = 'https://api.nuget.org/v3/registration5-semver1/';
    const resultsContainer = document.getElementById('nuget-packages');

    for (const packageId of packageIds) {
        try {
            const response = await fetch(`${baseUrl}${packageId.toLowerCase()}/index.json`);
            const data = await response.json();
            const latestVersionItem = data.items[0].items[data.items[0].items.length - 1];

            // Access the latest version details
            const packageName = latestVersionItem.catalogEntry.id;
            const packageVersion = latestVersionItem.catalogEntry.version;
            const packageDescription = latestVersionItem.catalogEntry.description || 'No description available';
            const totalDownloads = data.items.reduce((acc, curr) => acc + (curr.items ? curr.items.reduce((innerAcc, innerItem) => innerAcc + (innerItem.catalogEntry?.downloads || 0), 0) : 0), 0);
            const projectUrl = latestVersionItem.catalogEntry.projectUrl || '#';

            // Create HTML for each package
            const packageHtml = `
                <div class="nuget-package">
                    <h3>${packageName} (${packageVersion})</h3>
                    <p>${packageDescription}</p>
                    <p>Total Downloads: ${totalDownloads}</p>
                    <p><a href="${projectUrl}" target="_blank">View on GitHub</a></p>
                </div>
            `;

            // Append the package HTML to the results container
            resultsContainer.innerHTML += packageHtml;
        } catch (error) {
            console.error('Error fetching package:', error);
        }
    }
}

// Call the function with your package IDs
fetchNugetPackages([
    'OpenStrata.Build.NoTargets',
    'OpenStrata.NET.Sdk',
    'OpenStrata.MSBuild.AppSource',
    'OpenStrata.MSBuild.Publisher.ALM',
    'OpenStrata.MSBuild.Publisher.New',
    'OpenStrata.NET.Templates'
]);
