# climATe Browser

A web application for visualizing Austrian climate data

For development in a Docker container, install the extensions:

- ESLint
- Prettier
- GitHub Copilot (optional)

## Installation

`npm install -g npm@latest`: Update npm to the latest version
`npm i --save-dev eslint`: Install ESLint
`npm install --save-dev --save-exact prettier`: Install Prettier
`npm install --save-dev eslint-config-prettier`: Install Prettier ESLint configuration
`chown -R $USER:$GROUP /app`: Use this inside the container to fix permission errors during development

`npm install chart.js`: Install Chart.js for the diagrams
`npm install react-chartjs-2 chart.js`: Install React Chart.js 2
`npm install chartjs-plugin-annotation`: Install Chart.js annotation plugin

`npm install leaflet`: Install Leaflet
`npm install react-leaflet`: Install React Leaflet
