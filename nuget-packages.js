async function fetchNugetPackages(packageIds) {
    const baseUrl = 'https://api.nuget.org/v3/registration5-semver1/';
    const resultsContainer = document.getElementById('nuget-packages');

    for (const packageId of packageIds) {
        try {
            const response = await fetch(`${baseUrl}${packageId.toLowerCase()}/index.json`);
            const data = await response.json();
            const latestVersion = data.items[0].items[data.items[0].items.length - 1];

            // Create HTML for each package
            const packageHtml = `
                <div class="nuget-package">
                    <h3>${data.items[0].items[0].catalogEntry.id} (${latestVersion.catalogEntry.version})</h3>
                    <p>${latestVersion.catalogEntry.description}</p>
                    <p>Total Downloads: ${latestVersion.catalogEntry.downloads}</p>
                    <p><a href="${latestVersion.catalogEntry.projectUrl}" target="_blank">View on GitHub</a></p>
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
