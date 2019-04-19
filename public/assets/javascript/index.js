$(document).ready(function() {
    // Setting a reference to the article-container div where all the dynamic content will go
    // Event listeners added to any dynamically generated "save article"
    // and adding "scrape new article" buttons
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);
    $(".clear").on("click", handleArticleClear);
  
    function initPage() {
      // Run an AJAX request for any unsaved headlines
      $.get("/api/headlines?saved=false").then(function(data) {
  
        articleContainer.empty();
        // If we have headlines, render them to the page
        if (data && data.length) {
          renderArticles(data);
        } else {
          // If no headline, render a message that there are no articles
          renderEmpty();
        }
      });
    }
  
    function renderArticles(articles) {
      // Function to appending HTML containing article data to page
      // Passing an array of JSON containing all articles in our database
      var articleCards = [];
      // Pass each article JSON object to the createCard function which returns a bootstrap
      // card with article data inside
      for (var i = 0; i < articles.length; i++) {
        articleCards.push(createCard(articles[i]));
      }
      // After HTML for the articles is stored in our articleCards array,
      // append them to the articleCards container
      articleContainer.append(articleCards);
    }
  
    function createCard(article) {
      // This function takes in a single JSON object for an article/headline
      // constructs a jQuery element containing all formatted HTML for article card
      var card = $("<div class='card'>");
      var cardHeader = $("<div class='card-header'>").append(
        $("<h3>").append(
          $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
            .attr("href", article.url)
            .text(article.headline),
          $("<a class='btn btn-success save'>Save Article</a>")
        )
      );
  
      var cardBody = $("<div class='card-body'>").text(article.summary);
  
      card.append(cardHeader, cardBody);
      // Attach the article's id to element
      // Use this when trying to figure out which article the user wants to save
      card.data("_id", article._id);
      // Return jQuery element
      return card;
    }
  
    function renderEmpty() {
      // This function renders HTML to the page that no articles available based on search
      // Using a joined array of HTML string data because it's easier to read/change than a concatenated string
      var emptyAlert = $(
        [
          "<div class='alert alert-warning text-center'>",
          "<h4>No New Articles To Share.</h4>",
          "</div>",
          "<div class='card'>",
          "<div class='card-header text-center'>",
          "<h3>What would you like to do next?</h3>",
          "</div>",
          "<div class='card-body text-center'>",
          "<h4><a class='scrape-new'>Scrape New Articles</a></h4>",
          "<h4><a href='/saved'>Return To Saved Articles</a></h4>",
          "</div>",
          "</div>"
        ].join("")
      );
      // Appending this to the page
      articleContainer.append(emptyAlert);
    }
  
    function handleArticleSave() {
      // Function triggered when the user wants to save an article
      // Retrieve headline object from the data that was captured earlier
      var articleToSave = $(this)
        .parents(".card")
        .data();
  
      // Remove card
      $(this)
        .parents(".card")
        .remove();
  
      articleToSave.saved = true;
      // Update to an existing record in our collection
      console.log(articleToSave)
      $.ajax({
        method: "PUT",
        url: "/api/headlines/" + articleToSave._id,
        data: articleToSave
      }).then(function(data) {
        console.log(data)
        // If the data was saved successfully
        if (data) {
          // Run the initPage function again. Reloads the entire list of articles
          // initPage();
          location.reload();
        }
      });
    }
  
    function handleArticleScrape() {
      // Function handles the user clicking any "scrape new article" buttons
      $.get("/api/fetch").then(function(data) {
        // If scrape is successful the NYTIMES and compare the articles to those
        // already in our collection, re render the articles on the page
        // let the user know how many unique articles we were able to save
        // initPage();
        console.log(data)
        // data.message = "Scrape success!"
        // bootbox.alert($("<h3 class='text-center m-top-80'>").text(data.message));
        window.location.href = "/";
      });
    }
  
    function handleArticleClear() {
      $.get("api/clear").then(function(data) {
        console.log(data)
        articleContainer.empty();
        // initPage();
        location.reload();
      });
    }
  });
  