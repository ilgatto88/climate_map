# climATe Browser

[![CI](https://github.com/ilgatto88/climate_map/actions/workflows/ci.yml/badge.svg)](https://github.com/ilgatto88/climate_map/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/ilgatto88/climate_map/graph/badge.svg?token=8M74B8F45R)](https://codecov.io/gh/ilgatto88/climate_map) [![License: CC BY-NC SA 4.0](https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-orange)](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode)

## CS50 Web Programming Video Demonstration: [Link](https://youtu.be/ZfmsQM6p_1Y)

## GitHub Repository: [Link](https://github.com/ilgatto88/climate_map)

## Project Motivation
Welcome to the ClimATe Atlas for Austria, a project born out of a meteorologist's passion for climate data and a self-taught web developer's curiosity. Inspired by the [Canadian Climate Atlas](https://climateatlas.ca/map/canada), this initiative was crafted as a fascinating challenge. When the time came to choose a final project for Harward's edX Computer Science for Web Programming course, it was clear that bringing this idea to life was the perfect opportunity to blend climatology and technology, resulting in this dynamic and informative Climate Atlas.

## Table of Contents

- [Distinctiveness and Complexity](#distinctiveness-and-complexity)
- [Data Source](#data-source)
- [Installation and Requirements](#installation-and-requirements)
- [Features and User Instructions](#features-and-user-instructions)
- [License](#license)

## Distinctiveness and Complexity
The application is based on 4 Docker containers, 2 of these server the ClimATe API, my final project for CS50 Introduction to Computer Science. This API provides historical and future time series data for Austrian municipalities. The third container hosts a Geoserver, supplying map tiles for the two-dimensional visualization, while the fourth contains the React application itself. This makes ClimATe Atlas a complex and unique project, offering a web application experience not found elsewhere in my country.

## Data Source
The climate data sources are a blend of trusted origins. The timeseries data is primarily derived from the [SPARTACUS](https://www.zamg.ac.at/cms/de/forschung/klima/klimatografien/spartacus) gridded dataset by [ZAMG](https://www.zamg.ac.at/cms/de/aktuell) (Austrian Meteorological and Geophysical Institute) and supplemented by findings from the [ÖKS15](https://www.bmk.gv.at/themen/klima_umwelt/klimaschutz/anpassungsstrategie/publikationen/oeks15.html) and [STARC-Impact](https://ccca.ac.at/wissenstransfer/starc-impact-guideline) projects. The geographical boundaries, such as municipality shapefiles, are official records provided by the [Austrian government](https://www.data.gv.at/katalog/dataset/stat_gliederung-osterreichs-in-gemeinden14f53), ensuring the accuracy and reliability of our data. All data sources reflect the conditions in 2023.

## Installation and Requirements
To run the application, Docker and Docker Compose are required. Additionally, a container running [Geoserver](https://github.com/ilgatto88/geoserver) is necessary; without it, the map won't display any 2-dimensional climate data. Furthermore, geotiff files must be prepared and added to a specific directory on Geoserver, and the tile layers need to be set up for communication with the React application.

The ClimATe Atlas also relies on the ClimATe API, which is detailed on its [GitHub page](https://github.com/ilgatto88/climate_api).

After satisfying these prerequisites, you can start the container for the React application. Inside the container, navigate to the /app/climate_browser folder and execute the following command: `npm run dev`. Now, the ClimATe Atlas is running and can be accessed in the browser, usually at the following address: `http://localhost:5173/`.

Not setting up the two containers for the ClimATe API and the third one for Geoserver won't break the React application, but it will result in no data being displayed.

## Features and User Instructions
For user guidance, the application offers several interactive features. Users have the flexibility to customize their view by choosing climate scenarios, future periods, and climate parameters at the application's footer. The header at the top of the page dynamically updates to show the selected climate parameter, scenario, and future period, ensuring users are constantly informed about their choices. The interactive map of Austria allows users to explore the region. By clicking on any part of the map, a sidebar becomes visible, which presents a comprehensive line diagram depicting climate data trends for the selected municipality. This feature spans from 1970 to 2100, offering users a detailed insight into climate changes specific to their area of interest.

## License

[CC BY-NC SA 4.0](LICENSE)