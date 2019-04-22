# mongoScraper

## Installation

Clone the repo to a directory on your local driv.  Run `npm install`. The package.json will install the required modules to run the program.

## What the app does

  1. Whenever a user visits the application site, the app scrapes stories from the NY Times website https://www.nytimes.com and displays them for the user. Each scraped article is saved to the application's database. The app scrapes and displays the following information for each article:

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

  2. Users can leave comments on the articles displayed and revisit them later. Comments are saved to the database as well and associated with their articles. Users can delete comments left on articles. All stored comments are visible to every user.
  
  ## Demo
 
  ![demo video](https://github.com/gtresquire/mongoScraper/blob/master/public/assets/video/scraper.gif "Demo")
