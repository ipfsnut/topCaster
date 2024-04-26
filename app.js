// Function to fetch data from the server API
async function fetchData(endpoint) {
    try {
      const response = await fetch(`/api/${endpoint}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      displayStatusMessage('Error fetching data. Please try again later.');
    }
  }
  
  // Function to populate the top sites list
  async function populateTopSitesList() {
    const topSites = await fetchData('top-sites');
    const topSitesListElement = document.getElementById('top-sites-list');
    topSitesListElement.innerHTML = '';
  
    topSites.forEach((site, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. ${site.name} (${site.url}) - ${site.ethLocked} ETH`;
      topSitesListElement.appendChild(listItem);
    });
  }
  
  // Function to populate the published casts list
  async function populatePublishedCastsList() {
    const publishedCasts = await fetchData('published-casts');
    const publishedCastsListElement = document.getElementById('published-casts-list');
    publishedCastsListElement.innerHTML = '';
  
    publishedCasts.forEach((cast, index) => {
      const listItem = document.createElement('li');
      const timestamp = new Date(cast.timestamp).toLocaleString();
      listItem.textContent = `${index + 1}. ${cast.siteName} (${cast.siteUrl}) - ${cast.ethLocked} ETH (Published at ${timestamp})`;
      publishedCastsListElement.appendChild(listItem);
    });
  }
  
  // Function to display status messages
  function displayStatusMessage(message) {
    const statusLogElement = document.getElementById('status-log');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    statusLogElement.appendChild(messageElement);
  }
  
  // Function to handle the refresh button click
  async function handleRefreshClick() {
    displayStatusMessage('Refreshing data...');
    await populateTopSitesList();
    await populatePublishedCastsList();
    displayStatusMessage('Data refreshed successfully.');
  }
  
  // Event listener for the refresh button
  const refreshButton = document.getElementById('refresh-btn');
  refreshButton.addEventListener('click', handleRefreshClick);
  
  // Initial data population
  populateTopSitesList();
  populatePublishedCastsList();
  displayStatusMessage('Data loaded successfully.');
  